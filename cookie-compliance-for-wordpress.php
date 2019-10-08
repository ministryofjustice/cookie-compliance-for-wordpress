<?php
/**
 * @link              https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since             1.0.0
 * @package           cookie-compliance-for-wordpress
 *
 * Plugin Name:       Cookie Compliance for WordPress
 * Plugin URI:        https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * Description:       Presents users with cookie compliance field when they first visit the website.
 * Version:           1.2.0
 * Requires at least: 5.3.2
 * Requires PHP:      7.0
 * Author:            Ministry of Justice
 * Author URI:        https://github.com/ministryofjustice
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cookie-compliance-for-wordpress
 * Domain Path:       /languages
 */

 /**
  * Do not allow access outside of WP to plugin
  */
defined( 'ABSPATH' ) or die();

if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

/**
 * Activate/Decativation functions to be in here
 * as WP requires register being outside a class
 */

function activate_ccfw_plugin() {
	CCFW\Activate::activate();
}
register_activation_hook( __FILE__, 'activate_ccfw_plugin' );

function deactivate_ccfw_plugin() {
	CCFW\Deactivate::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_ccfw_plugin' );

/**
 * Launch app via a register of services (aka classes that make up the plugin)
 */
if ( class_exists( 'CCFW\\Init' ) ) {
	CCFW\Init::register_services();
}

