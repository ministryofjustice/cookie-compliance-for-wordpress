<?php

/**
 * Banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components;

use CCFW\Components\BannerSettings as Settings;

class Banner
{
    /**
     * @var string
     */
    public $parentPath = '';

    /**
     * @var boolean
     */
    public $hasSettings = true;

    /**
     * @var object
     */
    public $settings;

    /**
     * @var string
     */
    public $googleAnalyticsID;
    /**
     * @var Helper
     */
    private $helper;


    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;

        $this->settings = new Settings();

        $options = get_option('ccfw_plugin_settings');
        $this->googleAnalyticsID = $options['ga_analytics_id'] ?? '';

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
        add_filter('script_loader_tag', [$this, 'addTypeAttribute'], 10, 3);
        add_action('wp_enqueue_scripts', [$this, 'enqueue'], 11);
        add_action('wp_body_open', [$this, 'cookieComplianceBanner'], 11);
    }

    public function enqueue()
    {
        global $wp_version, $is_IE;

        wp_enqueue_style('ccfw-style', $this->helper->enqueue('ccfw-frontend.css'));
        wp_enqueue_script(
            'ccfw-style',
            $this->helper->enqueue('ccfw-frontend.js'),
            ['jquery'],
            $wp_version,
            true
        );

        if ($is_IE) {
            // Fix IE11 banner issues - https://github.com/nuxodin/ie11CustomProperties
            wp_enqueue_script(
                'ccfw-script-ie11',
                $this->helper->enqueue('ccfw-ie11CustomProperties.js'),
                ['jquery'],
                $wp_version
            );
        }
    }

    /**
     * @param $tag
     * @param $handle
     * @param $src
     * @return string
     */
    public function addTypeAttribute($tag, $handle, $src)
    {
        if ('CCFWScript' !== $handle) {
            return $tag;
        }

        // Add module type to allow for JavaScript ES6 Modules
        $tag = '<script type="module" src="' . esc_url($src) . '"></script><script nomodule src="'
            . esc_url($src) . '"></script>';
        return $tag;
    }

    public function cookieComplianceBanner()
    {
        require_once plugin_dir_path(__FILE__) . 'partials/partial-banner.php';
    }
}
