import { CCFW, outputDebugInfo } from './global';

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
            $(this).removeClass('active');
        }); //animation
    }).fail((data) => {
        data = JSON.parse(data);
        console.log(data.reason)
    });
}

function getCookies () {
    jQuery.ajax({
        url: ajaxurl,
        data: { action: 'ccfw_cookie_get' }
    }).done((data) => {
        CCFW.sections = JSON.parse(data) || {};

        if (Object.keys(CCFW.sections).length > 0) {
            CCFW.sectionsLock = true;
        }

        outputDebugInfo();
    });
}

const ajax = {
    post: (data) => sendCookies(data),
    get: () => getCookies()
};

export { ajax };
