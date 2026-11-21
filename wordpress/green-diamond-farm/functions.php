<?php
/**
 * Green Diamond Farm — theme bootstrap.
 *
 * Styles/layout are locked in theme CSS.
 * Editable copy lives in Appearance → Site Content (and defaults under data/defaults).
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

define('GDF_VERSION', '1.0.7');
define('GDF_DIR', get_template_directory());
define('GDF_URI', get_template_directory_uri());

require_once GDF_DIR . '/inc/config.php';
require_once GDF_DIR . '/inc/i18n.php';
require_once GDF_DIR . '/inc/content.php';
require_once GDF_DIR . '/inc/setup.php';
require_once GDF_DIR . '/inc/compat.php';
require_once GDF_DIR . '/inc/assets.php';
require_once GDF_DIR . '/inc/template-tags.php';
require_once GDF_DIR . '/inc/admin-content.php';

/**
 * If page-product.php is missing on a live host (theme-editor cannot create files),
 * write a thin stub when the theme directory is writable.
 */
add_action('init', static function (): void {
	$path = GDF_DIR . '/page-product.php';
	if (is_readable($path) || !is_writable(GDF_DIR)) {
		return;
	}
	$stub = "<?php\ndeclare(strict_types=1);\nif (!defined('ABSPATH')) { exit; }\ngdf_render_product_detail_page();\n";
	// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
	@file_put_contents($path, $stub);
}, 0);
