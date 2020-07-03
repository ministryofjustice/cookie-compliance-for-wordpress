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
filter_var($domainName, FILTER_SANITIZE_URL);
$domainName = str_replace('www.', '', $domainName);
?>

<div id="ccfw-page-banner">
    <div class="ccfw-banner-container">

        <h2 class="govuk-heading-l">Are you OK with cookies?</h2>

        <p class="ccfw-banner-container__infotext">
            <?php _e('We use small files called ‘cookies’ on ' . strtoupper($domainName) . ' to give you the best experience on our site.  Some are essential to make the site work, and some help us understand how people use the site so that we can improve your experience. You can choose to turn off the non-essential cookies.  Which cookies are you happy for us to use?', 'cookie-compliance-for-wordpress'); ?>
        </p>

        <div class="ccfw-banner-container__buttons">

            <button  class="govuk-button" id="cookie-accept" type="submit">
                <?php _e('I am OK with cookies', 'cookie-compliance-for-wordpress'); ?>
            </button>

            <button class="govuk-button govuk-button--secondary" id="cookie-decline" type="submit">
                <?php _e('Only use essential cookies', 'cookie-compliance-for-wordpress'); ?>
            </button>

            <button class="ccfw-banner-button ccfw-banner-button--link govuk-link" id="cookie-more-info" aria-controls="ccfw-info-popup" aria-expanded="false">
                <?php _e('Choose which cookies we use', 'cookie-compliance-for-wordpress'); ?>
            </button>
        </div>


        <div id="cookie-popup" class="ccfw-info-popup" role="region">
            <h3 class="govuk-heading-m">Choose which cookies we use</h3>

            <div class="ccfw-toggle__header-container">
                <h4 class="govuk-heading-s ccfw-toggle__heading">Cookies that measure website use (analytics cookies)</h4>
                <fieldset class="ccfw-toggle__fieldset">
                    <label class="switch">
                        <input type="checkbox" id="ccfw-ga-toggle">
                        <span class="slider round"></span>
                        <span class="visually-hidden">Turn on analytics cookies</span>
                    </label>
                </fieldset>
            </div>

            <p class="ccfw-info-popup__summary-text">We use Google Analytics to measure how you use the website so we can improve it based on user needs. We do not allow Google Analytics to use or share the data about how you use this site. </p>

            <details class="govuk-details" data-module="govuk-details">
                <summary class="govuk-details__summary">
                    <span class="govuk-details__summary-text">
                        See our analytics cookies
                    </span>
                </summary>
                <div class="govuk-details__text">
                    <table class="govuk-table">
                        <caption class="govuk-table__caption">Analytics cookies</caption>
                        <thead class="govuk-table__head">
                            <tr class="govuk-table__row">
                            <th scope="col" class="govuk-table__header">Name</th>
                            <th scope="col" class="govuk-table__header">Purpose</th>
                            <th scope="col" class="govuk-table__header">Expires</th>
                            </tr>
                        </thead>
                        <tbody class="govuk-table__body">
                            <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">_ga</th>
                            <td class="govuk-table__cell">These help us count how many people visit www.IMB.org.uk by tracking if you’ve visited before</td>
                            <td class="govuk-table__cell">2 years</td>
                            </tr>
                            <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">_gid</th>
                            <td class="govuk-table__cell">These help us count how many people visit www.IMB.org.uk by tracking if you’ve visited before</td>
                            <td class="govuk-table__cell">24 hours</td>
                            </tr>
                            <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">_gat</th>
                            <td class="govuk-table__cell">10 minutes</td>
                            <td class="govuk-table__cell">These help us to manage how we collect analytics when we have lots of visitors on the site at one time</td>
                            </tr>
                        </tbody>
                        </table>
                </div>
            </details>


            <h4 class="govuk-heading-s">Cookies that make our site work (functional cookies)</h4>

            <p class="ccfw-info-popup__summary-text">These cookies will always need to be on because they make our site work.</p>

            <details class="govuk-details" data-module="govuk-details">
                <summary class="govuk-details__summary">
                    <span class="govuk-details__summary-text">
                        See our functional cookies
                    </span>
                </summary>
                <div class="govuk-details__text">

                <table class="govuk-table">
                    <caption class="govuk-table__caption">All users</caption>
                    <thead class="govuk-table__head">
                        <tr class="govuk-table__row">
                        <th scope="col" class="govuk-table__header">Name</th>
                        <th scope="col" class="govuk-table__header">Purpose</th>
                        <th scope="col" class="govuk-table__header">Expires</th>
                        </tr>
                    </thead>
                    <tbody class="govuk-table__body">
                        <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">wordpress_test_cookie</th>
                            <td class="govuk-table__cell">This is used to test whether the browser accepts cookies</td>
                            <td class="govuk-table__cell">When you close your browser</td>
                        </tr>
                        <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">PHPSESSID</th>
                            <td class="govuk-table__cell">This is used to link your device to the information sent to the server from your browser. It is typically used to avoid you having to retype information when moving from one page to another. </td>
                            <td class="govuk-table__cell">When you close your browser</td>
                        </tr>
                    </tbody>
                </table>


                <table class="govuk-table">
                    <caption class="govuk-table__caption">Logged in users</caption>
                    <thead class="govuk-table__head">
                        <tr class="govuk-table__row">
                        <th scope="col" class="govuk-table__header">Name</th>
                        <th scope="col" class="govuk-table__header">Purpose</th>
                        <th scope="col" class="govuk-table__header">Expires</th>
                        </tr>
                    </thead>
                    <tbody class="govuk-table__body">
                        <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">wordpress_[hash]</th>
                            <td class="govuk-table__cell">This authenticates you when you log in to the admin area</td>
                            <td class="govuk-table__cell">When you close your browser</td>
                        </tr>
                        <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">wordpress_logged_in</th>
                            <td class="govuk-table__cell">This shows the site that you’re logged in and who you are so you can access the functions you need </td>
                            <td class="govuk-table__cell">When you close your browser</td>
                        </tr>
                        <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">wordpress_sec</th>
                            <td class="govuk-table__cell">If you are logged in as a site admin, this stores your authentication details.</td>
                            <td class="govuk-table__cell">When you close your browser</td>
                        </tr>
                        <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">wp-settings-{time}-[UID]</th>
                            <td class="govuk-table__cell">The number on the end [UID] is your individual user ID from the users database.</td>
                            <td class="govuk-table__cell">1 year</td>
                        </tr>
                    </tbody>
                </table>


                </div>
            </details>

            <h4 class="govuk-heading-s">Cookies added by other sites (third-party cookies)</h4>
            <p class="ccfw-info-popup__summary-text">We embed videos from our official YouTube channel using YouTube’s privacy-enhanced mode. This mode may set cookies on your computer once you click on the YouTube video player, but YouTube will not store personally-identifiable cookie information for playbacks of embedded videos using the privacy-enhanced mode.</p>
            <p class="ccfw-info-popup__summary-text">We have no control over cookies set on other websites - you can turn them off, but not through us.</p>

            <details class="govuk-details" data-module="govuk-details">
                <summary class="govuk-details__summary">
                    <span class="govuk-details__summary-text">
                        See our third party cookies
                    </span>
                </summary>
                <div class="govuk-details__text">
                    <table class="govuk-table">
                    <caption class="govuk-table__caption">Third party cookies</caption>
                        <thead class="govuk-table__head">
                            <tr class="govuk-table__row">
                            <th scope="col" class="govuk-table__header">Name</th>
                            <th scope="col" class="govuk-table__header">Purpose</th>
                            <th scope="col" class="govuk-table__header">Expires</th>
                            </tr>
                        </thead>
                        <tbody class="govuk-table__body">
                            <tr class="govuk-table__row">
                                <th scope="row" class="govuk-table__header">PREF*</th>
                                <td class="govuk-table__cell">Allows you to view embedded YouTube videos and lets Youtube count video views.</td>
                                <td class="govuk-table__cell">8 months</td>
                            </tr>
                            <tr class="govuk-table__row">
                                <th scope="row" class="govuk-table__header">VISITOR_INFO1_LIVE*</th>
                                <td class="govuk-table__cell">Allows you to view embedded YouTube videos and lets Youtube count video views.</td>
                                <td class="govuk-table__cell">8 months</td>
                            </tr>
                            <tr class="govuk-table__row">
                                <th scope="row" class="govuk-table__header">VSC*</th>
                                <td class="govuk-table__cell">Allows you to view embedded YouTube videos and lets Youtube count video views.</td>
                                <td class="govuk-table__cell">When you close your browser</td>
                            </tr>
                            <tr class="govuk-table__row">
                                <th scope="row" class="govuk-table__header">remote_sid*</th>
                                <td class="govuk-table__cell">Allows you to view embedded YouTube videos and lets Youtube count video views.</td>
                                <td class="govuk-table__cell">When you close your browser</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>

            <button id="cookie-save-preferences"class="govuk-button">
                <?php _e('Save my choice', 'cookie-compliance-for-wordpress'); ?>
            </button>
        </div>


    </div>
</div>
