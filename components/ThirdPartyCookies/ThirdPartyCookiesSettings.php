<?php

/**
 * Admin page covering the essential cookies tab settings
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\ThirdPartyCookies;

use CCFW\Components\ThirdPartyCookies;

class ThirdPartyCookiesSettings extends ThirdPartyCookies
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
            'additional_third_party_cookies_id',
            __('Are you using YouTube?', 'cookie-compliance-for-wordpress'),
            [$this, 'setAdditionalThirdPartyCookiesID'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
    }

    /**
     * Function that collects inputed GA tracking ID and running checks on it.
     */
    public function setAdditionalThirdPartyCookiesID()
    {
        $options = get_option('ccfw_plugin_settings');
        $googleAnalyticsID = $options['additional_third_party_cookies_id'] ?? '';

        ?>
        <input type='checkbox' name='ccfw_plugin_settings[additional_third_party_cookies_id]'
        class="ccfw-component-input">
        <?php
    }

    public function settingsSectionCB()
    {
        ?>
        <div class="welcome-panel-column">
            <h3><?php _e('Third party cookies', 'wp_essential_cookies_page'); ?></h3>
            <p><?php _e('Third Party cookies are cookies that are set by things like YouTube, which are embedded on our sites.', 'wp_essential_cookies_page'); ?>
            <p><?php _e('If you are using YouTube, tick the box below, and info about YouTube cookies will be added to the cookie info modal.', 'wp_essential_cookies_page'); ?>
            </p>
        </div>
        <?php
    }
}
