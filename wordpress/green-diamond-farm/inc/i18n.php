<?php
/**
 * Locale detection, RTL, and URL helpers (path prefix like Next.js).
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

/**
 * @return list<string>
 */
function gdf_locales(): array
{
	return gdf_config()['locales'];
}

function gdf_default_locale(): string
{
	$saved = get_option('gdf_default_locale', '');
	if (is_string($saved) && in_array($saved, gdf_locales(), true)) {
		return $saved;
	}
	return gdf_config()['default_locale'];
}

function gdf_is_rtl_locale(string $locale): bool
{
	return in_array($locale, gdf_config()['rtl_locales'], true);
}

/**
 * Current request locale (set early in parse_request).
 */
function gdf_locale(): string
{
	$locale = $GLOBALS['gdf_locale'] ?? null;
	if (is_string($locale) && in_array($locale, gdf_locales(), true)) {
		return $locale;
	}
	return gdf_default_locale();
}

function gdf_prefer_fa(): bool
{
	return gdf_is_rtl_locale(gdf_locale());
}

/**
 * @return array{display_name:string,legal_name:string,region:string,prefer_fa:bool}
 */
function gdf_brand_legal(): array
{
	$b = gdf_config()['brand'];
	$prefer = gdf_prefer_fa();
	return [
		'prefer_fa' => $prefer,
		'display_name' => $prefer ? $b['name_fa'] : $b['name'],
		'legal_name' => $prefer ? $b['legal_fa'] : $b['legal_en'],
		'region' => $prefer ? $b['region_fa'] : $b['region_en'],
	];
}

add_action('init', 'gdf_register_rewrites');
function gdf_register_rewrites(): void
{
	$locales = implode('|', array_map('preg_quote', gdf_locales()));
	$pages = 'about|products|contact|privacy';

	add_rewrite_tag('%gdf_lang%', '(' . $locales . ')');
	add_rewrite_tag('%gdf_page%', '(' . $pages . ')');

	add_rewrite_rule(
		'^(' . $locales . ')/(' . $pages . ')/?$',
		'index.php?gdf_lang=$matches[1]&gdf_page=$matches[2]',
		'top'
	);
	add_rewrite_rule(
		'^(' . $locales . ')/?$',
		'index.php?gdf_lang=$matches[1]&gdf_page=home',
		'top'
	);
}

add_filter('query_vars', static function (array $vars): array {
	$vars[] = 'gdf_lang';
	$vars[] = 'gdf_page';
	return $vars;
});

add_action('parse_request', 'gdf_parse_locale_request', 1);
function gdf_parse_locale_request(WP $wp): void
{
	$lang = isset($wp->query_vars['gdf_lang']) ? (string) $wp->query_vars['gdf_lang'] : '';
	if ($lang === '' && isset($_GET['gdf_lang'])) {
		$lang = sanitize_key((string) wp_unslash($_GET['gdf_lang']));
	}

	if ($lang !== '' && in_array($lang, gdf_locales(), true)) {
		$GLOBALS['gdf_locale'] = $lang;
	} else {
		$GLOBALS['gdf_locale'] = gdf_default_locale();
	}

	$page = isset($wp->query_vars['gdf_page']) ? (string) $wp->query_vars['gdf_page'] : '';
	if ($page !== '') {
		$GLOBALS['gdf_virtual_page'] = $page;
		// Force a front-end request that templates can detect.
		$wp->query_vars['gdf_virtual'] = $page;
	}
}

add_filter('query_vars', static function (array $vars): array {
	$vars[] = 'gdf_virtual';
	return $vars;
});

/**
 * Build localized site URL for a logical page key.
 */
function gdf_url(string $page = 'home', ?string $locale = null): string
{
	$locale = $locale ?? gdf_locale();
	$default = gdf_default_locale();
	$slug = gdf_config()['pages'][$page] ?? $page;

	if ($locale === $default) {
		$path = $slug === '' ? '/' : '/' . $slug . '/';
	} else {
		$path = $slug === '' ? '/' . $locale . '/' : '/' . $locale . '/' . $slug . '/';
	}

	return home_url($path);
}

/**
 * Language switcher target for current logical page.
 */
function gdf_switch_locale_url(string $target_locale): string
{
	$page = gdf_current_page_key();
	return gdf_url($page, $target_locale);
}

function gdf_current_page_key(): string
{
	$virtual = get_query_var('gdf_virtual');
	if (is_string($virtual) && $virtual !== '') {
		return $virtual === 'home' ? 'home' : $virtual;
	}

	if (is_front_page()) {
		return 'home';
	}
	if (is_page('about')) {
		return 'about';
	}
	if (is_page('products')) {
		return 'products';
	}
	if (is_page('contact')) {
		return 'contact';
	}
	if (is_page('privacy')) {
		return 'privacy';
	}
	return 'home';
}

add_filter('body_class', static function (array $classes): array {
	$classes[] = 'gdf-locale-' . gdf_locale();
	if (gdf_is_rtl_locale(gdf_locale())) {
		$classes[] = 'gdf-rtl';
	}
	$classes[] = 'gdf-page-' . gdf_current_page_key();
	return $classes;
});

add_filter('language_attributes', static function (string $output): string {
	$dir = gdf_is_rtl_locale(gdf_locale()) ? 'rtl' : 'ltr';
	$lang = gdf_locale();
	// Replace lang/dir if present; otherwise append.
	if (preg_match('/\blang=/', $output)) {
		$output = preg_replace('/\blang="[^"]*"/', 'lang="' . esc_attr($lang) . '"', $output) ?? $output;
	} else {
		$output .= ' lang="' . esc_attr($lang) . '"';
	}
	if (preg_match('/\bdir=/', $output)) {
		$output = preg_replace('/\bdir="[^"]*"/', 'dir="' . esc_attr($dir) . '"', $output) ?? $output;
	} else {
		$output .= ' dir="' . esc_attr($dir) . '"';
	}
	return $output;
});
