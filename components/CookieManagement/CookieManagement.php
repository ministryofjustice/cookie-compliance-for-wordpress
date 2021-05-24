<?php

namespace CCFW\Components\CookieManagement;

use stdClass;

class CookieManagement
{
    /**
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

        $this->actions();
    }

    public function actions()
    {
        // application routes
        add_action('wp_ajax_ccfw_cookie_get', [$this, 'getCookies']);
        add_action('wp_ajax_ccfw_cookie_store', [$this, 'storeCookies']);

        // settings section
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
    }

    public function enqueue()
    {
        wp_enqueue_style('ccfw-cm-main-style', $this->helper->enqueue('main.css'));
        wp_enqueue_script(
            'ccfw-cm-main-script',
            $this->helper->enqueue('main.js'),
            ['jquery'],
            false,
            true
        );
    }

    public function getCookies()
    {
        $cookies = $this->settings->options();

        echo json_encode($cookies['cookie-management'] ?? new stdClass());
        exit;
    }

    public function storeCookies()
    {
        $data = $_POST;
        $cookies_options = $data['payload'];

        // add the data to the app options
        $cookies = $this->settings->options();

        $cookies['cookie-management'] = $cookies_options;

        // prepare response
        $response = new stdClass();
        $response->update = 'fail';
        $response->reason = 'Could not save data to DB.';

        if (update_option('ccfw_component_settings', $cookies)) {
            $response->update = 'success';
            $response->reason = $_POST['action'];
        }

        echo json_encode($response);
        exit;
    }
}
