<?php

/**
 * Enqueuing assets for plugin
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 * @subpackage cookie-compliance-for-wordpress/admin
 */

namespace CCFW\Admin;

use \CCFW\Controller;

class Enqueue extends Controller
{

    public function register()
    {
        add_action('admin_enqueue_scripts', array( $this, 'enqueue' ));
    }

    public function enqueue()
    {
        
    }
}
