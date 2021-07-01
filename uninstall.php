<?php

/**
 * Tasks to carry out on uninstall
 * https://developer.wordpress.org/plugins/plugin-basics/uninstall-methods/
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

// delete the registered database options
delete_option('ccfw_plugin_settings');

// for site options in Multisite
if (is_multisite()) {
    delete_site_option('ccfw_plugin_settings');
}
