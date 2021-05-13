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
            'tracking_cookies',
            __('Tracking Cookies', 'cookie-compliance-for-wordpress'),
            [$this, 'manageTrackingCookies'],
            'ccfwGroupOptionSettings',
            $section
        );
        add_settings_field(
            'third_party_cookies',
            __('Third Party Cookies', 'cookie-compliance-for-wordpress'),
            [$this, 'manageThirdPartyCookies'],
            'ccfwGroupOptionSettings',
            $section
        );
        add_settings_field(
            'essential_cookies',
            __('Essential Cookies', 'cookie-compliance-for-wordpress'),
            [$this, 'manageEssentialCookies'],
            'ccfwGroupOptionSettings',
            $section
        );
    }

    public function manageTrackingCookies()
    {
        $options = get_option('ccfw_plugin_settings');
        $cookies = $options['tracking_cookies'] ?? '';

        ?>
        /** functionality coming soon **/
        <?php
    }

    public function manageThirdPartyCookies()
    {
        $options = get_option('ccfw_plugin_settings');
        $cookies = $options['third_party_cookies'] ?? '';

        ?>
        /** functionality coming soon **/
        <?php
    }

    public function manageEssentialCookies()
    {
        $options = get_option('ccfw_plugin_settings');
        $cookies = $options['essential_cookies'] ?? '';

        ?>
        /** functionality coming soon **/
        <?php
    }

    public function settingsSectionCB()
    {
        echo __(
            'The UI for Managing Cookies will appear here soon.',
            'cookie-compliance-for-wordpress'
        );
    }
}
