<?php
/**
 * Theme supports, menus, activation pages, template routing.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

add_action('after_setup_theme', static function (): void {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
	// Intentionally no custom-logo support: brand marks ship in assets/brand/
	// and must not be overridden by leftover Customizer logos from Blocksy.

	register_nav_menus([
		'primary' => __('Primary', 'green-diamond-farm'),
	]);
});

/**
 * On theme switch: create pages + set front page + flush rewrites.
 */
add_action('after_switch_theme', static function (): void {
	$slugs = [
		'about' => 'About',
		'products' => 'Products',
		'contact' => 'Contact',
		'privacy' => 'Privacy',
	];

	foreach ($slugs as $slug => $title) {
		$existing = get_page_by_path($slug);
		if ($existing instanceof WP_Post) {
			continue;
		}
		wp_insert_post([
			'post_title' => $title,
			'post_name' => $slug,
			'post_status' => 'publish',
			'post_type' => 'page',
			'post_content' => '',
		]);
	}

	$home = get_page_by_path('home');
	if (!$home instanceof WP_Post) {
		$home_id = wp_insert_post([
			'post_title' => 'Home',
			'post_name' => 'home',
			'post_status' => 'publish',
			'post_type' => 'page',
			'post_content' => '',
		]);
	} else {
		$home_id = $home->ID;
	}

	if (is_int($home_id) && $home_id > 0) {
		update_option('show_on_front', 'page');
		update_option('page_on_front', $home_id);
	}

	update_option('gdf_flush_rewrites', 1);
});

add_action('init', static function (): void {
	if (get_option('gdf_flush_rewrites')) {
		flush_rewrite_rules(false);
		delete_option('gdf_flush_rewrites');
	}
}, 99);

/**
 * Locale-prefixed routes are virtual — do not 404 when no WP post matches.
 */
add_filter('pre_handle_404', static function ($preempt, WP_Query $query) {
	$page = get_query_var('gdf_page');
	if (is_string($page) && $page !== '') {
		$query->is_404 = false;
		$query->is_page = ($page !== 'home');
		$query->is_singular = ($page !== 'home');
		$query->is_home = false;
		$query->is_front_page = ($page === 'home');
		return true;
	}
	return $preempt;
}, 10, 2);

/**
 * Route virtual locale pages and classic WP pages to the same templates.
 */
add_filter('template_include', static function (string $template): string {
	$page = get_query_var('gdf_virtual');
	if (!is_string($page) || $page === '') {
		if (is_front_page()) {
			$page = 'home';
		} elseif (is_page('about')) {
			$page = 'about';
		} elseif (is_page('products')) {
			$page = 'products';
		} elseif (is_page('contact')) {
			$page = 'contact';
		} elseif (is_page('privacy')) {
			$page = 'privacy';
		} else {
			return $template;
		}
	}

	$map = [
		'home' => 'front-page.php',
		'about' => 'page-about.php',
		'products' => 'page-products.php',
		'product' => 'page-product.php',
		'contact' => 'page-contact.php',
		'privacy' => 'page-privacy.php',
	];

	if (!isset($map[$page])) {
		return $template;
	}

	$custom = GDF_DIR . '/' . $map[$page];
	// Live hosts updated via theme-editor may lack a newly added file until zip reinstall.
	if ($page === 'product' && !is_readable($custom)) {
		$fallback = GDF_DIR . '/page-products.php';
		if (is_readable($fallback)) {
			return $fallback;
		}
	}
	return is_readable($custom) ? $custom : $template;
});

/**
 * Document title from catalogs.
 */
add_filter('pre_get_document_title', static function ($title) {
	$page = gdf_current_page_key();
	if ($page === 'home') {
		return gdf_t('Meta.titleDefault');
	}
	if ($page === 'product') {
		$slug = gdf_current_product_slug();
		if ($slug !== '') {
			$part = gdf_t('products.' . $slug . '.name');
			$tpl = gdf_t('Meta.titleTemplate');
			return str_replace('%s', $part, $tpl);
		}
	}
	$meta_key = match ($page) {
		'about' => 'About.metaTitle',
		'products' => 'Products.metaTitle',
		'contact' => 'Contact.metaTitle',
		'privacy' => 'Privacy.metaTitle',
		default => null,
	};
	if ($meta_key === null) {
		return $title;
	}
	$part = gdf_t($meta_key);
	$tpl = gdf_t('Meta.titleTemplate');
	return str_replace('%s', $part, $tpl);
});

// Locale-aware canonical (path-prefix i18n), not WP page permalink alone.
remove_action('wp_head', 'rel_canonical');

add_action('wp_head', static function (): void {
	$page = gdf_current_page_key();
	$product = gdf_current_product_slug();
	if ($page === 'product' && $product !== '') {
		$desc = gdf_t('products.' . $product . '.summary');
		$url = gdf_product_url($product);
	} else {
		$desc = match ($page) {
			'home' => gdf_t('Meta.description'),
			'about' => gdf_t('About.metaDescription'),
			'products' => gdf_t('Products.metaDescription'),
			'contact' => gdf_t('Contact.metaDescription'),
			'privacy' => gdf_t('Privacy.metaDescription'),
			default => gdf_t('Meta.description'),
		};
		$url = gdf_url($page === 'product' ? 'products' : $page);
	}
	$title = wp_get_document_title();
	$locale = gdf_locale();
	$og_locale = match ($locale) {
		'fa' => 'fa_IR',
		'ar' => 'ar_AR',
		'tr' => 'tr_TR',
		'zh' => 'zh_CN',
		'hi' => 'hi_IN',
		'ru' => 'ru_RU',
		default => 'en_US',
	};

	echo '<meta name="description" content="' . esc_attr($desc) . '" />' . "\n";
	echo '<link rel="canonical" href="' . esc_url($url) . '" />' . "\n";
	echo '<meta property="og:type" content="website" />' . "\n";
	echo '<meta property="og:title" content="' . esc_attr($title) . '" />' . "\n";
	echo '<meta property="og:description" content="' . esc_attr($desc) . '" />' . "\n";
	echo '<meta property="og:url" content="' . esc_url($url) . '" />' . "\n";
	echo '<meta property="og:locale" content="' . esc_attr($og_locale) . '" />' . "\n";
	echo '<meta property="og:site_name" content="Green Diamond Farm" />' . "\n";
	if ($page === 'product' && $product !== '') {
		echo '<meta property="og:image" content="' . esc_url(gdf_product_image($product)) . '" />' . "\n";
	}

	foreach (gdf_locales() as $loc) {
		$hreflang = $loc;
		$href = ($page === 'product' && $product !== '')
			? gdf_product_url($product, $loc)
			: gdf_url($page === 'product' ? 'products' : $page, $loc);
		echo '<link rel="alternate" hreflang="' . esc_attr($hreflang) . '" href="' . esc_url($href) . '" />' . "\n";
	}
	$xd = ($page === 'product' && $product !== '')
		? gdf_product_url($product, gdf_default_locale())
		: gdf_url($page === 'product' ? 'products' : $page, gdf_default_locale());
	echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($xd) . '" />' . "\n";
}, 1);

/**
 * Soft-disable classic editor chrome for marketing pages (content lives in Site Content).
 */
add_action('admin_notices', static function (): void {
	$screen = function_exists('get_current_screen') ? get_current_screen() : null;
	if (!$screen || $screen->id !== 'page') {
		return;
	}
	echo '<div class="notice notice-info"><p>';
	echo esc_html__(
		'Green Diamond Farm: page layout is locked in the theme. Edit buyer-facing text in Appearance → Site Content. Contact details: Appearance → Site Content → Contact details.',
		'green-diamond-farm'
	);
	echo '</p></div>';
});
