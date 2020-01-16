<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://github.com/ministryofjustice/cookie-compliance-for-wordpress
 * @since      1.0.0
 *
 * @package    cookie-compliance-for-wordpress
 */
$domainName = $_SERVER['SERVER_NAME'];
filter_var( $domainName, FILTER_SANITIZE_URL );
$domainName = str_replace('www.', '', $domainName);
?>

<div id="ccfw-page-banner-container">
    <div class="ccfw-banner__wrapper">
        <span class="ccfw-banner__heading">Tell us whether you accept cookies</span>

        <p class="ccfw-banner__message">
			<?php _e( 'We use cookies to <a href="/ccfw-cookie-policy">collect information</a> about how you use ' . strtoupper( $domainName ) . ' . 
			We use this information to make the website work as well as possible and improve our digital services.', 'cookie-compliance-for-wordpress'); ?>
        </p>

        <div class="ccfw-banner-button__wrapper">
            <div class="ccfw-banner-button">
                <button type="submit">
                    <?php _e( 'Accept all cookies', 'cookie-compliance-for-wordpress' ); ?>
                </button>
            </div>
            <div class="ccfw-banner-button">
                <a role="button" href="/ccfw-cookie-policy">
                    <?php _e( 'Set cookie preferences', 'cookie-compliance-for-wordpress' ); ?>
                </a>
            </div>
        </div>

    </div>
</div>
