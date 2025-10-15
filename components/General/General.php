<?php

namespace CCFW\Components\General;

class General
{
    /**
     * @var Helper
     */
    public $helper;

    /**
     * @var GeneralSettings
     */
    public $settings;

    /**
     * @var boolean
     */
    public $hasSettings = true;

    /**
     * @var string
     */
    private $googleTagManagerID;

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;

        $this->settings = new GeneralSettings();

        $options = get_option('ccfw_component_settings');
        $this->googleTagManagerID = $options['gtm_id'] ?? '';

        $this->actions();
    }

    public function actions()
    {
        add_action('init', [$this, 'setGTMIDCookie']);

        // settings section
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
    }

    /**
     * Drop GTM ID on the front end
     */
    public function setGTMIDCookie()
    {
        // If we're in a cron process, return early.
        if (defined('DOING_CRON') && DOING_CRON === true) {
            return;
        }

        // We only want to display GTM code when an ID has been entered.
        if (!empty($this->googleTagManagerID)) {
            $gtm_id = $_COOKIE['ccfw_gtm_id'] ?? null;

            if (!$gtm_id || ($this->googleTagManagerID !== $gtm_id)) {
                $secure = apply_filters('ccfw_set_secure_cookie', is_ssl());
                setcookie('ccfw_gtm_id', $this->googleTagManagerID, time() + 31556926, '', '', $secure);
                $_COOKIE['ccfw_gtm_id'] = $this->googleTagManagerID;
            }
        }
    }
}
