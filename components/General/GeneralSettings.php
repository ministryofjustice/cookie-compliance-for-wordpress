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
            'gtm_id',
            __('Google Tag Manager ID', 'cookie-compliance-for-wordpress'),
            [$this, 'setGtmId'],
            'ccfwComponentSettings',
            $section
        );
    }

    /**
     * Function that collects inputed GA tracking ID and running checks on it.
     */
    public function setGtmId()
    {
        $options = get_option('ccfw_component_settings');
        $googleAnalyticsID = $options['gtm_id'] ?? '';

        ?>
        <input type='text' name='ccfw_component_settings[gtm_id]'
        placeholder="GTM-XXXXXXX" value='<?php echo sanitize_html_class($googleAnalyticsID); ?>'
        class="ccfw-component-input">
        <?php
    }

    public function settingsSectionCB()
    {
        echo __(
            'Enter the tracking GTM ID so that the cookie banner can identify specific trackers from your site.',
            'cookie-compliance-for-wordpress'
        );
    }
}
