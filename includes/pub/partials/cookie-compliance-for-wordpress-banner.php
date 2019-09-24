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
$domain_name = $_SERVER['SERVER_NAME'];
filter_var( $domain_name, FILTER_SANITIZE_URL )
?>

<div id="global-cookie-message" class="c-cookie-banner">
	<div class="c-cookie-banner__wrapper govuk-width-container">
		<p class="c-cookie-banner__message"><?php echo strtoupper( $domain_name ); ?> uses cookies which are essential
			for the site to work. We also use non-essential cookies to help us improve government digital services. Any
			data collected is anonymised. By continuing to use this site, you agree to our use of cookies.</p>
		<div class="c-cookie-banner__buttons">
			<div class="c-cookie-banner__button c-cookie-banner__button-accept">
				<button id="cookie-accept" class="c-button govuk-button c-button--inline" type="submit">Accept
					cookies</button>
			</div>
			<div class="c-cookie-banner__button c-cookie-banner__button-settings">
				<a class="c-button govuk-button c-button--inline" role="button" href="/ccfw-cookie-policy">Cookie
					settings</a>
			</div>
		</div>
	</div>
</div>