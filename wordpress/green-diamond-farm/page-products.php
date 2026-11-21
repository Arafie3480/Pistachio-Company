<?php
/**
 * Products template — open cards with photo slots + links to detail pages.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

// Fallback when page-product.php is not yet on the host (theme-editor deploy).
if (gdf_current_page_key() === 'product') {
	gdf_render_product_detail_page();
	return;
}

get_header();

$groups = gdf_config()['product_groups'];

gdf_page_hero(gdf_t('Products.title'), gdf_t('Products.lead'));
?>

<section class="gdf-section" style="padding-block:4rem;">
	<div class="gdf-wrap">
		<p style="max-width:42rem;"><?php echo esc_html(gdf_t('Products.outlineNote')); ?></p>

		<?php foreach ($groups as $group_id => $slugs) : ?>
			<div class="gdf-product-group">
				<h2 class="gdf-section-label"><?php echo esc_html(gdf_t('Products.group.' . $group_id)); ?></h2>
				<ul class="gdf-catalog-grid" role="list">
					<?php foreach ($slugs as $slug) :
						$name = gdf_t('products.' . $slug . '.name');
						$summary = gdf_t('products.' . $slug . '.summary');
						$alt = gdf_t('products.' . $slug . '.imageAlt');
						$url = gdf_product_url($slug);
						$img = gdf_product_image($slug);
						?>
						<li>
							<a class="gdf-catalog-card" href="<?php echo esc_url($url); ?>">
								<span class="gdf-catalog-card__media">
									<img src="<?php echo esc_url($img); ?>" alt="<?php echo esc_attr($alt); ?>" width="800" height="600" loading="lazy" />
								</span>
								<span class="gdf-catalog-card__body">
									<span class="gdf-catalog-card__title"><?php echo esc_html($name); ?></span>
									<span class="gdf-catalog-card__summary"><?php echo esc_html($summary); ?></span>
									<span class="gdf-catalog-card__more"><?php echo esc_html(gdf_t('Products.viewDetails')); ?></span>
								</span>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endforeach; ?>

		<div style="margin-top:4rem;max-width:36rem;border-top:1px solid color-mix(in oklab, var(--gold) 35%, transparent);padding-top:3rem;">
			<h2><?php echo esc_html(gdf_t('Products.ctaTitle')); ?></h2>
			<p><?php echo esc_html(gdf_t('Products.ctaLead')); ?></p>
			<p style="margin-top:1.5rem;"><?php gdf_btn(gdf_url('contact'), gdf_t('Products.ctaButton'), 'gold'); ?></p>
		</div>
	</div>
</section>

<?php
get_footer();
