<?php

/**
 * Essential cookies functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components;

use CCFW\Components\ThirdPartyCookies\ThirdPartyCookiesSettings as Settings;

class ThirdPartyCookies
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

    public function __construct()
    {
        $this->settings = new Settings();

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
    }
}
