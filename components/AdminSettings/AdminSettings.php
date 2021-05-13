<?php

/**
 * Setup all plugin admin settings
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components;

class AdminSettings
{
    public $helper;
    public $tabs = [];
    public $content = [];
    public $object = '';

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;

        $this->actions();
    }

    public function actions()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue'], 11);
        add_action('admin_init', [$this, 'settings'], 11);
        add_action('admin_menu', [$this, 'page']);
    }

    public function enqueue()
    {
        wp_enqueue_style('CCFWStyleAdmin', $this->helper->enqueue('ccfw-admin-main.css'));
        wp_enqueue_script('CCFWScriptAdmin', $this->helper->enqueue('ccfw-admin-main.js'), ['jquery']);
    }

    public function page()
    {
        add_options_page(
            'Cookie Compliance for WP Settings',
            'Cookie Compliance For WP',
            'manage_options',
            'cookie-compliance-for-wordpress-settings',
            [$this, 'content']
        );
    }

    public function settings()
    {
        register_setting(
            'ccfwGroupOptionSettings',
            'ccfw_plugin_settings',
            ['sanitize_callback' => ['CCFW\AdminSettings\Sanitize', 'options']]
        );

        foreach ($this->helper->adminSettings as $key => $class) {
            $this->object = new $class();
            $hasSettings = $this->object->hasSettings ?? false;

            if ($hasSettings === true) {
                $thisClass = get_class($this->object);
                $thisClass = str_replace('\\', '/', $thisClass);
                $className = $this->helper->splitCamelCase(basename($thisClass));

                $this->tabs[] = [
                    'key' => $key,
                    'class' => str_replace(' Settings', '', $className)
                ];

                add_settings_section(
                    'component-tab-' . $key,
                    $className,
                    [$this->object, 'settingsSectionCB'],
                    'ccfwGroupOptionSettings'
                );

                $this->object->settingsFields('component-tab-' . $key);
            }
        }

        return $this->tabs;
    }

    public function content()
    {
        ?>
        <form action='options.php' method='post'>

            <h1>Cookie Compliance For WordPress</h1>

            <?php
            echo '<h2 class="nav-tab-wrapper">';
            foreach ($this->tabs as $tab) {
                echo '<a href="#component-tab-' . $tab['key'] . '" class="nav-tab">' . $tab['class'] . '</a>';
            }
            echo '</h2>';

            settings_fields('ccfwGroupOptionSettings');
            $this->doSettingsSections('ccfwGroupOptionSettings');

            echo '<hr>';

            submit_button();
            ?>


        </form>
        <?php
    }

    /**
     * Load new tab section
     * @param $page
     */
    public function doSettingsSections($page)
    {
        global $wp_settings_sections, $wp_settings_fields;

        if (!isset($wp_settings_sections[$page])) {
            return;
        }

        //echo '<pre>' . print_r($wp_settings_sections[$page], true) . '</pre>';

        foreach ((array)$wp_settings_sections[$page] as $key => $section) {
            echo '<div id="' . $key . '" class="ccfw-component-settings-section">';
            if ($section['title']) {
                echo "<h2>{$section['title']}</h2>\n";
            }

            if ($section['callback']) {
                call_user_func($section['callback'], $section);
            }

            if (!isset($wp_settings_fields) || !isset($wp_settings_fields[$page]) || !isset($wp_settings_fields[$page][$section['id']])) {
                continue;
            }

            echo '<table class="form-table">';
            do_settings_fields($page, $section['id']);
            echo '</table>';
            echo '</div>';
        }
    }

    public function getSettings()
    {
        return $this->helper->adminSettings;
    }
}
