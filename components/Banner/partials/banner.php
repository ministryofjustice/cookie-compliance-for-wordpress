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

$ccfw_domain_name = parse_url(get_home_url(get_current_blog_id()), PHP_URL_HOST);
$ccfw_domain_name = ($ccfw_domain_name ? strtolower($ccfw_domain_name) : '');

$ccfw_cookies = get_option('ccfw_cookie_management_data');

$ccfw_ccfw_gtm_id = get_option('ccfw_component_settings');
$ccfw_ccfw_gtm_id = $ccfw_ccfw_gtm_id['gtm_id'] ?? 'null';
?>

<div class="ccfw-background-grey-overlay"></div>
<button type="button" class="ccfw-settings-button" id="js-ccfw-settings-button">
    <svg aria-hidden="true" class="ccfw-settings-button__background-triangle" width="94" height="94" viewBox="0 0 94 94"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M0 94H94L0 0V94Z"/>
    </svg>
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cookie-bite" role="img"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
         class="svg-inline--fa fa-cookie-bite fa-w-16 fa-2x ccfw-settings-button__icon">
        <path fill="currentColor"
              d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13 35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0 0-12.82 80.95l12.08 76.27a132.521 132.521 0 0 0 37.16 72.96l54.77 54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.15c27.51 4.36 55.7-.11 80.53-12.76l69.13-35.21a132.273 132.273 0 0 0 57.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
    </svg>
    <span class="ccfw-settings-button__text"><span class="visually-hidden">Cookie</span>Settings</span>
</button>

<div id="ccfw-page-banner" data-nosnippet="true" data-gtm-id="<?= $ccfw_ccfw_gtm_id ?>">
    <div class="ccfw-banner">
        <div class="ccfw-banner__intro">
            <h2 class="ccfw-banner__heading">
                <?php _e('Are you OK with cookies?', 'cookie-compliance-for-wordpress'); ?>
            </h2>
            <p class="ccfw-banner__info-text">
                <?php _e(
                    'We use small files called ‘cookies’ on '
                    . $ccfw_domain_name
                    . '.  Some are essential to make the site work, some help us to understand how we can improve your'
                    . ' experience, and some are set by third parties. You can choose to turn off the non-essential'
                    . ' cookies. Which cookies are you happy for us to use?',
                    'cookie-compliance-for-wordpress'
                ); ?>
            </p>
            <div class="ccfw-banner__buttons">
                <button class="ccfw-banner__button" id="cookie-accept" type="submit" aria-label="I am OK with cookies. Page will reload.">
                    <?php _e('I am OK with cookies', 'cookie-compliance-for-wordpress'); ?>
                </button>

                <button class="ccfw-banner__button" id="cookie-decline" type="submit">
                    <?php _e('Only use essential cookies', 'cookie-compliance-for-wordpress'); ?>
                </button>

                <button type="button" class="ccfw-banner-button ccfw-banner__button--expand-options"
                        id="cookie-more-info">
                    <?php _e('Choose which cookies we use', 'cookie-compliance-for-wordpress'); ?>
                    <svg class="ccfw-banner__button--arrow" width="20" height="20" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0516 1.86827C10.4659 1.28249 9.51612 1.28249 8.93033 1.86827C8.34454 2.45406
                        8.34454 3.40381 8.93033 3.98959L11.0516 1.86827ZM17.0621 10L18.1227 11.0607C18.7085 10.4749
                        18.7085 9.52513 18.1227 8.93934L17.0621 10ZM8.93033 16.0104C8.34454 16.5962 8.34454 17.5459
                        8.93033 18.1317C9.51612 18.7175 10.4659 18.7175 11.0516 18.1317L8.93033 16.0104ZM8.93033
                        3.98959L16.0014 11.0607L18.1227 8.93934L11.0516 1.86827L8.93033 3.98959ZM16.0014 8.93934L8.93033
                        16.0104L11.0516 18.1317L18.1227 11.0607L16.0014 8.93934Z"/>
                    </svg>
                </button>
            </div>
        </div>


        <div class="ccfw-banner__modal-container" id="cookie-popup" role="dialog" aria-labelledby="ccfw-banner-title"
             aria-modal="true" tabindex="-1">
            <button type="button" id="ccfw-modal-close" class="ccfw-banner__button ccfw-banner__button--close">
                Close
            </button>

            <h3 class="ccfw-banner__info-heading" id="ccfw-banner-title">Choose which cookies we use</h3>

            <!--Sections -->
            <?php
            foreach ($ccfw_cookies as $section => $groups) {
                echo '<div class="ccfw-banner__section">';

                $ccfw_buttons_allowed_in = [
                    'marketing',
                    'analytics'
                ];

                if (in_array($section, $ccfw_buttons_allowed_in)) {
                    ?>

                    <!-- Section heading and universal switch -->
                    <div class="ccfw-banner__toggle-header-container">
                        <h4 class="ccfw-banner__toggle-heading"
                            id="ccfw-<?= $section ?>-cookies"><?= ucfirst($section) ?> cookies</h4>
                        <div class="ccfw-banner__toggle-label">
                            <button
                                role="switch" aria-labelledby="ccfw-<?= $section ?>-cookies"
                                class="ccfw-banner__toggle-slider"
                                id="ccfw-<?= $section ?>-cookies-toggle"
                                aria-checked="false"
                                data-allowlist="all"
                                type="button"
                            >
                                <span class="ccfw-banner__toggle-slider--off-text toggle-off" aria-hidden="true"
                                      id="ccfw-all-toggle-off">Off</span>
                                <span class="ccfw-banner__toggle-slider--on-text toggle-on" aria-hidden="true"
                                      id="ccfw-all-toggle-on">On</span>
                            </button>
                        </div>
                    </div>

                    <?php
                } else {
                    ?>
                    <div class="ccfw-banner__toggle-header-container">
                        <h4 class="ccfw-banner__toggle-heading"><?= ucfirst($section) ?> cookies</h4>
                        <?= ($section === 'essential') ? '<p class="ccfw-banner__toggle-heading--always-on">Always on</p>' : '' ?>
                    </div>
                    <?php
                }

                foreach ($groups as $slug => $group) { ?>
                    <div class="ccfw-banner__group">
                        <h3 class="ccfw-banner__toggle-heading"
                            id="ccfw-<?= $slug ?>-cookies"><?= $group['name'] ?></h3>
                        <?php if (in_array($section, $ccfw_buttons_allowed_in)) { ?>
                            <div class="ccfw-banner__toggle-label">
                                <button
                                        role="switch" aria-labelledby="ccfw-<?= $slug ?>-cookies"
                                        class="ccfw-banner__toggle-slider"
                                        id="ccfw-<?= $slug ?>-cookies-toggle"
                                        aria-checked="false"
                                        data-allowlist="<?= $group['allowlistID'] ?? 'no-allowlist-id' ?>"
                                        type="button"
                                >

                                        <span class="ccfw-banner__toggle-slider--off-text toggle-off"
                                              aria-hidden="true"
                                              id="ccfw-<?= $group['allowlistID'] ?>-toggle-off">Off</span>

                                    <span class="ccfw-banner__toggle-slider--on-text toggle-on"
                                          aria-hidden="true"
                                          id="ccfw-<?= $group['allowlistID'] ?>-toggle-on">On</span>
                                </button>
                            </div>

                        <?php }
                        echo (isset($group['description'])) ? '<p class="ccfw-banner__summary-text">' .
                            $group['description'] . '</p>' : '' ?>

                        <details class="ccfw-banner__expanding-section" data-module="govuk-details">
                            <summary class="ccfw-banner__expanding-section-summary">
                                        <span class="ccfw-banner__expanding-section-summary-text">
                                            See our <?= $group['name'] ?> cookies
                                        </span>
                            </summary>
                            <div class="ccfw-banner__expanding-section-text">
                                <table class="ccfw-banner__table">
                                    <caption class="ccfw-banner__table-caption"><?= $group['name'] ?></caption>
                                    <thead>
                                    <tr>
                                        <th scope="col" class="ccfw-banner__table-header">Name</th>
                                        <th scope="col" class="ccfw-banner__table-header">Purpose</th>
                                        <th scope="col" class="ccfw-banner__table-header">Expires</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    foreach ($group['cookies'] as $cookie) {
                                        // manage URLs
                                        if (strpos($cookie['expiry'], 'http') === 0) {
                                            $cookie['expiry'] = '<a href="'
                                                . $cookie['expiry']
                                                . '" class="ccfw-banner__third-party-section-link">Read the '
                                                . $cookie['name']
                                                . ' policy</a>';
                                        }
                                        ?>
                                        <tr>
                                            <th scope="row"
                                                class="ccfw-banner__table-header"><?= $cookie['name'] ?></th>
                                            <td class="ccfw-banner__table-cell"><?= $cookie['description'] ?></td>
                                            <td class="ccfw-banner__table-cell"><?= $cookie['expiry'] ?></td>
                                        </tr>
                                        <?php
                                    } ?>

                                    </tbody>
                                </table>
                            </div>
                        </details>
                    </div>
                    <?php
                }
                ?>
        </div>
                <?php
            }
            ?>
        <div class="ccfw-banner__save-preferences">
            <button type="submit" id="cookie-save-preferences" class="ccfw-banner__button" aria-label="Save cookie preferences. Page will reload.">>
                <?php _e('Save cookie preferences', 'cookie-compliance-for-wordpress'); ?>
            </button>
        </div>
    </div>
</div>
</div>
