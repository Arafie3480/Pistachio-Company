<?php
/**
 * Green Diamond Farm — one-time theme installer.
 *
 * How to use (admin already logged into wp-admin in same browser):
 * 1. Upload THIS file to the WordPress root (same folder as wp-load.php / wp-config.php).
 * 2. Open: https://YOUR-DOMAIN/gdf-install.php
 * 3. Confirm install, then DELETE this file.
 *
 * Optional: place green-diamond-farm.zip next to this file to skip network download.
 *
 * @package Green_Diamond_Farm
 */

declare(strict_types=1);

// phpcs:ignore
@set_time_limit(300);

$wp_load = __DIR__ . '/wp-load.php';
if (!is_readable($wp_load)) {
	http_response_code(500);
	header('Content-Type: text/plain; charset=utf-8');
	echo "wp-load.php not found. Upload gdf-install.php to the WordPress root directory.\n";
	exit(1);
}

require_once $wp_load;

if (!function_exists('current_user_can') || !is_user_logged_in() || !current_user_can('switch_themes')) {
	auth_redirect();
	exit;
}

header('Content-Type: text/html; charset=utf-8');

const GDF_THEME_SLUG = 'green-diamond-farm';
const GDF_REMOTE_ZIP = 'https://raw.githubusercontent.com/Arafie3480/Pistachio-Company/cursor/wordpress-theme-delivery-3e66/wordpress/dist/green-diamond-farm.zip';

/**
 * @return array{ok:bool,messages:list<string>}
 */
function gdf_run_install(): array
{
	$messages = [];
	$themes_dir = trailingslashit(get_theme_root());
	$target = $themes_dir . GDF_THEME_SLUG;

	if (!is_dir($themes_dir) || !is_writable($themes_dir)) {
		return ['ok' => false, 'messages' => ['Theme directory is not writable: ' . $themes_dir]];
	}

	$local_zip = __DIR__ . '/green-diamond-farm.zip';
	$zip_path = $local_zip;
	if (!is_readable($zip_path)) {
		$tmp = wp_tempnam('gdf-theme.zip');
		$response = wp_remote_get(
			GDF_REMOTE_ZIP,
			[
				'timeout' => 120,
				'stream' => true,
				'filename' => $tmp,
				'redirection' => 5,
			]
		);
		if (is_wp_error($response)) {
			return ['ok' => false, 'messages' => ['Download failed: ' . $response->get_error_message(), 'Upload green-diamond-farm.zip next to this installer and retry.']];
		}
		$code = (int) wp_remote_retrieve_response_code($response);
		if ($code < 200 || $code >= 300 || !is_readable($tmp) || filesize($tmp) < 1000) {
			@unlink($tmp);
			return ['ok' => false, 'messages' => ['Download failed (HTTP ' . $code . '). Upload green-diamond-farm.zip next to this installer and retry.']];
		}
		$zip_path = $tmp;
		$messages[] = 'Downloaded theme zip from GitHub.';
	} else {
		$messages[] = 'Using local green-diamond-farm.zip.';
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/misc.php';
	WP_Filesystem();

	// Remove previous incomplete install.
	if (is_dir($target)) {
		$removed = gdf_rrmdir($target);
		if (!$removed) {
			return ['ok' => false, 'messages' => array_merge($messages, ['Could not remove existing theme folder.'])];
		}
		$messages[] = 'Removed previous theme folder.';
	}

	$unzip = unzip_file($zip_path, $themes_dir);
	if ($zip_path !== $local_zip) {
		@unlink($zip_path);
	}
	if (is_wp_error($unzip)) {
		return ['ok' => false, 'messages' => array_merge($messages, ['Unzip failed: ' . $unzip->get_error_message()])];
	}
	if (!is_readable($target . '/style.css')) {
		return ['ok' => false, 'messages' => array_merge($messages, ['Theme files missing after unzip.'])];
	}
	$messages[] = 'Theme extracted to wp-content/themes/' . GDF_THEME_SLUG;

	switch_theme(GDF_THEME_SLUG);
	$messages[] = 'Theme activated.';

	flush_rewrite_rules(false);
	$messages[] = 'Permalinks flushed.';

	$messages[] = 'Done. Delete gdf-install.php (and green-diamond-farm.zip if present) from the server now.';
	$messages[] = 'Next: Settings → Permalinks → Save. Then Appearance → Site Content.';

	return ['ok' => true, 'messages' => $messages];
}

function gdf_rrmdir(string $dir): bool
{
	if (!is_dir($dir)) {
		return true;
	}
	$items = scandir($dir);
	if ($items === false) {
		return false;
	}
	foreach ($items as $item) {
		if ($item === '.' || $item === '..') {
			continue;
		}
		$path = $dir . '/' . $item;
		if (is_dir($path)) {
			if (!gdf_rrmdir($path)) {
				return false;
			}
		} elseif (!@unlink($path)) {
			return false;
		}
	}
	return @rmdir($dir);
}

$result = null;
if (isset($_POST['gdf_do_install']) && check_admin_referer('gdf_install_theme')) {
	$result = gdf_run_install();
}

$active = wp_get_theme()->get_stylesheet();
?><!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>نصب قالب Green Diamond Farm</title>
	<style>
		body{font-family:Tahoma,Arial,sans-serif;background:#f4f7f4;color:#1c2e24;margin:0;padding:2rem}
		.card{max-width:40rem;margin:0 auto;background:#fff;border:1px solid #d5e0d8;border-radius:8px;padding:1.5rem 1.75rem}
		h1{font-size:1.25rem;margin:0 0 0.75rem}
		p,li{line-height:1.7;font-size:0.95rem}
		.ok{color:#0f6b3a}.err{color:#9b1c1c}
		button{background:#2f5d45;color:#fff;border:0;border-radius:6px;padding:0.7rem 1.2rem;font-size:0.95rem;cursor:pointer}
		button:hover{background:#244a37}
		code{background:#eef3ef;padding:0.1rem 0.35rem;border-radius:4px}
		.meta{color:#5b6b62;font-size:0.85rem}
	</style>
</head>
<body>
	<div class="card">
		<h1>نصب قالب Green Diamond Farm</h1>
		<p class="meta">کاربر: <?php echo esc_html(wp_get_current_user()->user_login); ?> · قالب فعال فعلی: <code><?php echo esc_html($active); ?></code></p>

		<?php if (is_array($result)) : ?>
			<ul>
				<?php foreach ($result['messages'] as $msg) : ?>
					<li class="<?php echo $result['ok'] ? 'ok' : 'err'; ?>"><?php echo esc_html($msg); ?></li>
				<?php endforeach; ?>
			</ul>
			<?php if ($result['ok']) : ?>
				<p><strong>حتماً این فایل را از هاست حذف کنید.</strong></p>
				<p><a href="<?php echo esc_url(admin_url('themes.php?page=gdf-site-content')); ?>">باز کردن Site Content</a> ·
					<a href="<?php echo esc_url(home_url('/')); ?>">مشاهده سایت</a></p>
			<?php endif; ?>
		<?php else : ?>
			<p>این نصب‌کننده قالب قفل‌شدهٔ Green Diamond Farm را روی همین وردپرس می‌نشاند (ظاهر ثابت، ویرایش فقط محتوا).</p>
			<ol>
				<li>اگر <code>green-diamond-farm.zip</code> کنار همین فایل باشد، از آن استفاده می‌شود.</li>
				<li>وگرنه از GitHub دانلود می‌کند (نیاز به دسترسی خروجی هاست).</li>
				<li>بعد از موفقیت، <code>gdf-install.php</code> را پاک کنید.</li>
			</ol>
			<form method="post">
				<?php wp_nonce_field('gdf_install_theme'); ?>
				<button type="submit" name="gdf_do_install" value="1">نصب و فعال‌سازی قالب</button>
			</form>
		<?php endif; ?>
	</div>
</body>
</html>
