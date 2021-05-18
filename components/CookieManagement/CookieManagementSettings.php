<?php

/**
 * Admin area banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\CookieManagement;

class CookieManagementSettings extends CookieManagement
{
    public $helper;

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;
    }

    public function settings()
    {
        $this->helper->initSettings($this);
    }

    public function settingsFields($section)
    {
        add_settings_field(
            'cookie-management',
            __('', 'cookie-compliance-for-wordpress'),
            [$this, 'manageCookies'],
            'ccfwGroupOptionSettings',
            $section
        );
    }

    /**
     * Drops the cookie management application UI container
     */
    public function manageCookies()
    {
        echo '<div id="ccfw-cookie-management"></div>';
    }

    public function settingsSectionCB()
    {
        echo __(
            'Use this screen to add cookies to the cookie banner.',
            'cookie-compliance-for-wordpress'
        );
    }
}
