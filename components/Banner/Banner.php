<?php

/**
 * Banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components;

use CCFW\Components\BannerSettings as Settings;

class Banner
{
    /**
     * @var string
     */
    public $parentPath = '';

    /**
     * @var boolean
     */
    public $hasSettings = true;

    /**
     * @var object
     */
    public $settings;

    /**
     * @var string
     */
    public $googleAnalyticsID;


    public function __construct()
    {
        $this->settings = new Settings();

        $options = get_option('ccfw_plugin_settings');
        $this->googleAnalyticsID = $options['ga_analytics_id'] ?? '';

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
        add_action('wp_head', array( $this, 'disable_google_analytics_on_load' ), 11);
        add_action('wp_body_open', array( $this, 'cookie_compliance_banner' ), 11);
    }

    public function disable_google_analytics_on_load()
    {
        /**
         * If cookie "ccfw_wp_plugin.ga.accept" not present, disable GA.
         * Also check if any previous GA cookies are hanging around
         * without an explicit "ccfw_wp_plugin.ga.accept" cookie present.
         * If they are, remove.
         */
        ?>
        <script>
            var ccfwPluginGACookieNotPresent = document.cookie.indexOf('ccfw_wp_plugin.ga.accept=') == -1 ? true : false;
            window['ga-disable-<?php echo $this->googleAnalyticsID; ?>'] = ccfwPluginGACookieNotPresent;

            if (ccfwPluginGACookieNotPresent) {
                var ccfwCookies = ['_ga', '_gid', '_gat_<?php echo $this->googleAnalyticsID; ?>'];
                var ccfwCookiesArrayLength = ccfwCookies.length;
                for (var ccfwCookie = 0; ccfwCookie < ccfwCookiesArrayLength; ccfwCookie++) {
                    document.cookie = ccfwCookies[ccfwCookie] + '=; Path=/; domain=.'+ document.domain
                    +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                };
            };
        </script>
        <?php
    }

    public function cookie_compliance_banner()
    {
        require_once plugin_dir_path(__FILE__) . 'partials/partial-banner.php';
    }
}
