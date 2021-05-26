import { CCFW, ccfwGTM, togglesChange } from './ccfw-gtm';

ccfwGTM();

(function ($) {
    $(function ($) {
        const toggleButtons = $('.ccfw-banner__toggle-slider');
        const allowedIds = [];

        // collect ids
        toggleButtons.each(function(key, element){
            allowedIds.push($(element).data('allowlist'));
        });

        /**
         * Cache all available allowlist identifiers
         * @type {[]}
         */
        CCFW.allowedIds = allowedIds;

        $('.' + CCFW.selector.toggles).on('click', togglesChange);


        console.log(CCFW.storage.time.get());

        //CCFW.storage.clear('ccfw-gtm-allowed');

        /**
         * clearStorage checks if 1 year has past since the user first set their choices.
         */
        CCFW.clearStorage();

        console.log(allowedIds);
    });
})(jQuery);
