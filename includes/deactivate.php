<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW;

class Deactivate
{

    /**
     *
     * @since    1.0.0
     */
    public static function deactivate()
    {
        flush_rewrite_rules();
    }
}
