<?php

/**
 * @link              https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since             1.0.0
 * @package           cookie-compliance-for-wordpress
 *
 * Plugin Name:       Cookie Compliance for WordPress
 * Plugin URI:        https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * Description:       Presents users with cookie compliance field when they first visit the website.
 * Version:           3.2.0
 * Requires at least: 5.2.3
 * Requires PHP:      7.0
 * Author:            Ministry of Justice
 * Author URI:        https://github.com/ministryofjustice
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cookie-compliance-for-wordpress
 * Domain Path:       /languages
 */

namespace CCFW\Components;

// Do not allow access outside of WP to plugin
defined('ABSPATH') || exit;

define('CCFW_PLUGIN_DIR', __DIR__);

require_once('components/Helper/Debug.php');
// Plugin components
require_once('components/AdminSettings/AdminSettings.php');
require_once('components/AdminSettings/Sanitize.php');
require_once('components/Helper/Helper.php');
require_once('components/General/General.php');
require_once('components/General/GeneralSettings.php');
require_once('components/Banner/Banner.php');
require_once('components/Banner/LegacyBannerSettings.php');
// cookie management scripts
require_once('components/CookieManagement/CookieManagement.php');
require_once('components/CookieManagement/CookieManagementSettings.php');

use CCFW\Components\AdminSettings\AdminSettings;
use CCFW\Components\General\General;
use CCFW\Components\Banner\Banner;
use CCFW\Components\CookieManagement\CookieManagement;

global $ccfwHelper;
$ccfwHelper = new Helper();

// Instantiate classes
new AdminSettings();
new General();
new CookieManagement();
new Banner();
