<?php
/**
 * Banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */
namespace CCFW\components;

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


    public function __construct()
    {
        $this->settings = new Settings();

        $this->actions();
    }

    public function actions()
    {
        add_action('wp_loaded', [$this->settings, 'settings'], 1);
        add_action('wp_head', array( $this, 'disable_google_analytics_on_load' ), 11);
        add_action('wp_body_open', array( $this, 'cookie_compliance_banner' ), 11);
    }

    public function disable_google_analytics_on_load() {
        // If cookie "ccfw_wp_plugin.ga.accept" not present, disable GA
        ?>
        <script>
            var ccfwPluginGACookieNotPresent = document.cookie.indexOf('ccfw_wp_plugin.ga.accept=') == -1 ? true : false;
            window['ga-disable-UA-174461977-1'] = ccfwPluginGACookieNotPresent;
        </script>
        <?php
    }

    public function cookie_compliance_banner()
    {
        require_once plugin_dir_path(__FILE__) . 'partials/partial-banner.php';
    }
}
