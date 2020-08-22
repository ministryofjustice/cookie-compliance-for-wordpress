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
    public $object = ''; // the settings() current object

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;
        $this->actions();
    }

    public function actions()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue']);
        add_action('admin_init', [$this, 'settings'], 11);
        add_action('admin_menu', [$this, 'page']);
    }

    public function enqueue()
    {
        wp_enqueue_style('ccfw_settings_admin_css', plugin_dir_url(dirname( __FILE__, 2 )). 'dist/css/ccfw_admin_main.css', []);
        wp_enqueue_script('ccfw_settings_admin_js', plugin_dir_url(dirname( __FILE__, 2 )).'dist/js/ccfw_admin_main.js', ['jquery']);
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
        register_setting('ccfwGroupOptionSettings', 'ccfw_plugin_setting');


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
                    'cookie-compliance-for-wordpress-settings'
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

            <h1>Cookie Compliance</h1>
            <p><em>Version</em></p>

            <?php
            echo '<h2 class="nav-tab-wrapper">';
            foreach ($this->tabs as $tab) {
                echo '<a href="#component-tab-' . $tab['key'] . '" class="nav-tab">' . $tab['class'] . '</a>';
            }
            echo '</h2>';

            settings_fields('ccfwGroupOptionSettings');
            $this->doSettingsSections('cookie-compliance-for-wordpress-settings');

            echo '<hr>';

            submit_button();
            ?>


        </form>
        <?php
    }

    /**
     * @SuppressWarnings(PHPMD.CamelCaseVariableName)
     */
    public function doSettingsSections($page)
    {
        global $wp_settings_sections, $wp_settings_fields;

        if (!isset($wp_settings_sections[$page])) {
            return;
        }

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
