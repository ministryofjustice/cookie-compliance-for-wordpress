<?php

/**
 * Google analytics
 */

?>
<h3>Google analytics and Hotjar</h3>
<p>We use Google Analytics and Hotjar to measure how you use the website so we can improve it based on user needs.
    Google Analytics and Hotjar set cookies that store anonymised information about:
    <ul>
        <li>how you got to the site</li>
        <li>the pages you visit on <?php echo 'Cookies on ' . $domainName; ?> and how long you spend on
            each page</li>
        <li>what you click on while you're visiting the site</li>
    </ul>
</p>
<p>We do not allow Google or Hotjar to use or share the data about how you use this site.</p>

<div class="ccfw-radios ccfw-radios--inline">
    <div class="ccfw-radios__item">
        <input class="ccfw-radios__input" id="ga-yes" name="gAnalytics" type="radio" value="">
        <label class="ccfw-label ccfw-radios__label" for="ga-yes">
            <?php _e('Yes', 'cookie-compliance-for-wordpress'); ?>
        </label>
    </div>
    <div class="ccfw-radios__item">
        <input class="ccfw-radios__input" id="ga-no" name="gAnalytics" type="radio" value="" checked>
        <label class="ccfw-label ccfw-radios__label" for="ga-no">
            <?php _e('No', 'cookie-compliance-for-wordpress'); ?>
        </label>
    </div>
</div>

<p>Google also provide an opt-out tool, available at <a href="">https://tools.google.com/dlpage/gaoptout</a></p>