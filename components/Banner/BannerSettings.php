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
            __('Google Analytics ID', 'cookie-compliance-for-wordpress'),
            [$this, 'setGoogleAnalyticsID'],
            'section-add-tracking-id',
            $section
        );
        add_settings_field(
            'remove_youtube_cookie_content',
            __('Hide information about YouTube from cookie message', 'cookie-compliance-for-wordpress'),
            [$this, 'removeYouTubeCookieContent'],
            'section-remove-policy-disclaimers',
            $section
        );
        add_settings_field(
            'remove_twitter_cookie_content',
            __('Hide information about Twitter from cookie message', 'cookie-compliance-for-wordpress'),
            [$this, 'removeTwitterCookieContent'],
            'section-remove-policy-disclaimers',
            $section
        );
        add_settings_field(
            'remove_vimeo_cookie_content',
            __('Hide information about Vimeo from cookie message', 'cookie-compliance-for-wordpress'),
            [$this, 'removeVimeoCookieContent'],
            'section-remove-policy-disclaimers',
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
        placeholder="Enter GA ID UA-XXXXXXXXX-X" value='<?php echo sanitize_html_class($googleAnalyticsID); ?>'
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

    public function addTrackingIDSectionIntro()
    {
        ?>
        <p><?php _e('Enter the tracking ID so that the cookie banner can identify specific trackers from your site.', 'cookie-compliance-for-wordpress'); ?></p>
        <?php
    }

    public function policyDisclaimerSectionIntro()
    {
        ?>
        <p><?php _e("If you're not using these common third-party trackers on your WordPress site,
        <br> you can remove the disclaimer text set by default. This is done by checking the <br>relevant checkboxes below.
        This will remove the associated disclaimer text from <br>the cookie banner modal.", 'cookie-compliance-for-wordpress'); ?></p>
        <?php
    }
}
