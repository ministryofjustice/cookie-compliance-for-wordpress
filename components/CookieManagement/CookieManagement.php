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
        echo json_encode(get_option('ccfw_cookie_management_data'));
        exit;
    }

    public function storeCookies()
    {
        // prepare response
        $response = new stdClass();
        $response->update = 'fail';
        $response->reason = 'Your access level has prevented an update on this occasion.';

        if (current_user_can('manage_options')) {
            $data = $_POST;
            $cookies_options = $data['payload'];

            $response->update = 'probable-success';
            $response->reason = 'The update had no effect, this could be because supplied data has not changed.';

            if (update_option('ccfw_cookie_management_data', $cookies_options)) {
                $response->update = 'success';
                $response->reason = $_POST['action'];
            }

            echo json_encode($response);
            exit;
        }

        http_response_code(500);
        echo json_encode($response);
        exit;
    }
}
