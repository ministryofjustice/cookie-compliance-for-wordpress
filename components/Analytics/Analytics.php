<?php

namespace CCFW\Components;

use CCFW\Components\Analytics\AnalyticsSettings as Settings;

class Analytics
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
    public $googleTagManagerID;

    public function __construct()
    {
        $this->settings = new Settings();

        $this->actions();

        // Get GTM ID if provided via the settings field
        // $options = get_option('moj_component_settings');
        // $this->googleTagManagerID = $options['gtm_analytics_id'] ?? '';
    }

    public function actions()
    {
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
        // add_action('wp_head', [$this,'loadGoogleTagManagerInHead']);
        // add_action('wp_body_open', [$this,'loadGoogleTagManagerInBody']);
    }
}
