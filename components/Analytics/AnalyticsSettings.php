<?php

/**
 * Admin page covering the analytics tab settings
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\Analytics;

use CCFW\Components\Analytics;

class AnalyticsSettings extends Analytics
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
            'ga_analytics_id',
            __('GA ID', 'cookie-compliance-for-wordpress'),
            [$this, 'setGoogleAnalyticsID'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
    }

    /**
     * Function that collects inputed GA tracking ID and running checks on it.
     */
    public function setGoogleAnalyticsID()
    {
        $options = get_option('ccfw_plugin_settings');
        $googleAnalyticsID = $options['ga_analytics_id'] ?? '';

        ?>
        <input type='text' name='ccfw_plugin_settings[ga_analytics_id]'
        placeholder="UA-XXXXXXXXX-X" value='<?php echo sanitize_html_class($googleAnalyticsID); ?>'
        class="ccfw-component-input">
        <?php

        // Run a few basic checks

        // Check if empty string, stop rest of checks.
        if ($googleAnalyticsID === '') {
            return;
        }

        // Remove whitespace, tabs & line ends.
        $googleAnalyticsID = preg_replace('/\s+/', '', $googleAnalyticsID);

        // Basic check that it is a GA ID
        if (!preg_match('/^UA-/', $googleAnalyticsID)) {
            echo '<div class="notice notice-error settings-error" style="margin-left: 0;">
            GA ID might be invalid. ID must start with UA-.</div>';
        }
    }

    public function settingsSectionCB()
    {
        ?>
        <div class="welcome-panel-column">
            <h3><?php _e('Google Analytics (GA) Tracking ID', 'wp_analytics_page'); ?></h3>
            <p><?php _e('Enter your GA tracking ID and save. This enables the banner to disable/enable your GA tracking for visitors.
            <br>More information on where to find you GA code is available on Google Help pages.
            <br> https://support.google.com/analytics/answer/7372977?hl=en ', 'wp_analytics_page'); ?>
            </p>
        </div>
        <?php
    }
}
