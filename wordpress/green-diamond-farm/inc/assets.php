<?php
/**
 * Front-end CSS/JS and brand favicons.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

add_action('wp_enqueue_scripts', static function (): void {
	wp_enqueue_style(
		'gdf-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap',
		[],
		null
	);

	wp_enqueue_style(
		'gdf-main',
		GDF_URI . '/assets/css/main.css',
		['gdf-fonts'],
		GDF_VERSION
	);

	wp_enqueue_script(
		'gdf-main',
		GDF_URI . '/assets/js/main.js',
		[],
		GDF_VERSION,
		true
	);
});

add_action('wp_head', static function (): void {
	$icon = GDF_URI . '/assets/brand/favicon-32.png';
	$apple = GDF_URI . '/assets/brand/apple-touch.png';
	echo '<link rel="icon" href="' . esc_url($icon) . '" sizes="32x32" />' . "\n";
	echo '<link rel="apple-touch-icon" href="' . esc_url($apple) . '" />' . "\n";
}, 2);
