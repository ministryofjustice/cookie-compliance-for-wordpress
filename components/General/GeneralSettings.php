<?php

/**
 * Admin area banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\General;

class GeneralSettings extends General
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
            __('Google Analytics ID', 'cookie-compliance-for-wordpress'),
            [$this, 'setGoogleAnalyticsID'],
            'ccfwComponentSettings',
            $section
        );
    }

    /**
     * Function that collects inputed GA tracking ID and running checks on it.
     */
    public function setGoogleAnalyticsID()
    {
        $options = get_option('ccfw_component_settings');
        $googleAnalyticsID = $options['ga_analytics_id'] ?? '';

        ?>
        <input type='text' name='ccfw_component_settings[ga_analytics_id]'
        placeholder="Enter GA ID UA-XXXXXXXXX-X" value='<?php echo sanitize_html_class($googleAnalyticsID); ?>'
        class="ccfw-component-input">
        <?php
    }

    public function settingsSectionCB()
    {
        echo __(
            'Enter the tracking ID so that the cookie banner can identify specific trackers from your site.',
            'cookie-compliance-for-wordpress'
        );
    }
}
