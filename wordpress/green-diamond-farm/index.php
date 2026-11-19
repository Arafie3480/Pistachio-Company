<?php
/**
 * Fallback index — marketing pages use dedicated templates.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();
?>

<section class="gdf-section" style="padding-top:8rem;">
	<div class="gdf-wrap">
		<h1><?php echo esc_html(get_the_title() ?: gdf_t('Meta.titleDefault')); ?></h1>
		<?php if (have_posts()) : ?>
			<?php while (have_posts()) : the_post(); ?>
				<div class="gdf-prose"><?php the_content(); ?></div>
			<?php endwhile; ?>
		<?php else : ?>
			<p><?php echo esc_html(gdf_t('NotFound.lead')); ?></p>
			<p><?php gdf_btn(gdf_url('home'), gdf_t('NotFound.home'), 'gold'); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
