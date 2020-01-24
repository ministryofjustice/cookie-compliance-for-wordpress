<?php

/**
 * Fired during plugin activations
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW;

class Activate
{
    /**
     *
     * @since    1.0.0
     */
    public static function activate()
    {

        // allow for flushing the rewrite rules once after init - used on pub.php
        if (! get_option('ccfw_flush_rewrite_rules_flag')) {
            add_option('ccfw_flush_rewrite_rules_flag', true);
        };
    }
}
