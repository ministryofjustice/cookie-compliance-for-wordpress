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

<div id="global-cookie-message" class="c-cookie-banner" data-module="cookie-banner" role="region"
	aria-label="cookie banner">
	<div class="c-cookie-banner__wrapper govuk-width-container">
		<p class="c-cookie-banner__message"><strong><?php echo strtoupper( $domain_name ); ?></strong> uses cookies to
			make the site simpler.</p>
		<div class="c-cookie-banner__buttons">
			<div class="c-cookie-banner__button c-cookie-banner__button-accept">
				<button id="cookie-accept" class="c-button govuk-button c-button--secondary c-button--inline" type="submit"
					data-module="track-click" data-accept-cookies="true" data-track-category="cookieBanner"
					data-track-action="Cookie banner accepted">Accept cookies</button>
			</div>
			<div class="c-cookie-banner__button c-cookie-banner__button-settings">
				<a class="c-button govuk-button c-button--secondary c-button--inline" role="button"
					data-module="track-click" data-track-category="cookieBanner"
					data-track-action="Cookie banner settings clicked" href="/ccfw-cookie-policy">Cookie settings</a>
			</div>
		</div>
	</div>
</div>
