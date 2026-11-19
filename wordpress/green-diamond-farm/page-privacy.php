<?php
/**
 * Privacy template.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();

$legal = gdf_brand_legal();
$contact = gdf_contact();
$sections = [
	['Privacy.collectTitle', 'Privacy.collectBody'],
	['Privacy.cookiesTitle', 'Privacy.cookiesBody'],
	['Privacy.contactTitle', 'Privacy.contactBody'],
	['Privacy.thirdTitle', 'Privacy.thirdBody'],
];

gdf_page_hero(
	gdf_t('Privacy.title'),
	gdf_t('Privacy.lead', ['brand' => $legal['display_name']])
);
?>

<section class="gdf-section" style="padding-block:4rem;">
	<div class="gdf-wrap gdf-prose">
		<?php foreach ($sections as [$title_key, $body_key]) : ?>
			<div>
				<h2><?php echo esc_html(gdf_t($title_key)); ?></h2>
				<p><?php echo esc_html(gdf_t($body_key)); ?></p>
			</div>
		<?php endforeach; ?>

		<div>
			<h2><?php echo esc_html(gdf_t('Privacy.reachTitle')); ?></h2>
			<p><?php echo esc_html(gdf_t('Privacy.reachBody')); ?></p>
			<ul class="gdf-list">
				<li><a href="<?php echo esc_url(gdf_mailto()); ?>"><?php echo esc_html($contact['email']); ?></a></li>
				<li><a href="<?php echo esc_url(gdf_url('contact')); ?>"><?php echo esc_html(gdf_t('Privacy.contactPage')); ?></a></li>
			</ul>
		</div>
	</div>
</section>

<?php
get_footer();
