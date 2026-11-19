<?php
/**
 * 404 template.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();
?>

<section class="gdf-section gdf-404">
	<div class="gdf-wrap">
		<p class="code"><?php echo esc_html(gdf_t('NotFound.code')); ?></p>
		<h1><?php echo esc_html(gdf_t('NotFound.title')); ?></h1>
		<p><?php echo esc_html(gdf_t('NotFound.lead')); ?></p>
		<div class="gdf-404__actions">
			<?php gdf_btn(gdf_url('home'), gdf_t('NotFound.home'), 'gold'); ?>
			<?php gdf_btn(gdf_url('contact'), gdf_t('NotFound.contact'), 'outline'); ?>
		</div>
	</div>
</section>

<?php
get_footer();
