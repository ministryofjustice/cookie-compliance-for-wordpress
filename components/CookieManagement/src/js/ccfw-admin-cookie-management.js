import { Launch } from './modules/app';
import { Icon } from './modules/icons';

// tooltips (with aria)
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


jQuery(function () {
    // FIRE!
    Launch();

    /**
     * The app is now visible on the front end
     * ... additional app interactions can be added below
     */

    // aesthetic: prepend a cookie icon to section title
    jQuery('h2:contains(Cookie Management Settings)').css({
        marginBottom: '1.68em'
    }).prepend(Icon.cookie(28));

    // tippy tooltips on app-info class elements
    tippy('.app-info', {
        aria: {
            content: 'describedby',
        },
        content: (reference) => reference.getAttribute('title'),
        offset: [-18, 10]
    });
});
