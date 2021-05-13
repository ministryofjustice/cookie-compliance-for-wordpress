<?php

namespace CCFW\Components\CookieManagement;

class CookieManagement
{
    /**
     * @var Helper
     */
    public $helper;

    /**
     * @var CookieManagementSettings
     */
    public $settings;

    /**
     * @var boolean
     */
    public $hasSettings = true;

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;

        $this->settings = new CookieManagementSettings();

        $options = get_option('ccfw_plugin_settings');

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_head', [$this, 'disableGoogleAnalyticsOnLoad'], 11);

        // settings section
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
    }
}
