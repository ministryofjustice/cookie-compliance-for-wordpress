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
        add_filter('script_loader_tag', array( $this, 'addTypeAttribute'), 10, 3);
        add_action('wp_enqueue_scripts', array( $this, 'enqueue' ), 11);

        $this->cssFile = $this->plugin_path . 'dist/css/cookie-compliance-for-wordpress.css';
    }

    public function addTypeAttribute($tag, $handle, $src)
    {

        if ('CCFWPluginScript' !== $handle) {
            return $tag;
        }

        // Add module type to allow for JavaScript ES6 Modules
        $tag = '<script type="module" src="' . esc_url($src) . '"></script><script nomodule src="' . esc_url($src) . '"></script>';
        return $tag;
    }

    public function enqueue()
    {
        // Cache bust
        $hash = filemtime($this->cssFile);

        wp_enqueue_style('CCFWPluginStyle', $this->plugin_url . 'dist/css/cookie-compliance-for-wordpress.css', null, $hash, false);
        wp_enqueue_script('CCFWPluginScript', $this->plugin_url . 'dist/js/cookie-compliance-for-wordpress.js', array( 'jquery' ), '1.0.0', false);

        global $is_IE;

        if ($is_IE) {
        // Fix IE11 banner issues - https://github.com/nuxodin/ie11CustomProperties
            wp_enqueue_script('CCFWPluginScriptIE11', $this->plugin_url . 'dist/js/ccfw-ie11CustomProperties.js', array( 'jquery' ), '1.0.0', false);
        }
    }
}
