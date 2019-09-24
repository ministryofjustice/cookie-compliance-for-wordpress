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

class Pub extends Controller {

	public function register() {
		add_action( 'wp_head', array( $this, 'cookie_compliance_banner' ), 11 );
		add_action( 'query_vars', array( $this, 'ccfw_query_vars' ), 11 );
		add_action( 'parse_request', array( $this, 'cookie_policy_page' ), 11 );
		add_action( 'init', array( $this, 'ccfw_rewrite_rule' ), 11, 0 );
	}

	public function cookie_compliance_banner() {

		// cookie set onclick in jQuery file get cookie if exists
		$cookieSet   = isset( $_COOKIE['ccfw_cookie_policy'] );
		$request_URI = $_SERVER['REQUEST_URI'];

		// if the cookie has not been set and you're not on the policy page, show banner
		if ( $cookieSet === false ) {
			if ( $request_URI !== '/ccfw-cookie-policy' ) {
				require_once $this->plugin_path . 'includes/pub/partials/cookie-compliance-for-wordpress-banner.php';
			}
		}
	}

	public function ccfw_query_vars( $query_vars ) {
		$query_vars[] = 'ccfw_cookie_policy';
		return $query_vars;
	}

	public function cookie_policy_page( &$wp ) {
		if ( array_key_exists( 'ccfw_cookie_policy', $wp->query_vars ) ) {
			require_once $this->plugin_path . 'includes/pub/partials/cookie-compliance-for-wordpress-page.php';
			exit();
		}
	}

	/**
	 * Add rewrite tags and rules
	 */
	public function ccfw_rewrite_rule() {
		add_rewrite_rule( '^ccfw-cookie-policy$', 'index.php?ccfw_cookie_policy=true', 'top' );

		// add a flag that allows flush to only flush the rules once on activation
		if ( get_option( 'ccfw_flush_rewrite_rules_flag' ) ) {
			flush_rewrite_rules();
			delete_option( 'ccfw_flush_rewrite_rules_flag' );
		}
	}

}
