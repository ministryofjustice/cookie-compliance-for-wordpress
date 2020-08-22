<?php
/**
 * Created by PhpStorm.
 * User: damienwilson
 * Date: 2019-09-23
 * Time: 13:56
 */

namespace CCFW\Components;

/**
 * Contains useful methods
 */
class Helper
{
    public $assetPath = '';

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

    /**
     * @SuppressWarnings(PHPMD.ShortVariable)
     */
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
    public function assetPath($path)
    {
        return esc_url(plugins_url('dist/', $path));
    }

    public function cssPath($path)
    {
        return $this->assetPath($path) . 'css/';
    }

    public function fontPath($path)
    {
        return $this->assetPath($path) . 'fonts/';
    }

    public function imagePath($path)
    {
        return $this->assetPath($path) . 'images/';
    }

    public function jsPath($path)
    {
        return $this->assetPath($path) . 'js/';
    }

    public function emailPath($path)
    {
        return $path . 'email-templates/';
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

    /**
     *
     */
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
