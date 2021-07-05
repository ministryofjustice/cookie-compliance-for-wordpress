<?php

/**
 * Common functions shared by components
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components;

/**
 * Contains useful methods
 */
class Helper
{
    public $assetPath;

    /**
     * @var array
     */
    public $adminSettings = [];
    /**
     * @var string
     */
    private $base_path;


    public function __construct()
    {
        $this->base_path = 'assets/';
        $this->actions();
    }

    private function actions()
    {
    }

    public function getPageUrl()
    {
        global $wp;
        return home_url($wp->request);
    }

    public function getTimePeriod($time = null)
    {
        $hour = date("H", $time ?: time());
        switch (true) {
            case ($hour < 12):
                return 'morning';
            case ($hour > 11 && $hour < 17):
                return 'afternoon';
            case ($hour > 16):
                return 'evening';
        }
    }

    /**
     * @return string
     */
    public function assetPath()
    {
        // http://<site-name-here>/app/plugins/cookie-compliance-for-wordpress/assets/
        return esc_url(plugin_dir_url(dirname(__FILE__, 2)) . $this->base_path);
    }

    public function filePath()
    {
        return $this->assetPath();
    }

    public function cssPath()
    {
        return $this->assetPath() . 'css/';
    }

    public function fontPath()
    {
        return $this->assetPath() . 'fonts/';
    }

    public function imagePath()
    {
        return $this->assetPath() . 'images/';
    }

    public function jsPath()
    {
        return $this->assetPath() . 'js/';
    }

    public function enqueue($name)
    {
        $asset_paths = file_get_contents(CCFW_PLUGIN_DIR . '/assets/mix-manifest.json');
        $assets = json_decode($asset_paths, true);

        // find the path
        $type = substr($name, strpos($name, ".") + 1);

        return $this->assetPath() . ltrim($assets[('/' . $type . '/' . $name)], '/');
    }

    public function urlExists($url)
    {
        $headers = get_headers($url);
        return stripos($headers[0], "200 OK") ? true : false;
    }

    /**
     * @param $object
     * @param $key
     *
     * @return boolean|null
     */
    public function setupSettings($object, $key)
    {
        if (!$object || !$key) {
            return false;
        }

        if (isset($object->hasSettings) && $object->hasSettings === true) {
            $object->settings = get_option('ccfw_plugin_' . strtolower(ltrim(basename($key), "\\")), array());
            return true;
        }

        return null;
    }

    public function initSettings($class)
    {
        if (!in_array($class, $this->adminSettings, true)) {
            array_push($this->adminSettings, $class);
        }
    }

    public function splitCamelCase($string)
    {
        $regex = '/
          (?<=[a-z])
          (?=[A-Z])
        | (?<=[A-Z])
          (?=[A-Z][a-z])
        /x';
        $array = preg_split($regex, $string);
        return implode(' ', $array);
    }
}

/**
 * backward compat helper function
 */
function ccfw_get_page_uri()
{
    $helper = new Helper();
    return $helper->getPageUrl();
}
