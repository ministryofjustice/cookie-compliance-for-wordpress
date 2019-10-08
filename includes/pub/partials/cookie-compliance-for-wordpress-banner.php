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
filter_var( $domainName, FILTER_SANITIZE_URL )
?>

<div id="ccfw-page-banner-container">
	<div class="ccfw-banner__wrapper">
		<p class="ccfw-banner__message"><?php echo strtoupper( $domainName ); ?> uses cookies which are essential
			for the site to work. We also use non-essential cookies to help us improve our digital services. Any
			data collected is anonymised. By continuing to use this site, you agree to our use of cookies.</p>
		<div class="ccfw-banner-button__wrapper">
			<div class="ccfw-banner-button">
				<button id="cookie-accept" class="c-button govuk-button c-button--inline" type="submit">
					<?php _e( 'Accept cookies', 'cookie-compliance-for-wordpress' ); ?>
				</button>
			</div>
			<div class="ccfw-banner-button">
				<a role="button" href="/ccfw-cookie-policy">
					<?php _e( 'Cookie settings','cookie-compliance-for-wordpress' ); ?>
				</a>
			</div>
		</div>
	</div>
</div>
