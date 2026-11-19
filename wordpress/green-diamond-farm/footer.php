<?php
/**
 * Theme footer shell.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

$legal = gdf_brand_legal();
$brand = gdf_config()['brand'];
$contact = gdf_contact();
$nav = [
	'home' => gdf_t('Nav.home'),
	'about' => gdf_t('Nav.about'),
	'products' => gdf_t('Nav.products'),
	'contact' => gdf_t('Nav.contact'),
];
$subject = gdf_t('Contact.emailSubject');
$wa = gdf_whatsapp_url($subject);
?>
	</main>

	<footer class="gdf-footer">
		<div class="gdf-wrap gdf-footer__grid">
			<div>
				<div class="gdf-footer__brand">
					<img src="<?php echo esc_url(gdf_logo_url('footer')); ?>" alt="<?php echo esc_attr(gdf_logo_alt()); ?>" width="180" height="64" />
					<div>
						<p class="name" <?php echo $legal['prefer_fa'] ? 'lang="fa" dir="rtl"' : ''; ?>>
							<?php echo esc_html($legal['display_name']); ?>
						</p>
						<p class="legal">
							<?php if ($legal['prefer_fa']) : ?>
								<span lang="fa" dir="rtl"><?php echo esc_html($brand['legal_fa']); ?></span>
								<span aria-hidden="true"> · </span>
								<span dir="ltr"><?php echo esc_html($brand['legal_en']); ?></span>
							<?php else : ?>
								<?php echo esc_html($brand['legal_en']); ?>
								<span aria-hidden="true"> · </span>
								<span lang="fa" dir="rtl"><?php echo esc_html($brand['legal_fa']); ?></span>
							<?php endif; ?>
						</p>
						<?php if ($legal['region'] !== '') : ?>
							<p class="region gdf-eyebrow" <?php echo $legal['prefer_fa'] ? 'lang="fa" dir="rtl"' : ''; ?>>
								<?php echo esc_html($legal['region']); ?>
							</p>
						<?php endif; ?>
					</div>
				</div>
				<p class="gdf-footer__tagline">
					<?php
					echo esc_html(
						gdf_t('Footer.tagline', [
							'legalName' => $legal['legal_name'],
							'legalNameFa' => $legal['prefer_fa'] ? $brand['legal_en'] : $brand['legal_fa'],
						])
					);
					?>
				</p>
			</div>

			<div class="gdf-footer__cols">
				<div>
					<p class="gdf-section-label"><?php echo esc_html(gdf_t('Footer.navigate')); ?></p>
					<ul>
						<?php foreach ($nav as $key => $label) : ?>
							<li><a href="<?php echo esc_url(gdf_url($key)); ?>"><?php echo esc_html($label); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</div>
				<div>
					<p class="gdf-section-label"><?php echo esc_html(gdf_t('Footer.contact')); ?></p>
					<ul>
						<li>
							<a href="<?php echo esc_url(gdf_mailto($subject)); ?>"><?php echo esc_html($contact['email']); ?></a>
						</li>
						<li>
							<a href="<?php echo esc_url('tel:' . $contact['phone']); ?>" dir="ltr"><?php echo esc_html($contact['phone_display']); ?></a>
						</li>
						<li>
							<a href="<?php echo esc_url($wa); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html(gdf_t('Contact.whatsapp')); ?></a>
						</li>
						<li <?php echo gdf_prefer_fa() ? 'lang="fa" dir="rtl"' : ''; ?>>
							<?php echo esc_html(gdf_prefer_fa() ? $contact['address_fa'] : $contact['address_en']); ?>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="gdf-footer__bar">
			<div class="gdf-wrap gdf-footer__bar-inner">
				<p>
					<?php
					echo esc_html(
						gdf_t('Footer.rights', [
							'year' => (string) $brand['copyright_year'],
							'brand' => $legal['display_name'],
						])
					);
					?>
				</p>
				<div>
					<a href="<?php echo esc_url(gdf_url('privacy')); ?>"><?php echo esc_html(gdf_t('Footer.privacy')); ?></a>
					<span aria-hidden="true"> · </span>
					<span><?php echo esc_html($brand['domain']); ?></span>
				</div>
			</div>
		</div>
	</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
