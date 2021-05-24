import { CCFW, makeDebugContainer } from './modules/global';
import { Init } from './modules/app';

// tooltips (with aria)
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


jQuery(function ($) {
    let appContainer = $('#' + CCFW.appContainer);
    appContainer.html(Init());

    /**
     * additional app related interactions below
     */

    // whirligig
    appContainer.prepend('<div class="ccfw-ajax"> <div class="loader"> </div> </div>');

    // tippy tooltips on app-info class elements
    tippy('.app-info', {
        aria: {
            content: 'describedby',
        },
        content: (reference) => reference.getAttribute('title'),
        offset: [-18, 10]
    });

    // shall we debug?
    if ($('#' + CCFW.debug.checkbox).is(':checked')) {
        CCFW.debug.active = true;
        makeDebugContainer();
    }
});
