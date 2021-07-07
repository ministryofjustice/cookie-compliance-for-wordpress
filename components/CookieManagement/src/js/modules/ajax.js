import { CCFW } from './global';

function sendCookies (data) {
    jQuery.ajax({
        type: 'POST',
        url: ajaxurl,
        data: { action: 'ccfw_cookie_store', payload: data },
        beforeSend: () => {
            // show whirligig
            jQuery('.ccfw-ajax').addClass('active').fadeIn('fast'); //animation
        }
    }).done(() => {
        // hide whirligig
        jQuery('.ccfw-ajax').fadeOut('fast', function(){
            jQuery(this).removeClass('active');
        });

        // all done, acknowledge sections are stored and submit the page again
        CCFW.sectionsStored = true;
        jQuery('#submit').click();

    }).fail((data) => {
        console.log(data);
    });
}

function getCookies () {
    jQuery.ajax({
        url: ajaxurl,
        data: { action: 'ccfw_cookie_get' }
    }).done((data) => {
        CCFW.sections = JSON.parse(data) || {};

        if (Object.keys(CCFW.sections).length > 0) {
            CCFW.sectionsLoaded = true;
        }

        CCFW.debug.output();
    });
}

const ajax = {
    post: (data) => sendCookies(data),
    get: () => getCookies()
};

export { ajax };
