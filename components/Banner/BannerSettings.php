<?php
/**
 * Admin area banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */
namespace CCFW\Components;

use CCFW\Components\Banner;

class BannerSettings extends Banner
{
    public $helper;

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;
    }

    public function settings()
    {
        $this->helper->initSettings($this);
    }

    public function settingsFields($section)
    {
        add_settings_field(
            'banner_title',
            __('Banner title', 'cookie-compliance-for-wordpress'),
            [$this, 'bannerTitle'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
    }

    /**
     * Add custom banner title
     */
    public function bannerTitle()
    {

        $options = get_option('ccfw_plugin_settings');
        $bannerTitle = $options['banner_title'] ?? '';

        ?>
        <input type='text' name='ccfw_plugin_settings[banner_title]'
        placeholder="Add custom cookie banner title" value='<?php echo esc_attr($bannerTitle); ?>'
        class="ccfw-component-input">
        <?php
    }

    public function settingsSectionCB()
    {
        ?>
        <p><?php _e('Make custom changes to your cookie banner.', 'wp_banner_page'); ?></p>
        <?php
    }
}
