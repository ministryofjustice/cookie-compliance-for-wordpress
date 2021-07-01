<?php

/**
 * Banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\Banner;

use CCFW\Components\Helper\Debug;

class Banner
{
    use Debug;

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

    /**
     */
    private $helper;


    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;

        $this->settings = new LegacyBannerSettings();

        $options = get_option('ccfw_component_settings');
        $this->googleAnalyticsID = $options['ga_analytics_id'] ?? '';

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
        add_filter('script_loader_tag', [$this, 'addTypeAttribute'], 10, 3);
        add_action('wp_enqueue_scripts', [$this, 'enqueue'], 11);
        add_action('wp_body_open', [$this, 'render'], 11);

        if ($this->cookieObjectEmpty()) {
            add_action('wp_head', array($this, 'disableGoogleAnalyticsOnLoad'), 11);
        }
    }

    public function enqueue()
    {
        global $wp_version, $is_IE;

        // backwards compat.
        if ($this->cookieObjectEmpty()) {
            wp_enqueue_style('ccfw-style', $this->helper->enqueue('ccfw-frontend-legacy.css'));
            wp_enqueue_script(
                'ccfw-script-frontend',
                $this->helper->enqueue('ccfw-frontend-legacy.js'),
                ['jquery'],
                $wp_version,
                true
            );
        } else {
            wp_enqueue_style('ccfw-style', $this->helper->enqueue('ccfw-frontend.css'));
            wp_enqueue_script(
                'ccfw-script-frontend',
                $this->helper->enqueue('ccfw-frontend.js'),
                ['jquery'],
                $wp_version,
                true
            );
            wp_enqueue_script(
                'ccfw-script',
                $this->helper->enqueue('ccfw-cookie-manage.js'),
                ['jquery'],
                $wp_version,
                true
            );
        }


        if ($is_IE) {
            // Fix IE11 banner issues - https://github.com/nuxodin/ie11CustomProperties
            wp_enqueue_script(
                'ccfw-script-ie11',
                $this->helper->enqueue('ccfw-ie11CustomProperties.js'),
                ['jquery'],
                $wp_version
            );
        }
    }

    public function render()
    {
        $path = 'partials/';

        // backwards compat.
        if ($this->cookieObjectEmpty()) {
            require_once($path . 'banner-legacy.php');
            return;
        }

        // drop the customised cookie banner
        require_once($path . 'banner.php');
    }

    public function cookieObjectEmpty()
    {
        $cookies = get_option('ccfw_cookie_management_data');
        if (!is_array($cookies) || count($cookies) === 0) {
            return true;
        }

        return false;
    }

    /**
     * @param $tag
     * @param $handle
     * @param $src
     * @return string
     */
    public function addTypeAttribute($tag, $handle, $src)
    {
        if ('ccfw-script' !== $handle) {
            return $tag;
        }

        // Add module type to allow for JavaScript ES6 Modules
        $tag = '<script type="module" src="' . esc_url($src) . '"></script><script nomodule src="'
            . esc_url($src) . '"></script>';
        return $tag;
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
            var ccfwPluginGACookieNotPresent = document.cookie.indexOf('ccfw_wp_plugin.ga.accept=') == -1 ? true : false;
            window['ga-disable-<?php echo $this->googleAnalyticsID; ?>'] = ccfwPluginGACookieNotPresent;

            if (ccfwPluginGACookieNotPresent) {
                var ccfwCookies = ['_ga', '_gid', '_gat_<?php echo $this->googleAnalyticsID; ?>'];
                var ccfwCookiesArrayLength = ccfwCookies.length;
                for (var ccfwCookie = 0; ccfwCookie < ccfwCookiesArrayLength; ccfwCookie++) {
                    document.cookie = ccfwCookies[ccfwCookie] + '=; Path=/; domain=.'+ document.domain
                        +'; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

                    // Also remove cookies that start with domains without www
                    if(document.domain.includes("www.")){
                        const nonWwwDomain = document.domain.replace("www.", "")
                        document.cookie = ccfwCookies[ccfwCookie] + '=; Path=/; domain=.' + nonWwwDomain + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    }
                };
            };
        </script>
        <?php
    }
}
