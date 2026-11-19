<?php
/**
 * Theme header shell.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

$page = gdf_current_page_key();
$is_home = $page === 'home';
$legal = gdf_brand_legal();
$nav = [
	'home' => gdf_t('Nav.home'),
	'about' => gdf_t('Nav.about'),
	'products' => gdf_t('Nav.products'),
	'contact' => gdf_t('Nav.contact'),
];
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="google" content="notranslate" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> translate="no">
<?php wp_body_open(); ?>
<div class="gdf-site">
	<a class="gdf-skip" href="#main"><?php echo esc_html(gdf_t('A11y.skipToContent')); ?></a>

	<header class="gdf-header<?php echo $is_home ? '' : ' is-solid'; ?>" data-gdf-header data-home="<?php echo $is_home ? '1' : '0'; ?>">
		<div class="gdf-wrap gdf-header__inner">
			<a class="gdf-logo" href="<?php echo esc_url(gdf_url('home')); ?>">
				<img src="<?php echo esc_url(gdf_logo_url('nav')); ?>" alt="<?php echo esc_attr(gdf_logo_alt()); ?>" width="160" height="48" />
			</a>

			<nav class="gdf-nav" aria-label="<?php echo esc_attr(gdf_t('Nav.primary')); ?>">
				<?php foreach ($nav as $key => $label) : ?>
					<a href="<?php echo esc_url(gdf_url($key)); ?>" <?php echo $page === $key ? 'aria-current="page"' : ''; ?>>
						<?php echo esc_html($label); ?>
					</a>
				<?php endforeach; ?>

				<?php gdf_lang_switcher(); ?>

				<?php gdf_btn(gdf_url('contact'), gdf_t('Nav.inquire'), 'gold'); ?>
			</nav>

			<div class="gdf-header__mobile">
				<?php gdf_lang_switcher(); ?>
				<button
					type="button"
					class="gdf-menu-btn"
					data-gdf-menu
					data-label-open="<?php echo esc_attr(gdf_t('Nav.openMenu')); ?>"
					data-label-close="<?php echo esc_attr(gdf_t('Nav.closeMenu')); ?>"
					aria-expanded="false"
					aria-controls="gdf-mobile-nav"
					aria-label="<?php echo esc_attr(gdf_t('Nav.openMenu')); ?>"
				>
					<?php gdf_icon('menu'); ?>
				</button>
			</div>
		</div>

		<div class="gdf-drawer" id="gdf-mobile-nav" data-gdf-drawer>
			<nav class="gdf-wrap" aria-label="<?php echo esc_attr(gdf_t('Nav.mobile')); ?>">
				<?php foreach ($nav as $key => $label) : ?>
					<a href="<?php echo esc_url(gdf_url($key)); ?>" <?php echo $page === $key ? 'aria-current="page"' : ''; ?>>
						<?php echo esc_html($label); ?>
					</a>
				<?php endforeach; ?>
				<?php gdf_btn(gdf_url('contact'), gdf_t('Nav.inquire'), 'gold'); ?>
			</nav>
		</div>
	</header>

	<main id="main" class="gdf-main">
