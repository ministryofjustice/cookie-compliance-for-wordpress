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

defined('WP_UNINSTALL_PLUGIN') || exit;

// delete the registered database options
delete_option('ccfw_plugin_settings');
