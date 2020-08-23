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
        add_filter('script_loader_tag', [$this, 'addTypeAttribute'], 10, 3);
        add_action('wp_enqueue_scripts', [$this, 'enqueue'], 11);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdmin'], 11);
        add_action('admin_init', [$this, 'settings'], 11);
        add_action('admin_menu', [$this, 'page']);
    }

    public function enqueue()
    {
        global $wp_version;

        $file_existsCSS = file_exists($this->helper->filePath() .'css/ccfw_frontend.css');
        $file_existsJS = file_exists($this->helper->filePath() .'js/ccfw_frontend.js');

        // Cache bust
        $css_has_changed_hash = $file_existsCSS ? filemtime($this->helper->filePath() .'css/ccfw_frontend.css') : $wp_version;
        $js_has_changed_hash = $file_existsJS ? filemtime($this->helper->filePath() .'js/ccfw_frontend.js') : $wp_version;

        wp_enqueue_style('CCFWPluginStyle', $this->helper->cssPath() .'ccfw_frontend.css', null, $css_has_changed_hash, false);
        wp_enqueue_script('CCFWPluginScript', $this->helper->jsPath() .'ccfw_frontend.js', ['jquery'], $js_has_changed_hash , true);

        global $is_IE;

        if ($is_IE) {
        // Fix IE11 banner issues - https://github.com/nuxodin/ie11CustomProperties
            wp_enqueue_script('CCFWPluginScriptIE11', $this->helper->jsPath().'ccfw-ie11CustomProperties.js', ['jquery'], $js_has_changed_hash, false);
        }
    }

    public function enqueueAdmin()
    {
        wp_enqueue_style('CCFWPluginStyleAdmin', $this->helper->cssPath() . 'ccfw_admin_main.css', []);
        wp_enqueue_script('CCFWPluginScriptAdmin', $this->helper->jsPath() . 'ccfw_admin_main.js', ['jquery']);
    }

    public function addTypeAttribute($tag, $handle, $src)
    {
        if ('CCFWPluginScript' !== $handle) {
            return $tag;
        }

        // Add module type to allow for JavaScript ES6 Modules
        $tag = '<script type="module" src="' . esc_url($src) . '"></script><script nomodule src="' . esc_url($src) . '"></script>';
        return $tag;
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
     * Load into text into new tab section
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
