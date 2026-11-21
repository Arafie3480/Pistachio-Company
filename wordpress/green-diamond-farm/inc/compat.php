<?php
/**
 * Isolate Green Diamond Farm from leftover purchased-theme stack
 * (Blocksy + Blocksy Companion + Stackable, custom logo, forced RTL).
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Plugins that belong to the previous Blocksy purchase and fight this theme.
 *
 * @return list<string>
 */
function gdf_conflicting_plugins(): array
{
	return [
		'blocksy-companion/blocksy-companion.php',
		'stackable-ultimate-gutenberg-blocks/plugin.php',
	];
}

/**
 * One-time + on-switch cleanup of purchased-theme leftovers.
 */
function gdf_run_conflict_cleanup(): void
{
	// Drop Blocksy-era custom logo (CREATIVEMINDS / logo-dark.svg).
	remove_theme_mod('custom_logo');

	// Prefer English as WP site language so core does not force body.rtl on EN pages.
	// Per-request dir still comes from gdf locale (fa/ar → rtl).
	$wp_locale = get_option('WPLANG', '');
	if (is_string($wp_locale) && $wp_locale !== '' && preg_match('/^(fa|ar)/i', $wp_locale)) {
		update_option('WPLANG', '');
	}

	if (!function_exists('deactivate_plugins')) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}

	$to_deactivate = [];
	foreach (gdf_conflicting_plugins() as $plugin) {
		if (is_plugin_active($plugin)) {
			$to_deactivate[] = $plugin;
		}
	}
	if ($to_deactivate !== []) {
		deactivate_plugins($to_deactivate, true);
	}

	update_option('gdf_flush_rewrites', 1);
	update_option('gdf_conflict_cleanup_done', GDF_VERSION);
}

add_action('after_switch_theme', static function (): void {
	gdf_run_conflict_cleanup();
});

add_action('init', static function (): void {
	$done = get_option('gdf_conflict_cleanup_done', '');
	if ($done !== GDF_VERSION) {
		gdf_run_conflict_cleanup();
	}
}, 5);

/**
 * If a conflicting plugin is somehow re-enabled, strip its front assets.
 */
add_action('wp_enqueue_scripts', static function (): void {
	$styles = [
		'blocksy-main',
		'ct-main-styles',
		'ct-main',
		'stk-frontend-blocks',
		'stk-frontend-blocks-responsive',
		'ugb-style-css',
		'ugb-block-frontend',
	];
	foreach ($styles as $handle) {
		wp_dequeue_style($handle);
		wp_deregister_style($handle);
	}

	$scripts = [
		'ct-scripts',
		'ct-main',
		'stk-frontend-js',
		'ugb-block-frontend',
	];
	foreach ($scripts as $handle) {
		wp_dequeue_script($handle);
		wp_deregister_script($handle);
	}

	// Catch versioned / unknown handles by source path.
	foreach (wp_styles()->registered as $handle => $obj) {
		$src = is_string($obj->src ?? null) ? $obj->src : '';
		if (
			str_contains($src, '/plugins/blocksy-companion/')
			|| str_contains($src, '/plugins/stackable-ultimate-gutenberg-blocks/')
			|| str_contains($src, '/themes/blocksy/')
		) {
			wp_dequeue_style($handle);
			wp_deregister_style($handle);
		}
	}
	foreach (wp_scripts()->registered as $handle => $obj) {
		$src = is_string($obj->src ?? null) ? $obj->src : '';
		if (
			str_contains($src, '/plugins/blocksy-companion/')
			|| str_contains($src, '/plugins/stackable-ultimate-gutenberg-blocks/')
			|| str_contains($src, '/themes/blocksy/')
		) {
			wp_dequeue_script($handle);
			wp_deregister_script($handle);
		}
	}
}, 100);

/**
 * Force body direction from GDF locale, not leftover WP/Blocksy RTL.
 */
add_filter('body_class', static function (array $classes): array {
	$classes = array_values(array_diff($classes, [
		'rtl',
		'ltr',
		'stk-has-block-style-inheritance',
		'wp-custom-logo',
	]));

	if (gdf_is_rtl_locale(gdf_locale())) {
		$classes[] = 'rtl';
		if (!in_array('gdf-rtl', $classes, true)) {
			$classes[] = 'gdf-rtl';
		}
	} else {
		$classes[] = 'ltr';
	}

	return $classes;
}, 99);

/**
 * Align WP text direction with the active GDF locale on the front end.
 */
add_action('wp', static function (): void {
	if (is_admin()) {
		return;
	}
	global $wp_locale;
	if ($wp_locale instanceof WP_Locale) {
		$wp_locale->text_direction = gdf_is_rtl_locale(gdf_locale()) ? 'rtl' : 'ltr';
	}
});

/**
 * Admin warning if purchased-theme plugins are turned back on.
 */
add_action('admin_notices', static function (): void {
	if (!current_user_can('activate_plugins')) {
		return;
	}
	if (!function_exists('is_plugin_active')) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}
	$active = array_values(array_filter(
		gdf_conflicting_plugins(),
		static fn(string $p): bool => is_plugin_active($p)
	));
	if ($active === []) {
		return;
	}
	echo '<div class="notice notice-warning"><p>';
	echo esc_html__(
		'Green Diamond Farm: deactivate Blocksy Companion and Stackable — they conflict with this locked theme (left over from the previous purchase).',
		'green-diamond-farm'
	);
	echo '</p><p><code>' . esc_html(implode(', ', $active)) . '</code></p></div>';
});
