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

        $('.' + CCFW.selector.toggles).on('click', togglesChange);


        console.log(CCFW.storage.time.get());

        //CCFW.storage.clear('ccfw-gtm-allowed');

        CCFW.clearStorage();

        CCFW.allowedIds = allowedIds;

        console.log(allowedIds);
    });
})(jQuery);
