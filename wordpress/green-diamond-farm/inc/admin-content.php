<?php
/**
 * Appearance → Site Content — edit copy & contact without touching CSS.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

add_action('admin_menu', static function (): void {
	add_theme_page(
		__('Site Content', 'green-diamond-farm'),
		__('Site Content', 'green-diamond-farm'),
		'edit_theme_options',
		'gdf-site-content',
		'gdf_render_site_content_page'
	);
});

function gdf_render_site_content_page(): void
{
	if (!current_user_can('edit_theme_options')) {
		return;
	}

	$locales = gdf_locales();
	$locale = isset($_GET['gdf_locale']) ? sanitize_key((string) wp_unslash($_GET['gdf_locale'])) : 'fa';
	if (!in_array($locale, $locales, true)) {
		$locale = 'fa';
	}

	if (
		isset($_POST['gdf_content_nonce'])
		&& wp_verify_nonce(sanitize_text_field(wp_unslash((string) $_POST['gdf_content_nonce'])), 'gdf_save_content')
	) {
		gdf_handle_content_save($locale);
		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Saved. Styles were not changed.', 'green-diamond-farm') . '</p></div>';
	}

	$defaults = gdf_flatten(gdf_load_defaults($locale));
	$overrides = gdf_flatten(gdf_overrides($locale));
	$contact = gdf_contact();
	$imagery = gdf_imagery();
	$default_locale = gdf_default_locale();
	$groups = gdf_editable_groups();
	?>
	<div class="wrap">
		<h1><?php esc_html_e('Site Content', 'green-diamond-farm'); ?></h1>
		<p style="max-width:52rem;">
			<?php esc_html_e('Edit buyer-facing text, products, and contact details. Layout, colors, and fonts stay locked in the theme.', 'green-diamond-farm'); ?>
		</p>

		<nav class="nav-tab-wrapper" style="margin:1rem 0;">
			<?php foreach ($locales as $loc) : ?>
				<a class="nav-tab <?php echo $loc === $locale ? 'nav-tab-active' : ''; ?>"
					href="<?php echo esc_url(admin_url('themes.php?page=gdf-site-content&gdf_locale=' . $loc)); ?>">
					<?php echo esc_html(gdf_config()['locale_labels'][$loc] ?? $loc); ?>
				</a>
			<?php endforeach; ?>
		</nav>

		<form method="post">
			<?php wp_nonce_field('gdf_save_content', 'gdf_content_nonce'); ?>
			<input type="hidden" name="gdf_locale" value="<?php echo esc_attr($locale); ?>" />

			<h2><?php esc_html_e('Site settings', 'green-diamond-farm'); ?></h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="gdf_default_locale"><?php esc_html_e('Default language (no URL prefix)', 'green-diamond-farm'); ?></label></th>
					<td>
						<select name="gdf_default_locale" id="gdf_default_locale">
							<?php foreach ($locales as $loc) : ?>
								<option value="<?php echo esc_attr($loc); ?>" <?php selected($default_locale, $loc); ?>>
									<?php echo esc_html(gdf_config()['locale_labels'][$loc] ?? $loc); ?>
								</option>
							<?php endforeach; ?>
						</select>
					</td>
				</tr>
			</table>

			<h2><?php esc_html_e('Contact details (shared across languages)', 'green-diamond-farm'); ?></h2>
			<table class="form-table" role="presentation">
				<?php
				$fields = [
					'email' => 'Email',
					'phone' => 'Phone (tel:)',
					'phone_display' => 'Phone display',
					'whatsapp' => 'WhatsApp digits',
					'address_en' => 'Address (EN)',
					'address_fa' => 'Address (FA)',
				];
				foreach ($fields as $key => $label) :
					?>
					<tr>
						<th scope="row"><label for="gdf_contact_<?php echo esc_attr($key); ?>"><?php echo esc_html($label); ?></label></th>
						<td>
							<input class="regular-text" type="text" name="gdf_contact[<?php echo esc_attr($key); ?>]" id="gdf_contact_<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($contact[$key] ?? ''); ?>" />
						</td>
					</tr>
				<?php endforeach; ?>
			</table>

			<h2><?php esc_html_e('Images (URLs)', 'green-diamond-farm'); ?></h2>
			<p class="description"><?php esc_html_e('Replace stock URLs with owned photography when ready. Keep similar aspect ratios.', 'green-diamond-farm'); ?></p>
			<table class="form-table" role="presentation">
				<?php foreach (['hero', 'orchard', 'product', 'harvest'] as $key) : ?>
					<tr>
						<th scope="row"><label for="gdf_img_<?php echo esc_attr($key); ?>"><?php echo esc_html(ucfirst($key)); ?></label></th>
						<td>
							<input class="large-text" type="url" name="gdf_imagery[<?php echo esc_attr($key); ?>]" id="gdf_img_<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($imagery[$key] ?? ''); ?>" />
						</td>
					</tr>
				<?php endforeach; ?>
			</table>

			<h2><?php echo esc_html(sprintf(/* translators: locale label */ __('Copy — %s', 'green-diamond-farm'), gdf_config()['locale_labels'][$locale] ?? $locale)); ?></h2>
			<p class="description"><?php esc_html_e('Leave a field empty to keep the theme default for that language. Saving a value overrides only that field.', 'green-diamond-farm'); ?></p>

			<?php foreach ($groups as $group => $keys) : ?>
				<details open style="margin:1rem 0;border:1px solid #c3c4c7;padding:0 1rem 1rem;background:#fff;">
					<summary style="cursor:pointer;font-weight:600;padding:0.75rem 0;"><?php echo esc_html($group); ?></summary>
					<table class="form-table" role="presentation">
						<?php foreach ($keys as $key) :
							$current = $overrides[$key] ?? '';
							$placeholder = $defaults[$key] ?? '';
							$rows = strlen($placeholder) > 90 ? 3 : 1;
							?>
							<tr>
								<th scope="row"><label for="gdf_f_<?php echo esc_attr(md5($key)); ?>"><code><?php echo esc_html($key); ?></code></label></th>
								<td>
									<?php if ($rows > 1) : ?>
										<textarea class="large-text" rows="<?php echo (int) $rows; ?>" name="gdf_fields[<?php echo esc_attr($key); ?>]" id="gdf_f_<?php echo esc_attr(md5($key)); ?>" placeholder="<?php echo esc_attr($placeholder); ?>"><?php echo esc_textarea($current); ?></textarea>
									<?php else : ?>
										<input class="large-text" type="text" name="gdf_fields[<?php echo esc_attr($key); ?>]" id="gdf_f_<?php echo esc_attr(md5($key)); ?>" value="<?php echo esc_attr($current); ?>" placeholder="<?php echo esc_attr($placeholder); ?>" />
									<?php endif; ?>
								</td>
							</tr>
						<?php endforeach; ?>
					</table>
				</details>
			<?php endforeach; ?>

			<?php submit_button(__('Save content', 'green-diamond-farm')); ?>
		</form>
	</div>
	<?php
}

function gdf_handle_content_save(string $locale): void
{
	if (isset($_POST['gdf_default_locale'])) {
		$dl = sanitize_key((string) wp_unslash($_POST['gdf_default_locale']));
		if (in_array($dl, gdf_locales(), true)) {
			update_option('gdf_default_locale', $dl);
			update_option('gdf_flush_rewrites', 1);
		}
	}

	if (isset($_POST['gdf_contact']) && is_array($_POST['gdf_contact'])) {
		$clean = [];
		foreach ($_POST['gdf_contact'] as $k => $v) {
			$key = sanitize_key((string) $k);
			$clean[$key] = sanitize_text_field(wp_unslash((string) $v));
		}
		update_option('gdf_contact', $clean);
	}

	if (isset($_POST['gdf_imagery']) && is_array($_POST['gdf_imagery'])) {
		$clean = [];
		foreach ($_POST['gdf_imagery'] as $k => $v) {
			$key = sanitize_key((string) $k);
			$clean[$key] = esc_url_raw(wp_unslash((string) $v));
		}
		update_option('gdf_imagery', $clean);
	}

	$posted = isset($_POST['gdf_fields']) && is_array($_POST['gdf_fields']) ? wp_unslash($_POST['gdf_fields']) : [];
	$flat = [];
	$allowed = [];
	foreach (gdf_editable_groups() as $keys) {
		foreach ($keys as $key) {
			$allowed[$key] = true;
		}
	}

	foreach ($posted as $key => $value) {
		$key = (string) $key;
		if (!isset($allowed[$key])) {
			continue;
		}
		$value = is_string($value) ? trim($value) : '';
		if ($value === '') {
			continue;
		}
		$flat[$key] = sanitize_textarea_field($value);
	}

	$all = get_option('gdf_content_overrides', []);
	if (!is_array($all)) {
		$all = [];
	}
	$all[$locale] = gdf_unflatten($flat);
	update_option('gdf_content_overrides', $all);
}
