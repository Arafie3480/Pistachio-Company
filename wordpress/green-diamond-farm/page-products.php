<?php
/**
 * Products template.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();

$imagery = gdf_imagery();
$groups = gdf_config()['product_groups'];
$n = 1;
$index = [];
foreach ($groups as $slugs) {
	foreach ($slugs as $slug) {
		$index[$slug] = $n++;
	}
}

gdf_page_hero(gdf_t('Products.title'), gdf_t('Products.lead'));
?>

<div class="gdf-products-strip" aria-hidden="true">
	<img src="<?php echo esc_url($imagery['product']); ?>" alt="" />
</div>

<section class="gdf-section" style="padding-block:4rem;">
	<div class="gdf-wrap">
		<p style="max-width:42rem;"><?php echo esc_html(gdf_t('Products.outlineNote')); ?></p>

		<?php foreach ($groups as $group_id => $slugs) : ?>
			<div class="gdf-product-group">
				<h2 class="gdf-section-label"><?php echo esc_html(gdf_t('Products.group.' . $group_id)); ?></h2>
				<ul class="gdf-product-list">
					<?php foreach ($slugs as $slug) : ?>
						<li class="gdf-product-row">
							<span class="idx"><?php echo esc_html(str_pad((string) $index[$slug], 2, '0', STR_PAD_LEFT)); ?></span>
							<div>
								<h3><?php echo esc_html(gdf_t('products.' . $slug . '.name')); ?></h3>
								<p><?php echo esc_html(gdf_t('products.' . $slug . '.summary')); ?></p>
							</div>
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
