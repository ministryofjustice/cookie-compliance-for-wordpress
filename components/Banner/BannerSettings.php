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
            __('Enter your Google Analytics ID', 'cookie-compliance-for-wordpress'),
            [$this, 'setGoogleAnalyticsID'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
        add_settings_field(
            'remove_youtube_cookie_content',
            __('Remove YouTube disclaimer from cookie policy', 'cookie-compliance-for-wordpress'),
            [$this, 'removeYouTubeCookieContent'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
        add_settings_field(
            'remove_twitter_cookie_content',
            __('Remove Twitter disclaimer from cookie policy', 'cookie-compliance-for-wordpress'),
            [$this, 'removeTwitterCookieContent'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
        add_settings_field(
            'remove_vimeo_cookie_content',
            __('Remove Vimeo disclaimer from cookie policy', 'cookie-compliance-for-wordpress'),
            [$this, 'removeVimeoCookieContent'],
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

    public function removeYouTubeCookieContent()
    {
        $options = get_option('ccfw_plugin_settings');
        $removeYouTubeCookieContent = $options['remove_youtube_cookie_content'] ?? 'false';

        ?>
        <input type='checkbox' id="remove_youtube_cookie_content" name='ccfw_plugin_settings[remove_youtube_cookie_content]' value="yes"
        class="ccfw-component-input" <?= checked('yes', $options['remove_youtube_cookie_content'] ?? '') ?> />
        <?php
    }

    public function removeTwitterCookieContent()
    {
        $options = get_option('ccfw_plugin_settings');
        $removeTwitterCookieContent = $options['remove_twitter_cookie_content'] ?? 'false';

        ?>
        <input type='checkbox' id="remove_twitter_cookie_content" name='ccfw_plugin_settings[remove_twitter_cookie_content]' value="yes"
        class="ccfw-component-input" <?= checked('yes', $options['remove_twitter_cookie_content'] ?? ''); ?> />
        <?php
    }

    public function removeVimeoCookieContent()
    {
        $options = get_option('ccfw_plugin_settings');
        $removeVimeoCookieContent = $options['remove_vimeo_cookie_content'] ?? 'false';

        ?>
        <input type='checkbox' id="remove_vimeo_cookie_content" name='ccfw_plugin_settings[remove_vimeo_cookie_content]' value="yes"
        class="ccfw-component-input" <?= checked('yes', $options['remove_vimeo_cookie_content'] ?? 'false') ?> />
        <?php
    }

    public function settingsSectionCB()
    {
        ?>
        <p><?php _e('Make custom changes to your cookie banner.', 'wp_banner_page'); ?></p>
        <?php
    }
}
