<?php
/**
 * Brand, contact, history, catalog — mirrored from Next.js src/lib/site.ts.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

/**
 * @return array<string, mixed>
 */
function gdf_config(): array
{
	static $config = null;
	if ($config !== null) {
		return $config;
	}

	$year = 2026;
	$config = [
		'brand' => [
			'name' => 'Green Diamond Farm',
			'name_fa' => 'گرین دایموند فارم',
			'legal_en' => 'Hosseini Naveh',
			'legal_fa' => 'بازرگانی حسینی نوه',
			'region_en' => 'Rafsanjan',
			'region_fa' => 'رفسنجان',
			'domain' => 'greendiamondfarm.com',
			'copyright_year' => $year,
		],
		'people' => [
			'founder' => [
				'en' => 'Asghar Hosseini Naveh',
				'fa' => 'اصغر حسینی نوه',
			],
			'ceo' => [
				'en' => 'Faramarz Hosseini Naveh',
				'fa' => 'فرامرز حسینی نوه',
			],
		],
		'history_since' => [
			'agriculture' => 1987,
			'trade' => 1992,
			'export' => 1996,
		],
		'history_years' => [
			'agriculture' => $year - 1987,
			'trade' => $year - 1992,
			'export' => $year - 1996,
		],
		'contact' => [
			'email' => 'export@greendiamondfarm.com',
			'phone' => '+989361814577',
			'phone_display' => '+98 936 181 4577',
			'whatsapp' => '989361814577',
			'address_en' => 'Warehouse, Motahari 52, Rafsanjan, Iran',
			'address_fa' => 'انبار، مطهری ۵۲، رفسنجان، ایران',
		],
		'product_slugs' => [
			'ahmad-aghaei',
			'akbari',
			'fandoghi',
			'kaleh-ghouchi',
			'dahan-bast',
			'kernels',
			'salted-roasted',
		],
		'product_groups' => [
			'inShell' => [
				'ahmad-aghaei',
				'akbari',
				'fandoghi',
				'kaleh-ghouchi',
				'dahan-bast',
			],
			'processed' => ['kernels', 'salted-roasted'],
		],
		'imagery' => [
			'hero' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=2400&q=80',
			'orchard' => 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&w=1600&q=80',
			'product' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1600&q=80',
			'harvest' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1600&q=80',
			// Per-product placeholders — replace via Appearance → Site Content → Images.
			'product_ahmad-aghaei' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1200&q=80&sat=-10',
			'product_akbari' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1200&q=80&sat=-5',
			'product_fandoghi' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1200&h=900&q=80',
			'product_kaleh-ghouchi' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1200&h=800&q=80',
			'product_dahan-bast' => 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&w=1200&q=80',
			'product_kernels' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1200&q=80',
			'product_salted-roasted' => 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1100&q=80',
		],
		'locales' => ['en', 'fa', 'ar', 'tr', 'zh', 'hi', 'ru'],
		'rtl_locales' => ['fa', 'ar'],
		'locale_labels' => [
			'en' => 'English',
			'fa' => 'فارسی',
			'ar' => 'العربية',
			'tr' => 'Türkçe',
			'zh' => '中文',
			'hi' => 'हिन्दी',
			'ru' => 'Русский',
		],
		'default_locale' => 'en',
		'pages' => [
			'home' => '',
			'about' => 'about',
			'products' => 'products',
			'contact' => 'contact',
			'privacy' => 'privacy',
		],
	];

	return $config;
}

/**
 * Contact values: admin override (option) wins over theme defaults.
 *
 * @return array<string, string>
 */
function gdf_contact(): array
{
	$defaults = gdf_config()['contact'];
	$saved = get_option('gdf_contact', []);
	if (!is_array($saved)) {
		$saved = [];
	}
	return array_merge($defaults, array_filter($saved, static fn($v) => is_string($v) && $v !== ''));
}

/**
 * Imagery URLs: admin override wins.
 *
 * @return array<string, string>
 */
function gdf_imagery(): array
{
	$defaults = gdf_config()['imagery'];
	$saved = get_option('gdf_imagery', []);
	if (!is_array($saved)) {
		$saved = [];
	}
	return array_merge($defaults, array_filter($saved, static fn($v) => is_string($v) && $v !== ''));
}

/**
 * Whether a string is a known catalog product slug.
 */
function gdf_is_product_slug(string $slug): bool
{
	return in_array($slug, gdf_config()['product_slugs'], true);
}

/**
 * Primary image URL for a product card / detail hero.
 */
function gdf_product_image(string $slug): string
{
	$imagery = gdf_imagery();
	$key = 'product_' . $slug;
	if (!empty($imagery[$key])) {
		return (string) $imagery[$key];
	}
	return (string) ($imagery['product'] ?? '');
}
