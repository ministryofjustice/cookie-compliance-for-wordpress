<?php

namespace CCFW\Components\General;

class General
{
    /**
     * @var Helper
     */
    public $helper;

    /**
     * @var GeneralSettings
     */
    public $settings;

    /**
     * @var boolean
     */
    public $hasSettings = true;

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;

        $this->settings = new GeneralSettings();

        $options = get_option('ccfw_plugin_settings');
        $this->googleAnalyticsID = $options['ga_analytics_id'] ?? '';

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_head', [$this, 'disableGoogleAnalyticsOnLoad'], 11);

        // settings section
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
    }

    public function disableGoogleAnalyticsOnLoad()
    {
        /**
         * If cookie "ccfw_wp_plugin.ga.accept" not present, disable GA.
         * Also check if any previous GA cookies are hanging around
         * without an explicit "ccfw_wp_plugin.ga.accept" cookie present.
         * If they are, remove.
         */
        ?>
        <script>
            var ccfwGACookieNotPresent = document.cookie.indexOf('ccfw_wp_plugin.ga.accept=') == -1 ? true : false;
            window['ga-disable-<?= $this->googleAnalyticsID ?>'] = ccfwGACookieNotPresent;

            if (ccfwGACookieNotPresent) {
                var ccfwCookies = ['_ga', '_gid', '_gat_<?= $this->googleAnalyticsID ?>'];
                var ccfwCookiesArrayLength = ccfwCookies.length;
                for (var ccfwCookie = 0; ccfwCookie < ccfwCookiesArrayLength; ccfwCookie++) {
                    document.cookie = ccfwCookies[ccfwCookie] + '=; Path=/; domain=.' + document.domain
                        + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

                    // Also remove cookies that start with domains without www
                    if (document.domain.includes('www.')) {
                        const nonWwwDomain = document.domain.replace('www.', '');
                        document.cookie = ccfwCookies[ccfwCookie] + '=; Path=/; domain=.'
                            + nonWwwDomain + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    }
                }
            }
        </script>
        <?php
    }
}