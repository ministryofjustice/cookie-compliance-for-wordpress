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

/**
 * Required, load the WP environment ie header/footer as we are using a PHP page outside the WP loop - maybe this can be refactored better?
 * */
require_once $_SERVER['DOCUMENT_ROOT'] . '/index.php';
$matches = preg_grep('/wp-blog-header.php/', get_included_files());

if (! empty($matches)) {
    $abspath = dirname(reset($matches)) . '/';
    require_once ABSPATH . 'wp-load.php';
}

/**
 * Strip off www from domain name for easier reading
 * */
$domainName = $_SERVER['SERVER_NAME'];
filter_var($domainName, FILTER_SANITIZE_URL);
$domainName = str_replace('www.', '', $domainName);

get_header();
?>

<div id="ccfw-settings-page-container">
    <main class="ccfw-settings-page__wrapper">
        <div class="ccfw-settings-page__row">

            <p>Return to <a href="/data-cookie-settings">cookie settings</a></p>

            <h1>Privacy notice</h1>
            
            <h2>About the <?php echo $domainName; ?> website</h2>

            <p><?php echo $domainName; ?> is provided by the Ministry of Justice.</p>

            <p>The Ministry of Justice is the data controller for <?php echo $domainName; ?>.
                If you follow a link to another website,the organisation providing that service will:</p>

            <ul>
                <li>be the data controller</li>
                <li>be responsible for processing any data you share with them</li>
                <li>publish and manage their own privacy notice with details of how to contact them</li>
            </ul>

            <h2>What data we collect</h2>

            <p>The personal data we collect from you includes:</p>

            <ul>
                <li>your Internet Protocol (IP) address, and details of which version of web browser you used</li>
                <li>information on how you use the site, using cookies and page tagging techniques</li>
            </ul>

            <p>We use tracking software to collect information about how you use <?php echo $domainName; ?>.
                This includes IP addresses. The data is anonymised before being used for analytics processing.</p>

            <p>Our tracking software process anonymised information about:</p>

            <ul>
                <li>the pages you visit</li>
                <li>how long you spend on each page</li>
                <li>how you got to the site</li>
                <li>what you click on while you’re visiting the site</li>
            </ul>

            <p>We do not store your personal information (for example your name or address).</p>

            <p>We will not identify you through analytics information, and we will not combine analytics information
                with other data sets in a way that would identify who you are.</p>

            <p>We continuously test and monitor our data protection controls to make sure they’re effective and to
                detect any weaknesses.</p>

            <h2>Why we need your data</h2>

            <p>We collect information to see how you use the site. We do this to help:</p>

            <ul>
                <li>make sure the site is meeting the needs of its users</li>
                <li>make improvements</li>
            </ul>

            <p>We also collect data in order to:</p>

            <ul>
                <li>gather feedback to improve the site</li>
                <li>monitor use of the site to identify security threats</li>
            </ul>

            <h2>Our legal basis for processing your data</h2>

            <p>The legal basis for processing personal data in relation to site security is our legitimate interests,
                and the legitimate interests of our users, in ensuring the security and integrity of
                <?php echo $domainName; ?>.</p>

            <p>The legal basis for processing anonymised data is your consent.</p>

            <p>For more information, see the Ministry of Justice <a
                    href="https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter">personal
                    information charter</a>.</p>

            <h2>What we do with your data</h2>

            <p>The data we collect may be shared with other government departments, agencies and public bodies.
                It may also be shared with our technology suppliers, for example our hosting provider.</p>

            <p>We will not:</p>

            <ul>
                <li>sell or rent your data to third parties</li>
                <li>share your data with third parties for marketing purposes</li>
                <li>use your data in analytics</li>
            </ul>

            <p>We will share your data if we are required to do so by law - for example, by court order, or to prevent
                fraud or other crime.</p>

            <h2>How long we keep your data</h2>

            <p>We will only retain your personal data for as long as:</p>

            <ul>
                <li>it is needed for the purposes set out in this document</li>
                <li>the law requires us to</li>
            </ul>

            <h2>Children’s privacy protection</h2>

            <p>Our services are not designed for, or intentionally targeted at, children 13 years of age or younger. We
                do not intentionally collect or maintain data about anyone under the age of 13.</p>

            <h2>Where your data is processed and stored</h2>

            <p>We design, build and run our systems to make sure that your data is as safe as possible at all stages,
                both while it’s processed and when it’s stored.</p>

            <p>All personal data is stored in the European Economic Area (EEA). Data collected by the third party
                analytic vendors (such as Google Analytics) may be transferred outside the EEA for processing.</p>

            <h2>How we protect your data and keep it secure</h2>

            <p>We are committed to doing all that we can to keep your data secure. We have set up systems and processes
                to prevent unauthorised access or disclosure of your data
                - for example, we protect your data using varying levels of encryption.</p>

            <p>We also make sure that any third parties that we deal with keep all personal data they process on our
                behalf secure.</p>

            <h2>Links to other websites</h2>

            <p><?php echo $domainName; ?> contains links to other websites.</p>

            <p>This privacy notice only applies to <?php echo $domainName; ?>, and does not cover other websites that we
                link to. These websites have their own terms and conditions and privacy policies.</p>

            <h3>Following a link to another website</h3>

            <p>If you go to another website from this one, read the privacy policy on that website to find out what it
                does with your information.</p>

            <h3>Following a link to <?php echo $domainName; ?> from another website</h3>

            <p>If you come to <?php echo $domainName; ?> from another website, we may receive personal information from
                the other website. You should read the privacy policy of the website you came from to find out more
                about this.</p>

            <h2>Your rights</h2>

            <p>You have the right to request:</p>

            <ul>
                <li>information about how your personal data is processed</li>
                <li>a copy of that personal data</li>
                <li>that anything inaccurate in your personal data is corrected immediately</li>
            </ul>

            <p>You can also:</p>

            <ul>
                <li>raise an objection about how your personal data is processed</li>
                <li>request that your personal data is erased if there is no longer a justification for it</li>
                <li>ask that the processing of your personal data is restricted in certain circumstances</li>
            </ul>

            <h2>Contact us or make a complaint</h2>

            <p>For more information on your rights and how to complain, see the Ministry of Justice personal information
                charter.</p>

            <p>You can contact our privacy team at:</p>

            <address class="ccfw-settings-page__address">
                MoJ Data Protection Officer;<br>
                3rd Floor, Post Point 3.20<br>
                10 South Colonnades<br>
                London<br>
                E14 4PU<br>
                <a
                    href="mailto:data.compliance@justice.gov.uk>data.compliance@justice.gov.uk">data.compliance@justice.gov.uk</a>
            </address>

            <p>When we ask you for information, we will comply with the law. If you consider that your information has
                been handled incorrectly,
                you can contact the Information Commissioner for independent advice about data protection.</p>

            <p>You can contact the Information Commissioner at:</p>

            <address class="ccfw-settings-page__address">
                Information Commissioner's Office<br>
                Wycliffe House<br>
                Water Lane<br>
                Wilmslow<br>
                Cheshire<br>
                SK9 5AFU<br>
                Tel: 0303 123 1113<br>
                <a href="http://www.ico.org.uk">http://www.ico.org.uk</a>
            </address>

            <h2>Changes to this policy</h2>

            <p>We may change this privacy policy. In that case, the ‘last updated’ date at the bottom of this page will
                also change.
                Any changes to this privacy policy will apply to you and your data immediately.</p>

            <p>If these changes affect how your personal data is processed, the Ministry of Justice will take reasonable
                steps to let you know.</p>

            <br><p>Last updated: 20 January 2020</p>
    </main>
</div>


<?php
get_footer();
