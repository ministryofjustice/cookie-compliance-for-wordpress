<?php

/**
 * Provide a public-facing view
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

$domainName = $_SERVER['SERVER_NAME'];
filter_var( $domainName, FILTER_SANITIZE_URL );

if ( ! empty( $matches ) ) {
	$abspath = dirname( reset( $matches ) ) . '/';
	require_once ABSPATH . 'wp-load.php';
}

get_header();
?>

<div id="ccfw-settings-page-container">
	<main class="ccfw-settings-page__wrapper">
		<div class="ccfw-settings-page__row">
			<h2><?php echo 'Cookies on ' . $domainName; ?></h2>
			<p>Cookies are files saved on your phone, tablet or computer when you visit a website. We use cookies to
				store information about how you use the <?php echo 'Cookies on ' . $domainName; ?> website, such as
				the pages you visit.</p>
			<h3>Cookie settings</h3>
			<p>You can choose which cookies you're happy for us to use.</p>
			<h3>Cookies that measure website use</h3>
			<p>We use Google Analytics to measure how you use the website so we can improve it based on user needs.
				Google Analytics sets cookies that store anonymised information about:
				<ul>
					<li>how you got to the site</li>
					<li>the pages you visit on <?php echo 'Cookies on ' . $domainName; ?> and how long you spend on
						each page</li>
					<li>what you click on while you're visiting the site</li>
				</ul>
			</p>
			<p>We do not allow Google to use or share the data about how you use this site.</p>

			<div class="ccfw-radios ccfw-radios--inline">
				<div class="ccfw-radios__item">
					<input class="ccfw-radios__input" id="ga-yes" name="gAnalytics" type="radio" value="" checked>
					<label class="ccfw-label ccfw-radios__label" for="ga-yes">
						<?php _e( 'Yes', 'cookie-compliance-for-wordpress'); ?>
					</label>
				</div>
				<div class="ccfw-radios__item">
					<input class="ccfw-radios__input" id="ga-no" name="gAnalytics" type="radio" value="">
					<label class="ccfw-label ccfw-radios__label" for="ga-no">
						<?php _e( 'No', 'cookie-compliance-for-wordpress'); ?>
					</label>
				</div>
			</div>
			
			<h2>Strictly necessary cookies</h2>
			<p>In some instances we may use WordPress cookies. These essential cookies do things like:</p>
			<ul>
				<li>remember the notifications you've seen so we do not show them to you again</li>
				<li>allow for interactive website elements</li>
			</ul>
			<p>They always need to be on.</p>
	</main>
</div>


<?php
get_footer();