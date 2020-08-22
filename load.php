<?php
/**
 * Cookie Compliance For Wordpress plugin autoload implementation.
 * Based on PSR4 specifications
 * https://www.php-fig.org/psr/psr-4/
 *
 * @package    cookie-compliance-for-wordpress
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * SPL Autoload
 *
 * @param string $class The fully-qualified class name.
 * @return void
 */

spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = 'CCFW\\';

    // base directory for the namespace prefix
    $base_dir = __FILE__ . '/components/';

    // does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // no, move to the next registered autoloader
        return;
    }

    // get the relative class name
    $relative_class = substr($class, $len);

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // if the file exists, require it
    if (file_exists($file)) {
        require $file;
    }
});
