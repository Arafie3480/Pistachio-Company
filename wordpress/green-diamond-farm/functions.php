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

define('GDF_VERSION', '1.0.4');
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
