<?php
/**
 * @link              https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since             1.0.0
 * @package           cookie-compliance-for-wordpress
 *
 * Plugin Name:       Cookie Compliance for WordPress
 * Plugin URI:        https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * Description:       Presents users with cookie compliance field when they first visit the website.
 * Version:           2.3.0
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

/**
 * Activate/Decativation functions to be in here
 * as WP requires register being outside a class
 */
function activate_ccfw_plugin() {
    //do_action( 'my_plugin_activate' );
}
register_activation_hook(__FILE__, 'activate_ccfw_plugin' );

function deactivate_ccfw_plugin() {
   // do_action( 'my_plugin_activate' );
}
register_deactivation_hook(__FILE__, 'deactivate_ccfw_plugin' );

// Plugin components
require_once('components/AdminSettings/AdminSettings.php');
require_once('components/Helper/Helper.php');
require_once('components/Banner/Banner.php');
require_once('components/Banner/BannerSettings.php');
require_once('components/Analytics/Analytics.php');
require_once('components/Analytics/AnalyticsSettings.php');

// Include autoloader
include_once "load.php";

global $ccfwHelper;
$ccfwHelper = new Helper();

// Instantiate classes
new AdminSettings();
new Banner();
new Analytics();
