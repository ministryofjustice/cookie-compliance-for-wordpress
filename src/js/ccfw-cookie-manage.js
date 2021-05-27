import { CCFW, ccfwGTM, togglesChange } from './ccfw-gtm';

const ccfwGtmRunning = ccfwGTM();

(function ($) {
    $(function ($) {
        if (ccfwGtmRunning) {
            const toggleButtons = $('.ccfw-banner__toggle-slider');
            const allowedIds = [];

            // collect ids
            toggleButtons.each(function (key, element) {
                allowedIds.push($(element).data('allowlist'));
            });

            /**
             * Cache all available allowlist identifiers
             * @type {[]}
             */
            CCFW.allowedIds = allowedIds;

            $('.' + CCFW.selector.toggles).on('click', togglesChange);

            //CCFW.storage.clear('ccfw-banner-visibility');
            //CCFW.storage.clear('ccfw-gtm-allowed');

            /**
             * clearStorage checks if 1 year has past since the user first set their choices.
             */
            CCFW.clearStorage();

            console.log(allowedIds);
        }
    });
})(jQuery);
