<?php

/**
 * Admin area banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\Banner;

use CCFW\Components\Helper\Debug;

class BannerSettings extends Banner
{
    use Debug;

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
            'remove_youtube_cookie_content',
            __('Hide information about YouTube from cookie message', 'cookie-compliance-for-wordpress'),
            [$this, 'removeYouTubeCookieContent'],
            'ccfwComponentSettings',
            $section
        );

        add_settings_field(
            'remove_twitter_cookie_content',
            __('Hide information about Twitter from cookie message', 'cookie-compliance-for-wordpress'),
            [$this, 'removeTwitterCookieContent'],
            'ccfwComponentSettings',
            $section
        );

        add_settings_field(
            'remove_vimeo_cookie_content',
            __('Hide information about Vimeo from cookie message', 'cookie-compliance-for-wordpress'),
            [$this, 'removeVimeoCookieContent'],
            'ccfwComponentSettings',
            $section
        );
    }

    public function removeYouTubeCookieContent()
    {
        $options = get_option('ccfw_component_settings');

        echo $this->debug('Options', $options);

        ?>
        <input type='checkbox' id="remove_youtube_cookie_content"
               name='ccfw_component_settings[remove_youtube_cookie_content]' value="yes"
               class="ccfw-component-input" <?= checked('yes', $options['remove_youtube_cookie_content'] ?? '') ?> />
        <?php
    }

    public function removeTwitterCookieContent()
    {
        $options = get_option('ccfw_component_settings');

        ?>
        <input type='checkbox' id="remove_twitter_cookie_content"
               name='ccfw_component_settings[remove_twitter_cookie_content]' value="yes"
               class="ccfw-component-input" <?= checked('yes', $options['remove_twitter_cookie_content'] ?? ''); ?> />
        <?php
    }

    public function removeVimeoCookieContent()
    {
        $options = get_option('ccfw_component_settings');

        ?>
        <input type='checkbox' id="remove_vimeo_cookie_content" name='ccfw_component_settings[remove_vimeo_cookie_content]'
               value="yes"
               class="ccfw-component-input" <?= checked('yes', $options['remove_vimeo_cookie_content'] ?? 'false') ?> />
        <?php
    }

    public function settingsSectionCB()
    {
        echo __(
            "If you're not using these common third-party trackers on your WordPress site,
        <br> you can remove the disclaimer text set by default. This is done by checking the
        <br>relevant checkboxes below.
        This will remove the associated disclaimer text from <br>the cookie banner modal.",
            'cookie-compliance-for-wordpress'
        );
    }
}
