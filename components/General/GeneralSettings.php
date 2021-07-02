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
        add_settings_field(
            'cookie-management-banner',
            __('', 'cookie-compliance-for-wordpress'),
            [$this, 'manageCookiesBanner'],
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

    /**
     * Display a decorative banner
     */
    public function manageCookiesBanner()
    {
        $image = plugins_url('/assets/image/cookie-graphic.png', CCFW_PLUGIN_DIR . '/cookie-compliance-for-wordpress.php');
        echo '<div id="ccfw-cookie-management-banner">
                <img src="' . esc_url($image) . '" />
              </div>';
    }

    public function settingsSectionCB()
    {
        $paras = [
            'Cookie Compliance For WordPress uses GTM <em>blocklist</em> functionality to control <br>cookie deployment ' .
            'and consent on the front end.',
            'To get started you will need to integrate Google Tag Manager. By default, no tags will fire until ' .
            'they <br>have been configured in the ' .
            '<a href="#component-tab-1" class="ccfw-inline-tab-link">Cookie Management tab</a>.',
            'Enter a GTM ID so the cookie banner can begin to manage cookies for your site'
        ];

        echo '<p>' . __($paras[0], 'cookie-compliance-for-wordpress') . '</p>';
        echo '<p>' . __($paras[1], 'cookie-compliance-for-wordpress') . '</p>';
        echo '<p><strong>' . __($paras[2], 'cookie-compliance-for-wordpress') . '</strong></p>';
    }
}
