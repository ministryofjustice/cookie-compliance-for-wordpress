<?php

/**
 * Admin page covering the essential cookies tab settings
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\EssentialCookies;

use CCFW\Components\EssentialCookies;

class EssentialCookiesSettings extends EssentialCookies
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
            'additional_essential_cookies_id',
            __('Add additional essential cookies?', 'cookie-compliance-for-wordpress'),
            [$this, 'setAdditionalEssentialCookiesID'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
    }

    /**
     * Function that collects inputed GA tracking ID and running checks on it.
     */
    public function setAdditionalEssentialCookiesID()
    {
        $options = get_option('ccfw_plugin_settings');
        $googleAnalyticsID = $options['additional_essential_cookies_id'] ?? '';

        ?>
        <input type='checkbox' name='ccfw_plugin_settings[additional_essential_cookies_id]'
        class="ccfw-component-input">
        <?php
    }

    public function settingsSectionCB()
    {
        ?>
        <div class="welcome-panel-column">
            <h4><?php _e('Essential cookies', 'wp_essential_cookies_page'); ?></h4>
            <p><?php _e('WordPress cookies are essential cookies, so information about these is added to the modal by default. If there are any others you need to add, tick below.', 'wp_essential_cookies_page'); ?>
            </p>
        </div>
        <?php
    }
}
