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
            <p>Return to <a href="/data-cookie-settings">cookie settings</a></p>
            
            <h1>Cookie details</h1>

            <p>How this website uses cookies to improve the information we.</p>

            <p>The Public Defender Service website puts small files (known as ‘cookies’) onto your computer or other
                device to collect information about how you use the site.</p>

            <p>These cookies:</p>

            <ul>
                <li>measure how you use the site so it can be updated and improved based on your needs</li>
                <li>remember messages you’ve seen so that we don’t show them to you again</li>
            </ul>

            <p>Find out about <a href="https://www.aboutcookies.org/">how to manage cookies</a>.</p>

            <h2>How we use cookies</h2>

            <h3>Measuring site usage (Google Analytics)</h3>

            <p>We use Google Analytics software to collect information about how you use this site. We do this to help
                make sure we’re meeting the needs of users and to help us make improvements.</p>
            
            <div class="ccfw-settings-page__table">
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Purpose</td>
                            <td>Expires</td>
                        </tr>
                        <tr>
                            <td>__ga</td>
                            <td>This helps us count how many people visit the site by tracking if you’ve visited before</td>
                            <td>2 years</td>
                        </tr>
                        <tr>
                            <td>__gid</td>
                            <td>This helps us count how many people visit the site by tracking if you’ve visited
                                beforeGoogle Analytics stores information about</td>
                            <td>24 hrs</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Necessary cookies</h2>
            
            <p>In some instances we may use WordPress cookies. These essential cookies do things like:</p>
            
            <ul>
                <li>remember the notifications you've seen so we do not show them to you again</li>
                <li>allow for interactive website elements</li>
            </ul>
            
            <p>They always need to be on.</p>

            <p>This website has a separate <a href="/data-privacy-notice/">privacy policy</a>.</p>
        </div>
    </main>
</div>

<?php
get_footer();
