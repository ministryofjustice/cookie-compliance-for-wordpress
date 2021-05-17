<?php

namespace CCFW\Components\CookieManagement;

use WP_REST_Server;

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
        // application routes
        add_action('rest_api_init', [$this, 'registerAppRoutes']);

        // settings section
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
    }

    public function enqueue()
    {
    }

    public function registerAppRoutes()
    {
        register_rest_route(
            'ccfw/',
            '/phrase',
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => ['CCFW\Components\CookieManagement\Endpoints', 'phrase'],
            ]
        );
    }
}
