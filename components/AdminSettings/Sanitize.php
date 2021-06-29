<?php

namespace CCFW\Components\AdminSettings;

class Sanitize
{
    private static $fatal = 0;

    /**
     * Intercepts when saving settings so we can sanitize or validate inputs.
     *
     * @param array $options
     * @return array
     */
    public function options(array $options)
    {
        // catch analytics section updates
        if (isset($options['gtm_analytics_id'])) {
            $options = self::gtm($options);
        }

        return $options;
    }

    public static function gtm($options)
    {
        // Remove whitespace, tabs & line ends.
        $options['gtm_analytics_id'] = preg_replace('/\s+/', '', $options['gtm_analytics_id']);

        // Run a few basic checks (mainly for devs in case of C&P typos)
        // Check it is a GTM ID (not GA for example)
        self::$fatal = false;
        if (!preg_match('/^GTM-/', $options['gtm_analytics_id'])) {
            self::$fatal++;
            self::notice(
                "GTM ID: Invalid. ID must start with GTM.",
                'gtm-id-invalid-id-error',
                'error'
            );

            unset($options['gtm_analytics_id']);
        }

        // Too many, too few characters
        if (strlen($options['gtm_analytics_id']) != 11) {
            self::$fatal++;
            self::notice(
                "GTM ID: Invalid. Double check the entire string has been entered correctly.",
                'gtm-id-invalid-length-error',
                'error'
            );

            unset($options['gtm_analytics_id']);
        }

        return $options;
    }

    /**
     * Creates a new notice to be presented to the user. Used to pass information about the current process.
     * @param $notice
     * @param $code
     * @param string $type
     */
    private static function notice($notice, $code, $type = 'error')
    {
        if (self::$fatal === 1) {
            $notice .= '<br>~ a fatal error occurred; the entry was removed.';
        }

        add_settings_error(
            'ccfw_settings',
            'ccfw-' . $code,
            __($notice, 'cookie-compliance-for-wordpress'),
            $type
        );
    }
}
