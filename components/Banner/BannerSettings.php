<?php

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
            'banner_text',
            __('Banner text', 'cookie-compliance-for-wordpress'),
            [$this, 'bannerText'],
            'cookie-compliance-for-wordpress-settings',
            $section
        );
    }

    /**
     * Function that collects inputed GTM ID and running checks on it.
     */
    public function bannerText()
    {
        echo '<h1>Hellow</h1>';
    }

    public function settingsSectionCB()
    {
        echo '<h1>Hellow2</h1>';
    }
}
