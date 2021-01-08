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
            'banner_title',
            __('Banner title', 'cookie-compliance-for-wordpress'),
            [$this, 'bannerTitle'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
        add_settings_field(
            'banner_text',
            __('Banner text', 'cookie-compliance-for-wordpress'),
            [$this, 'bannerText'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
    }

    /**
     * Add custom banner title
     */
    public function bannerTitle()
    {

        $options = get_option('ccfw_plugin_settings');
        $bannerTitle = $options['banner_title'] ?? '';
        ?>

        <p>If left empty, the banner title will say: "Are you OK with cookies?"</p>
        <input type='text' name='ccfw_plugin_settings[banner_title]'
        value='<?php echo esc_attr($bannerTitle); ?>'
        class="ccfw-component-input">
        <?php
    }

    /**
     * Add custom banner title
     */
    public function bannerText()
    {

        $options = get_option('ccfw_plugin_settings');
        $bannerText = $options['banner_text'] ?? '';
        ?>

        <p>If left empty, the banner text will say:</p>
        <p style="max-width: 45rem">"We use small files called ‘cookies’' on [your domain name] to give you the best experience on our site. Some are essential to make the site work, and some help us understand how people use the site so that we can improve your experience. You can choose to turn off the non-essential cookies. Which cookies are you happy for us to use?"</p>
        <input type='text' name='ccfw_plugin_settings[banner_text]'
        value='<?php echo esc_attr($bannerText); ?>'
        class="ccfw-component-input">
        <?php
    }

    public function settingsSectionCB()
    {
        ?>
        <p><?php _e('Make custom changes to your cookie banner.', 'wp_banner_page'); ?></p>
        <?php
    }
}
