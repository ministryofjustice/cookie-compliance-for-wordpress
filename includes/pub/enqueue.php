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
    
    public $cssFile;

    public function register()
    {
        add_action('wp_enqueue_scripts', array( $this, 'enqueue' ), 11);

        $this->cssFile = $this->plugin_path . 'dist/css/cookie-compliance-for-wordpress.css';
    }

    public function enqueue()
    {
        // Cache bust
        $hash = filemtime($this->cssFile);

        wp_enqueue_style('CCFWPluginStyle', $this->plugin_url . 'dist/css/cookie-compliance-for-wordpress.css', null, $hash, false);
        wp_enqueue_script('CCFWPluginScript', $this->plugin_url . 'dist/js/cookie-compliance-for-wordpress.js', array( 'jquery' ), '1.0.0', false);
    }
}
