<?php

/**
 * Get useful paths
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */
namespace CCFW;

class Controller {

	// /bedrock/web/app/plugins/cookie-compliance-for-wordpress/
	public $plugin_path;

	// http://<domain>/app/plugins/cookie-compliance-for-wordpress/
	public $plugin_url;

	// cookie-compliance-for-wordpress/cookie-compliance-for-wordpress.php
	public $plugin;

	// URI path
	public $requestURI;

	public function __construct() {
		$this->plugin_path = plugin_dir_path( dirname( __FILE__, 1 ) );
		$this->plugin_url  = plugin_dir_url( dirname( __FILE__, 1 ) );
		$this->plugin      = plugin_basename( dirname( __FILE__, 2 ) ) . '/cookie-compliance-for-wordpress.php';
		$this->requestURI = htmlspecialchars($_SERVER['REQUEST_URI']);
	}
}
