<?php
/**
 * Home template.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();

$legal = gdf_brand_legal();
$imagery = gdf_imagery();
$slugs = gdf_config()['product_slugs'];
$pillars = [
	['Home.pillar1Title', 'Home.pillar1Body'],
	['Home.pillar2Title', 'Home.pillar2Body'],
	['Home.pillar3Title', 'Home.pillar3Body'],
];
?>

<section class="gdf-hero">
	<div class="gdf-hero__media" aria-hidden="true">
		<img src="<?php echo esc_url($imagery['hero']); ?>" alt="" />
	</div>
	<div class="gdf-hero__shade" aria-hidden="true"></div>
	<div class="gdf-wrap gdf-hero__inner">
		<div class="gdf-fade">
			<a class="gdf-logo-hero" href="<?php echo esc_url(gdf_url('home')); ?>">
				<img src="<?php echo esc_url(gdf_logo_url('hero')); ?>" alt="<?php echo esc_attr(gdf_logo_alt()); ?>" width="280" height="120" />
			</a>
			<p class="gdf-eyebrow" <?php echo $legal['prefer_fa'] ? 'lang="fa" dir="rtl"' : ''; ?>>
				<?php echo esc_html($legal['legal_name'] . ($legal['region'] !== '' ? ' · ' . $legal['region'] : '')); ?>
			</p>
		</div>
		<h1 class="gdf-fade gdf-delay-1"><?php echo esc_html(gdf_t('Home.headline')); ?></h1>
		<p class="gdf-lead gdf-fade gdf-delay-2">
			<?php echo esc_html(gdf_t('Home.subhead', ['legalName' => $legal['legal_name']])); ?>
		</p>
		<div class="gdf-hero__ctas gdf-fade gdf-delay-3">
			<?php gdf_btn(gdf_url('contact'), gdf_t('Home.ctaContact'), 'gold'); ?>
			<?php gdf_btn(gdf_url('products'), gdf_t('Home.ctaProducts'), 'outline'); ?>
		</div>
	</div>
</section>

<section class="gdf-section">
	<div class="gdf-wrap">
		<div style="max-width:42rem;">
			<h2><?php echo esc_html(gdf_t('Home.buyersTitle')); ?></h2>
			<div class="gdf-rule" aria-hidden="true"></div>
			<p><?php echo esc_html(gdf_t('Home.buyersLead')); ?></p>
		</div>
		<ul class="gdf-pillars">
			<?php foreach ($pillars as [$title_key, $body_key]) : ?>
				<li>
					<h3><?php echo esc_html(gdf_t($title_key)); ?></h3>
					<p><?php echo esc_html(gdf_t($body_key)); ?></p>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>

<section class="gdf-split">
	<div class="gdf-wrap gdf-split__grid">
		<div class="gdf-split__media">
			<img src="<?php echo esc_url($imagery['product']); ?>" alt="<?php echo esc_attr(gdf_t('Home.productAlt')); ?>" />
		</div>
		<div>
			<h2><?php echo esc_html(gdf_t('Home.shipmentTitle')); ?></h2>
			<p><?php echo esc_html(gdf_t('Home.shipmentLead')); ?></p>
			<ul class="gdf-list">
				<?php foreach (array_slice($slugs, 0, 5) as $slug) : ?>
					<li><?php echo esc_html(gdf_t('products.' . $slug . '.name')); ?></li>
				<?php endforeach; ?>
				<li style="color:var(--muted-foreground);"><?php echo esc_html(gdf_t('Home.kernelsRoasted')); ?></li>
			</ul>
			<p style="margin-top:2rem;"><?php gdf_btn(gdf_url('products'), gdf_t('Home.seeAll'), 'gold'); ?></p>
		</div>
	</div>
</section>

<section class="gdf-cta-band">
	<div class="gdf-wrap">
		<div style="max-width:36rem;">
			<h2><?php echo esc_html(gdf_t('Home.ctaTitle')); ?></h2>
			<div class="gdf-rule" aria-hidden="true"></div>
			<p><?php echo esc_html(gdf_t('Home.ctaLead')); ?></p>
			<p style="margin-top:2rem;"><?php gdf_btn(gdf_url('contact'), gdf_t('Home.ctaButton'), 'gold'); ?></p>
		</div>
	</div>
</section>

<?php
get_footer();
