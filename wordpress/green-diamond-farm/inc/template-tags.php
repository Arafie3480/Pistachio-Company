<?php
/**
 * Shared markup helpers.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

function gdf_logo_url(string $size = 'nav'): string
{
	$custom = get_theme_mod('custom_logo');
	if ($custom) {
		$url = wp_get_attachment_image_url((int) $custom, 'full');
		if (is_string($url) && $url !== '') {
			return $url;
		}
	}

	$file = match ($size) {
		'hero', 'footer' => 'logo-lockup.png',
		default => 'logo-nav-trim.png',
	};
	return GDF_URI . '/assets/brand/' . $file;
}

function gdf_logo_alt(): string
{
	$legal = gdf_brand_legal();
	return $legal['prefer_fa']
		? $legal['display_name'] . ' ' . $legal['region']
		: 'Green Diamond Farm Rafsanjan';
}

function gdf_whatsapp_url(?string $prefill = null): string
{
	$c = gdf_contact();
	$base = 'https://wa.me/' . preg_replace('/\D+/', '', $c['whatsapp']);
	if ($prefill) {
		return $base . '?text=' . rawurlencode($prefill);
	}
	return $base;
}

function gdf_mailto(string $subject = ''): string
{
	$c = gdf_contact();
	$url = 'mailto:' . $c['email'];
	if ($subject !== '') {
		$url .= '?subject=' . rawurlencode($subject);
	}
	return $url;
}

/**
 * Interior page hero.
 */
function gdf_page_hero(string $title, string $lead): void
{
	$img = gdf_imagery()['harvest'];
	?>
	<section class="gdf-page-hero">
		<div class="gdf-page-hero__media" aria-hidden="true">
			<img src="<?php echo esc_url($img); ?>" alt="" />
		</div>
		<div class="gdf-page-hero__shade" aria-hidden="true"></div>
		<div class="gdf-wrap gdf-page-hero__inner">
			<h1 class="gdf-fade"><?php echo esc_html($title); ?></h1>
			<div class="gdf-rule gdf-fade gdf-delay-1" aria-hidden="true"></div>
			<p class="gdf-fade gdf-delay-2"><?php echo esc_html($lead); ?></p>
		</div>
	</section>
	<?php
}

function gdf_btn(string $href, string $label, string $variant = 'gold'): void
{
	$class = $variant === 'outline' ? 'gdf-btn gdf-btn--outline' : 'gdf-btn gdf-btn--gold';
	$attrs = str_starts_with($href, 'https://wa.me/')
		? ' target="_blank" rel="noopener noreferrer"'
		: '';
	printf(
		'<a class="%s" href="%s"%s>%s</a>',
		esc_attr($class),
		esc_url($href),
		$attrs,
		esc_html($label)
	);
}

function gdf_icon(string $name): void
{
	$icons = [
		'mail' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
		'phone' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
		'wa' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
		'pin' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
		'menu' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
		'x' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
	];
	echo $icons[$name] ?? '';
}
