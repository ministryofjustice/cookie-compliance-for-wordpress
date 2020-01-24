<?php

/**
 * Initialise classes as services for plugin
 * This creates a simple framework for adding
 * new classes to this plugin
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW;

final class Init
{

    /**
     * Store all classes in an array.
     * When adding new functionality to this plugin,
     * create your class and add it here.
     */
    public static function get_services()
    {
        return [
            Admin\Admin::class,
            Admin\Enqueue::class,
            Pub\Pub::class,
            Pub\Enqueue::class,
        ];
    }

    /**
     * Loop through our plugin classes, picking out
     * the register() method and assign it to $services var.
     */
    public static function register_services()
    {
        foreach (self::get_services() as $class) {
            $service = self::instantiate($class);
            if (method_exists($service, 'register')) {
                $service->register();
            }
        }
    }

    /**
     * Instantiate the $services var,
     */
    private static function instantiate($class)
    {
        $service = new $class();
        return $service;
    }
}
