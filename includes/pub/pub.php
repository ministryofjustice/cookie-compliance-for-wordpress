<?php

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Pub;

use \CCFW\Controller;

class Pub extends Controller
{

    public $bannerFreePages = [
        '/data-cookie-settings',
        '/data-privacy-notice',
        '/data-cookie-details'
    ];

    public function register()
    {
        add_action('wp_head', array( $this, 'disable_google_analytics_on_load' ), 11);
        add_action('wp_body_open', array( $this, 'cookie_compliance_banner' ), 11);
        add_action('query_vars', array( $this, 'ccfw_query_vars' ), 11);
        add_action('parse_request', array( $this, 'cookie_compliance_pages' ), 11);
        add_action('init', array( $this, 'ccfw_rewrite_rule' ), 11, 0);
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
        if (!in_array($this->requestURI, $this->bannerFreePages)) {
            require_once $this->plugin_path . 'includes/pub/partials/partial-banner.php';
        }
    }

    public function ccfw_query_vars($query_vars)
    {
        $query_vars[] = 'data_cookie_settings';
        $query_vars[] = 'data_privacy_notice';
        $query_vars[] = 'data_cookie_details';
        return $query_vars;
    }

    public function cookie_compliance_pages(&$wp)
    {
        switch ($this->requestURI) {
            case '/data-cookie-settings';
                if (array_key_exists('data_cookie_settings', $wp->query_vars)) {
                    require_once $this->plugin_path . 'includes/pub/partials/partial-settings.php';
                    exit();
                }
            break;
            case '/data-privacy-notice';
                if (array_key_exists('data_privacy_notice', $wp->query_vars)) {
                    require_once $this->plugin_path . 'includes/pub/partials/partial-privacy.php';
                    exit();
                }
            break;
            case '/data-cookie-details';
                if (array_key_exists('data_cookie_details', $wp->query_vars)) {
                    require_once $this->plugin_path . 'includes/pub/partials/partial-cookie-details.php';
                    exit();
                }
            default:
            // no uri match.
            break;
        }
    }

    /**
     * Add rewrite tags and rules
     */
    public function ccfw_rewrite_rule()
    {
        add_rewrite_rule('^data-cookie-settings$', 'index.php?data_cookie_settings=true', 'top');
        add_rewrite_rule('^data-privacy-notice$', 'index.php?data_privacy_notice=true', 'top');
        add_rewrite_rule('^data-cookie-details$', 'index.php?data_cookie_details=true', 'top');

        // add a flag that allows flush to only flush the rules once on activation
        if (get_option('ccfw_flush_rewrite_rules_flag')) {
            flush_rewrite_rules();
            delete_option('ccfw_flush_rewrite_rules_flag');
        }
    }
}
