import { CCFW, ccfwGTM, togglesChange } from './ccfw-gtm';

const ccfwGtmRunning = ccfwGTM();

(function ($) {
    $(function ($) {
        if (ccfwGtmRunning) {
            // cache all available allowlist identifiers
            $('.ccfw-banner__toggle-slider').each(function (key, element) {
                CCFW.allowedIds.push($(element).data('allowlist'));
            });

            // setup a listener on each toggle button
            $('.' + CCFW.selector.toggles).on('click', togglesChange);

            // clearStorage; performs clear if 1 year has past since the user first set their choices.
            CCFW.clearStorage();
        }
    });
})(jQuery);
