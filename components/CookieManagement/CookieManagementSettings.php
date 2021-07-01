<?php

/**
 * Admin area banner functionality
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */

namespace CCFW\Components\CookieManagement;

class CookieManagementSettings extends CookieManagement
{
    public $helper;

    public function __construct()
    {
        global $ccfwHelper;
        $this->helper = $ccfwHelper;
    }

    public function options()
    {
        return get_option('ccfw_component_settings');
    }

    public function settings()
    {
        $this->helper->initSettings($this);
    }

    public function settingsFields($section)
    {

        add_settings_field(
            'cookie-management',
            __('', 'cookie-compliance-for-wordpress'),
            [$this, 'manageCookies'],
            'ccfwComponentSettings',
            $section
        );

        add_settings_field(
            'cookie-management-debug',
            __('', 'cookie-compliance-for-wordpress'),
            [$this, 'toggleDebug'],
            'ccfwComponentSettings',
            $section
        );
    }

    /**
     * Drops the cookie management application UI container
     */
    public function manageCookies()
    {
        echo '<div id="ccfw-cookie-management"></div>';
    }

    /**
     * Display a decorative banner
     */
    public function toggleDebug()
    {
        $options = get_option('ccfw_component_settings');
        $is_checked = $options['cookie_management_debug'] ?? 'no';

        ?>
        <input type='checkbox' id="cookie-management-debug"
               name='ccfw_component_settings[cookie_management_debug]'
               value="yes"
               class="ccfw-component-input" <?= checked('yes', $is_checked) ?>
        />
        <label for="cookie-management-debug">Display developer information?</label>
        <?php
    }

    public function settingsSectionCB()
    {
        echo 'Marketing cookies require a <strong>GTM ID</strong>. ' .
            'Available ID\'s can be discovered on the ' .
            '<a target="_blank" href="https://developers.google.com/tag-manager/web/restrict">' .
            'GTM Restrict tag deployment</a> page.';
    }
}
