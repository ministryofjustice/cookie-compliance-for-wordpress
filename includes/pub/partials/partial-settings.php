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
$matches = preg_grep('/wp-blog-header.php/', get_included_files());

if (! empty($matches)) {
    $abspath = dirname(reset($matches)) . '/';
    require_once ABSPATH . 'wp-load.php';
}

$domainName = $_SERVER['SERVER_NAME'];
filter_var($domainName, FILTER_SANITIZE_URL);
$domainName = str_replace('www.', '', $domainName);

get_header();
?>

<div id="ccfw-settings-page-container">

    <main class="ccfw-settings-page__wrapper">
        <div class="ccfw-settings-page__row">

            <h1>Data and privacy</h1>
            
            <p>View the <a href="/privacy-notice/">privacy notice</a> on <?php echo $domainName; ?>.</p>
            
            <h2>Cookie settings</h2>
            
            <p>Cookies are files saved on your phone, tablet or computer when you visit a website. We use cookies to
                store information about how you use the <?php echo $domainName; ?> website, such as
                the pages you visit.<a href="/cookies/"> Find out more about how we use cookies</a>.</p>

            <?php
            
            // Google on/off toggle setting
            require_once $this->plugin_path . 'includes/pub/partials/components/c-google.php';

            /**
             * set up so that toggling Google's dataLayer turns off both, in future activating this could allow togging
             * Hotjar individually from Google
             * Hotjar on/off toggle setting
             **/
            
             // require_once $this->plugin_path . 'includes/pub/partials/components/c-hotjar.php';

            ?>

            <h2>Necessary cookies</h2>

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
