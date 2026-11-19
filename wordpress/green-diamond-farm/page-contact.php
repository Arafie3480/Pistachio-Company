<?php
/**
 * Contact template.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

get_header();

$contact = gdf_contact();
$subject = gdf_t('Contact.emailSubject');
$wa = gdf_whatsapp_url($subject);
$prefer_fa = gdf_prefer_fa();

gdf_page_hero(gdf_t('Contact.title'), gdf_t('Contact.lead'));
?>

<section class="gdf-section" style="padding-block:4rem;">
	<div class="gdf-wrap gdf-contact-grid">
		<div>
			<div class="gdf-contact-item">
				<span class="gdf-contact-icon"><?php gdf_icon('mail'); ?></span>
				<div>
					<h2><?php echo esc_html(gdf_t('Contact.email')); ?></h2>
					<a href="<?php echo esc_url(gdf_mailto($subject)); ?>"><?php echo esc_html($contact['email']); ?></a>
					<p class="note"><?php echo esc_html(gdf_t('Contact.emailNote')); ?></p>
				</div>
			</div>

			<div class="gdf-contact-item">
				<span class="gdf-contact-icon"><?php gdf_icon('phone'); ?></span>
				<div>
					<h2><?php echo esc_html(gdf_t('Contact.phone')); ?></h2>
					<a href="<?php echo esc_url('tel:' . $contact['phone']); ?>" dir="ltr"><?php echo esc_html($contact['phone_display']); ?></a>
					<p class="note"><?php echo esc_html(gdf_t('Contact.phoneNote')); ?></p>
				</div>
			</div>

			<div class="gdf-contact-item">
				<span class="gdf-contact-icon"><?php gdf_icon('wa'); ?></span>
				<div>
					<h2><?php echo esc_html(gdf_t('Contact.whatsapp')); ?></h2>
					<p class="value" dir="ltr"><?php echo esc_html($contact['phone_display']); ?></p>
					<p style="margin-top:0.75rem;"><?php gdf_btn($wa, gdf_t('Contact.whatsappOpen'), 'outline'); ?></p>
					<p class="note"><?php echo esc_html(gdf_t('Contact.whatsappNote')); ?></p>
				</div>
			</div>

			<div class="gdf-contact-item">
				<span class="gdf-contact-icon"><?php gdf_icon('pin'); ?></span>
				<div>
					<h2><?php echo esc_html(gdf_t('Contact.office')); ?></h2>
					<?php if ($prefer_fa) : ?>
						<p class="value" lang="fa" dir="rtl"><?php echo esc_html($contact['address_fa']); ?></p>
						<p class="note" dir="ltr"><?php echo esc_html($contact['address_en']); ?></p>
					<?php else : ?>
						<p class="value"><?php echo esc_html($contact['address_en']); ?></p>
						<p class="note" lang="fa" dir="rtl"><?php echo esc_html($contact['address_fa']); ?></p>
					<?php endif; ?>
					<p class="note"><?php echo esc_html(gdf_t('Contact.addressNote')); ?></p>
				</div>
			</div>
		</div>

		<aside class="gdf-aside">
			<h2><?php echo esc_html(gdf_t('Contact.includeTitle')); ?></h2>
			<div class="gdf-rule" aria-hidden="true"></div>
			<p><?php echo esc_html(gdf_t('Contact.includeLead')); ?></p>
			<ul>
				<li><?php echo esc_html(gdf_t('Contact.include1')); ?></li>
				<li><?php echo esc_html(gdf_t('Contact.include2')); ?></li>
				<li><?php echo esc_html(gdf_t('Contact.include3')); ?></li>
			</ul>
			<div class="gdf-aside__actions">
				<?php gdf_btn(gdf_mailto($subject), gdf_t('Contact.emailCta'), 'gold'); ?>
				<?php gdf_btn($wa, gdf_t('Contact.whatsappOpen'), 'outline'); ?>
			</div>
		</aside>
	</div>
</section>

<?php
get_footer();
