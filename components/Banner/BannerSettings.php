<?php

/**
 * Admin area banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components;

use CCFW\Components\Banner;

class BannerSettings extends Banner
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
        add_settings_field(
            'is_using_youtube',
            __('Are you using YouTube?', 'cookie-compliance-for-wordpress'),
            [$this, 'isUsingYouTube'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
        add_settings_field(
            'is_using_twitter',
            __('Are you using Twitter?', 'cookie-compliance-for-wordpress'),
            [$this, 'isUsingTwitter'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
        add_settings_field(
            'is_using_vimeo',
            __('Are you using Vimeo?', 'cookie-compliance-for-wordpress'),
            [$this, 'isUsingVimeo'],
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

    public function isUsingYouTube()
    {
        $options = get_option('ccfw_plugin_settings');
        $isUsingYouTube = $options['is_using_youtube'] ?? 'false';

        ?>
        <input type='checkbox' id="is_using_youtube" name='ccfw_plugin_settings[is_using_youtube]' value="yes"
        class="ccfw-component-input" <?= checked('yes', $options['is_using_youtube'] ?? '') ?> />
        <?php
    }

    public function isUsingTwitter()
    {
        $options = get_option('ccfw_plugin_settings');
        $isUsingYouTube = $options['is_using_twitter'] ?? 'false';

        ?>
        <input type='checkbox' id="is_using_twitter" name='ccfw_plugin_settings[is_using_twitter]' value="yes"
        class="ccfw-component-input" <?= checked('yes', $options['is_using_twitter'] ?? ''); ?> />
        <?php
    }

    public function isUsingVimeo()
    {
        $options = get_option('ccfw_plugin_settings');
        $isUsingYouTube = $options['is_using_vimeo'] ?? 'false';

        ?>
        <input type='checkbox' id="is_using_vimeo" name='ccfw_plugin_settings[is_using_vimeo]' value="yes"
        class="ccfw-component-input" <?= checked('yes', $options['is_using_vimeo'] ?? 'false') ?> />
        <?php
    }

    public function settingsSectionCB()
    {
        ?>
        <p><?php _e('Make custom changes to your cookie banner.', 'wp_banner_page'); ?></p>
        <?php
    }
}
