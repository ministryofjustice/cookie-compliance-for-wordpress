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

 // required to load the wp header for use with custom external php - maybe this can be refactored better?
require_once $_SERVER['DOCUMENT_ROOT'] . '/index.php';
$matches = preg_grep( '/wp-blog-header.php/', get_included_files() );

$domain_name = $_SERVER['SERVER_NAME'];
filter_var( $domain_name, FILTER_SANITIZE_URL );

if ( ! empty( $matches ) ) {
	$abspath = dirname( reset( $matches ) ) . '/';
	require_once ABSPATH . 'wp-load.php';
}

get_header();
?>

<div id="ccfw-settings-page" class="govuk-width-container">
	<main class="govuk-main-wrapper">

		<div class="govuk-grid-row">
			<div class="govuk-grid-column-two-thirds">

				<h2 class="govuk-heading-xl"><?php echo 'Cookies on ' . $domain_name; ?></h2>
				<p>Cookies are files saved on your phone, tablet or computer when you visit a website. We use cookies to
					store information about how you use the <?php echo 'Cookies on ' . $domain_name; ?> website, such as
					the pages you visit.</p>

				<h3 class="govuk-heading-l">Cookie settings</h3>

				<p>You can choose which cookies you're happy for us to use.</p>

				<h3 class="govuk-heading-l">Cookies that measure website use</h3>
				<p>We use Google Analytics to measure how you use the website so we can improve it based on user needs.
					Google Analytics sets cookies that store anonymised information about:

					<ul>
						<li>how you got to the site</li>
						<li>the pages you visit on <?php echo 'Cookies on ' . $domain_name; ?> and how long you spend on
							each page</li>
						<li>what you click on while you're visiting the site</li>
					</ul>

				</p>
				<p>We do not allow Google to use or share the data about how you use this site.</p>

				<div id="ccfw-settings" class="govuk-radios">

					<div class="govuk-radios__item">

						<input class="govuk-radios__input" id="ga-yes" name="gAnalytics" type="radio" value="" checked>
						<label class="govuk-label govuk-radios__label" for="">
							Yes
						</label>
					</div>

					<div class="govuk-radios__item">

						<input class="govuk-radios__input" id="ga-no" name="gAnalytics" type="radio" value="">
						<label class="govuk-label govuk-radios__label" for="">
							No
						</label>
					</div>

					<br><br>

					<h2 class="govuk-heading-l">Strictly necessary cookies</h2>

					<p>In some instances we may use WordPress cookes. These essential cookies do things like:</p>
					<ul>
						<li>remember the notifications you've seen so we do not show them to you again</li>
						<li>allow for interactive website elements</li>
					</ul>
					<p>They always need to be on.</p>
					</p>

	</main>
</div>


<?php
get_footer();