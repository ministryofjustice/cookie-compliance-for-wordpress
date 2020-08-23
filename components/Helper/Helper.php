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

    // mail related stuff
    /**
     * @var string
     */
    public $mailTo = '';

    /**
     * @var string
     */
    public $mailSubject = '';

    /**
     * @var string
     */
    public $mailMessage = '';

    /**
     * @var array
     */
    public $mailHeaders = [];

    /**
     * @var array
     */
    public $adminSettings = [];


    public function __construct()
    {
        $this->actions();
    }

    private function actions()
    {
        add_filter('cron_schedules', [$this, 'addIntervals']);
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
     * @param $path | the path to the assets directory in the given component
     * @return string
     */
    public function assetPath()
    {
        // http://<site-name-here>/app/plugins/cookie-compliance-for-wordpress/dist/
        return esc_url(plugin_dir_url(dirname(__FILE__, 2)). 'dist/');
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

    public function emailPath()
    {
        return 'email-templates/';
    }

    public function filePath()
    {
        return esc_url(plugin_dir_path(dirname(__FILE__, 2)).'dist/');
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

    public function mail()
    {
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        wp_mail($this->mailTo, $this->mailSubject, $this->mailMessage, $headers);
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

    public function setMailSubject($subject)
    {
        $this->mailSubject = $subject;
    }

    public function setMailMessage($message)
    {
        $this->mailMessage = $message;
    }

    public function setMaiTo($to)
    {
        $this->mailTo = $to;
    }

    public function addIntervals($schedules)
    {
        $schedules['weekly'] = array(
            'interval' => 604800,
            'display' => __('Once Weekly')
        );
        $schedules['monthly'] = array(
            'interval' => 2635200,
            'display' => __('Once Monthly')
        );
        $schedules['five_minutes'] = [
            'interval' => 300,
            'display' => esc_html__('Every Five Minutes')
        ];
        $schedules['three_minutes'] = [
            'interval' => 180,
            'display' => esc_html__('Every Three Minutes')
        ];

        return $schedules;
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
