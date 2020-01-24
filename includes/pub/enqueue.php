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
    }

    public function enqueue()
    {
        wp_enqueue_style('CCFWPluginStyle', $this->plugin_url . 'includes/assets/css/cookie-compliance-for-wordpress.min.css');
        wp_enqueue_script('CCFWPluginScript', $this->plugin_url . 'includes/assets/js/cookie-compliance-for-wordpress.min.js', array( 'jquery' ), '1.0.0', false);
    }
}
