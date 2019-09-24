<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */
namespace CCFW\Admin;

use \CCFW\Controller;

class Admin extends Controller {

	public function register() {
		add_action( 'admin_menu', array( $this, 'add_admin_pages' ), 11 );
	}

	public function add_admin_pages() {
		add_submenu_page(
			'options-general.php',
			'Cookie Compliance For WordPress',
			'Cookie Compliance',
			'administrator',
			'cookie_compliance',
			array( $this, 'admin_index' ),
			'
		dashicons-welcome-view-site',
			110
		);
	}

	public function admin_index() {
		require_once $this->plugin_path . 'inc/admin/partials/cookie-compliance-for-wordpress-display.php';
	}
}
