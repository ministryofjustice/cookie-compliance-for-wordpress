<?php

/**
 * Enqueuing public frontend assets for plugin
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 * @subpackage cookie-compliance-for-wordpress/admin
 */

namespace CCFW\Pub;

use \CCFW\Controller;

class Enqueue extends Controller
{

    public function register()
    {
        add_action('wp_enqueue_scripts', array( $this, 'enqueue' ), 11);
        add_action('admin_enqueue_scripts', array( $this, 'enqueueAdmin' ), 11);
    }

    public function enqueue()
    {
        wp_enqueue_style('CCFWPluginStyle', $this->plugin_url . 'dist/css/cookie-compliance-for-wordpress.css');
        wp_enqueue_script('CCFWPluginScript', $this->plugin_url . 'dist/js/cookie-compliance-for-wordpress.js', array( 'jquery' ), '1.0.0', false);
    }

    public function enqueueAdmin()
    {
        wp_enqueue_style('CCFWPluginStyleAdmin', $this->plugin_url . 'dist/css/admin-cookie-compliance-for-wordpress.css');
    }
}
