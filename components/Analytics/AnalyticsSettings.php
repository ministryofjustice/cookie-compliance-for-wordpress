<?php

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
     * Function that collects inputed GTM ID and running checks on it.
     */
    public function setGoogleAnalyticsID()
    {
        $options = get_option('moj_component_settings');
        $googleTagManagerID = $options['gtm_analytics_id'] ?? '';

        ?>
        <input type='text' name='moj_component_settings[gtm_analytics_id]'
        placeholder="GTM-XXXXXXX" value='<?php echo sanitize_html_class($googleTagManagerID); ?>'
        class="moj-component-input">
        <?php

        // Run a few basic checks (mainly for devs in case of C&P typos)

        // Check if empty string stop rest of checks.
        if ($googleTagManagerID === '') return;

        // Remove whitespace, tabs & line ends.
        $googleTagManagerID = preg_replace('/\s+/', '', $googleTagManagerID);

        // Too many, too few characters
        if (strlen($googleTagManagerID) != 11) {
            echo '<div class="notice notice-error settings-error" style="margin-left: 0;">
            GTM ID might be invalid. Double check the charactor count.</div>';
        }

        // Check it is a GTM ID (not GA for example)
        if (!preg_match('/^GTM-/', $googleTagManagerID)) {
            echo '<div class="notice notice-error settings-error" style="margin-left: 0;">
            GTM ID might be invalid. ID must start with GTM.</div>';
        }
    }

    public function settingsSectionCB()
    {
        ?>
        <div class="welcome-panel-column">
            <h4><?php _e('Google Tag Manager (GTM)', 'wp_analytics_page') ?></h4>
            <p style="max-width: 600px"><?php _e('Analytic tracking on our site is done through GTM.
            First setup a GTM account and then add the GTM container ID below and save.
            This will add GTM code to the site. You can find the eleven charactor GTM ID, by logining into your GTM account,
            in the top right corner of the dashboard.<br><br>If no GTM ID is added, no code is loaded on the page.', 'wp_analytics_page'); ?></p>
            <h4><?php _e('Google Analytics (GA)', 'wp_analytics_page') ?></h4>
            <p style="max-width: 600px"><?php _e('Add Google Analytics or any other tracker, via the GTM dashboard.',
            'wp_analytics_page'); ?></p>
        </div>
        <?php
    }
}
