<?php
/**
 * About template.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();

$legal = gdf_brand_legal();
$brand = gdf_config()['brand'];
$people = gdf_config()['people'];
$years = gdf_config()['history_years'];
$imagery = gdf_imagery();

gdf_page_hero(gdf_t('About.title'), gdf_t('About.lead'));
?>

<section class="gdf-section" style="padding-block:4rem;">
	<div class="gdf-wrap gdf-about-grid">
		<div>
			<h2><?php echo esc_html(gdf_t('About.heading')); ?></h2>
			<p>
				<?php
				echo esc_html(
					gdf_t('About.p1', [
						'brand' => $legal['display_name'],
						'legalName' => $legal['prefer_fa'] ? $brand['legal_fa'] : $brand['legal_en'],
						'legalNameFa' => $legal['prefer_fa'] ? $brand['legal_en'] : $brand['legal_fa'],
					])
				);
				?>
			</p>
			<p><?php echo esc_html(gdf_t('About.p2', ['brand' => $legal['display_name']])); ?></p>
		</div>
		<div class="gdf-about-media">
			<img src="<?php echo esc_url($imagery['orchard']); ?>" alt="<?php echo esc_attr(gdf_t('About.imageAlt')); ?>" />
		</div>
	</div>
</section>

<section class="gdf-split">
	<div class="gdf-wrap" style="padding-block:4rem;">
		<h2><?php echo esc_html(gdf_t('About.historyTitle')); ?></h2>
		<p><?php echo esc_html(gdf_t('About.historyNote')); ?></p>

		<ul class="gdf-years">
			<li>
				<p class="num" aria-label="<?php echo esc_attr(gdf_t('About.yearsAgriculture', ['years' => $years['agriculture']])); ?>">
					<span><?php echo esc_html((string) $years['agriculture']); ?></span><span>+</span>
				</p>
				<p><?php echo esc_html(gdf_t('About.yearsAgricultureLabel')); ?></p>
			</li>
			<li>
				<p class="num" aria-label="<?php echo esc_attr(gdf_t('About.yearsTrade', ['years' => $years['trade']])); ?>">
					<span><?php echo esc_html((string) $years['trade']); ?></span><span>+</span>
				</p>
				<p><?php echo esc_html(gdf_t('About.yearsTradeLabel')); ?></p>
			</li>
			<li>
				<p class="num" aria-label="<?php echo esc_attr(gdf_t('About.yearsExport', ['years' => $years['export']])); ?>">
					<span><?php echo esc_html((string) $years['export']); ?></span><span>+</span>
				</p>
				<p><?php echo esc_html(gdf_t('About.yearsExportLabel')); ?></p>
			</li>
		</ul>

		<dl class="gdf-dl">
			<div>
				<dt class="gdf-section-label"><?php echo esc_html(gdf_t('About.founderLabel')); ?></dt>
				<dd>
					<?php
					echo esc_html(
						gdf_t('About.founderBody', [
							'nameEn' => $people['founder']['en'],
							'nameFa' => $people['founder']['fa'],
						])
					);
					?>
				</dd>
			</div>
			<div>
				<dt class="gdf-section-label"><?php echo esc_html(gdf_t('About.ceoLabel')); ?></dt>
				<dd>
					<?php
					echo esc_html(
						gdf_t('About.ceoBody', [
							'nameEn' => $people['ceo']['en'],
							'nameFa' => $people['ceo']['fa'],
						])
					);
					?>
				</dd>
			</div>
			<div>
				<dt class="gdf-section-label"><?php echo esc_html(gdf_t('About.originLabel')); ?></dt>
				<dd><?php echo esc_html(gdf_t('About.originBody', ['legalName' => $legal['legal_name']])); ?></dd>
			</div>
			<div>
				<dt class="gdf-section-label"><?php echo esc_html(gdf_t('About.standLabel')); ?></dt>
				<dd><?php echo esc_html(gdf_t('About.standBody')); ?></dd>
			</div>
			<div>
				<dt class="gdf-section-label"><?php echo esc_html(gdf_t('About.certsLabel')); ?></dt>
				<dd><?php echo esc_html(gdf_t('About.certsBody')); ?></dd>
			</div>
			<div>
				<dt class="gdf-section-label"><?php echo esc_html(gdf_t('About.marketsLabel')); ?></dt>
				<dd><?php echo esc_html(gdf_t('About.marketsBody')); ?></dd>
			</div>
		</dl>
	</div>
</section>

<?php
get_footer();
