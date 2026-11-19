<?php
/**
 * Message catalogs: defaults from JSON + optional admin overrides.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Load default catalog for a locale from data/defaults/{locale}.json.
 *
 * @return array<string, mixed>
 */
function gdf_load_defaults(string $locale): array
{
	static $cache = [];
	if (isset($cache[$locale])) {
		return $cache[$locale];
	}

	$path = GDF_DIR . '/data/defaults/' . $locale . '.json';
	if (!is_readable($path)) {
		$path = GDF_DIR . '/data/defaults/en.json';
	}
	$raw = file_get_contents($path);
	$data = is_string($raw) ? json_decode($raw, true) : null;
	$cache[$locale] = is_array($data) ? $data : [];
	return $cache[$locale];
}

/**
 * Deep-get with dot path.
 *
 * @param array<string, mixed> $data
 */
function gdf_array_get(array $data, string $path, ?string $fallback = null): ?string
{
	$parts = explode('.', $path);
	$cur = $data;
	foreach ($parts as $part) {
		if (!is_array($cur) || !array_key_exists($part, $cur)) {
			return $fallback;
		}
		$cur = $cur[$part];
	}
	if (is_string($cur) || is_numeric($cur)) {
		return (string) $cur;
	}
	return $fallback;
}

/**
 * @return array<string, mixed>
 */
function gdf_overrides(string $locale): array
{
	$all = get_option('gdf_content_overrides', []);
	if (!is_array($all) || !isset($all[$locale]) || !is_array($all[$locale])) {
		return [];
	}
	return $all[$locale];
}

/**
 * Translate a catalog key for the current (or given) locale.
 * Supports {placeholder} replacement.
 *
 * @param array<string, string|int|float> $replace
 */
function gdf_t(string $key, array $replace = [], ?string $locale = null): string
{
	$locale = $locale ?? gdf_locale();
	$defaults = gdf_load_defaults($locale);
	$overrides = gdf_overrides($locale);

	$value = gdf_array_get($overrides, $key);
	if ($value === null) {
		$value = gdf_array_get($defaults, $key, $key);
	}
	if ($value === null) {
		$value = $key;
	}

	foreach ($replace as $k => $v) {
		$value = str_replace('{' . $k . '}', (string) $v, $value);
	}
	return $value;
}

/**
 * Escaped translate helper for templates.
 *
 * @param array<string, string|int|float> $replace
 */
function gdf_e(string $key, array $replace = [], ?string $locale = null): void
{
	echo esc_html(gdf_t($key, $replace, $locale));
}

/**
 * Flatten nested catalog to dotted keys for admin editor.
 *
 * @param array<string, mixed> $data
 * @return array<string, string>
 */
function gdf_flatten(array $data, string $prefix = ''): array
{
	$out = [];
	foreach ($data as $k => $v) {
		$path = $prefix === '' ? (string) $k : $prefix . '.' . $k;
		if (is_array($v)) {
			$out += gdf_flatten($v, $path);
		} elseif (is_string($v) || is_numeric($v)) {
			$out[$path] = (string) $v;
		}
	}
	return $out;
}

/**
 * Unflatten dotted keys back to nested array.
 *
 * @param array<string, string> $flat
 * @return array<string, mixed>
 */
function gdf_unflatten(array $flat): array
{
	$out = [];
	foreach ($flat as $path => $value) {
		if (!is_string($path) || $path === '') {
			continue;
		}
		$parts = explode('.', $path);
		$ref = &$out;
		foreach ($parts as $i => $part) {
			if ($i === count($parts) - 1) {
				$ref[$part] = $value;
			} else {
				if (!isset($ref[$part]) || !is_array($ref[$part])) {
					$ref[$part] = [];
				}
				$ref = &$ref[$part];
			}
		}
		unset($ref);
	}
	return $out;
}

/**
 * Editable key groups shown in admin (content only — no style keys).
 *
 * @return array<string, list<string>>
 */
function gdf_editable_groups(): array
{
	return [
		'Meta' => ['Meta.titleDefault', 'Meta.description'],
		'Nav' => ['Nav.home', 'Nav.about', 'Nav.products', 'Nav.contact', 'Nav.inquire'],
		'Home' => [
			'Home.headline',
			'Home.subhead',
			'Home.ctaProducts',
			'Home.ctaContact',
			'Home.heroAlt',
			'Home.buyersTitle',
			'Home.buyersLead',
			'Home.pillar1Title',
			'Home.pillar1Body',
			'Home.pillar2Title',
			'Home.pillar2Body',
			'Home.pillar3Title',
			'Home.pillar3Body',
			'Home.shipmentTitle',
			'Home.shipmentLead',
			'Home.kernelsRoasted',
			'Home.productAlt',
			'Home.seeAll',
			'Home.ctaTitle',
			'Home.ctaLead',
			'Home.ctaButton',
		],
		'About' => [
			'About.title',
			'About.lead',
			'About.heading',
			'About.p1',
			'About.p2',
			'About.imageAlt',
			'About.historyTitle',
			'About.historyNote',
			'About.founderLabel',
			'About.ceoLabel',
			'About.yearsAgricultureLabel',
			'About.yearsTradeLabel',
			'About.yearsExportLabel',
			'About.originLabel',
			'About.originBody',
			'About.standLabel',
			'About.standBody',
			'About.certsLabel',
			'About.certsBody',
			'About.marketsLabel',
			'About.marketsBody',
		],
		'Products' => [
			'Products.title',
			'Products.lead',
			'Products.outlineNote',
			'Products.ctaTitle',
			'Products.ctaLead',
			'Products.ctaButton',
			'Products.group.inShell',
			'Products.group.processed',
			'products.ahmad-aghaei.name',
			'products.ahmad-aghaei.summary',
			'products.akbari.name',
			'products.akbari.summary',
			'products.fandoghi.name',
			'products.fandoghi.summary',
			'products.kaleh-ghouchi.name',
			'products.kaleh-ghouchi.summary',
			'products.dahan-bast.name',
			'products.dahan-bast.summary',
			'products.kernels.name',
			'products.kernels.summary',
			'products.salted-roasted.name',
			'products.salted-roasted.summary',
		],
		'Contact' => [
			'Contact.title',
			'Contact.lead',
			'Contact.email',
			'Contact.emailNote',
			'Contact.phone',
			'Contact.phoneNote',
			'Contact.whatsapp',
			'Contact.whatsappOpen',
			'Contact.whatsappNote',
			'Contact.office',
			'Contact.addressNote',
			'Contact.includeTitle',
			'Contact.includeLead',
			'Contact.include1',
			'Contact.include2',
			'Contact.include3',
			'Contact.emailCta',
			'Contact.emailSubject',
		],
		'Footer' => ['Footer.tagline', 'Footer.navigate', 'Footer.contact', 'Footer.rights', 'Footer.privacy'],
		'Privacy' => [
			'Privacy.title',
			'Privacy.lead',
			'Privacy.collectTitle',
			'Privacy.collectBody',
			'Privacy.cookiesTitle',
			'Privacy.cookiesBody',
			'Privacy.contactTitle',
			'Privacy.contactBody',
			'Privacy.thirdTitle',
			'Privacy.thirdBody',
			'Privacy.reachTitle',
			'Privacy.reachBody',
			'Privacy.contactPage',
		],
	];
}
