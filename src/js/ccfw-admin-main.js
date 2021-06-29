jQuery(function ($) {

    /**
     * This function is a setter and getter. On set it updates the browser history and returns the pathname + search
     * part of the URL. If no key is provided the function returns false. If a key with no value has been given, and
     * the query string parameter exists, the value is returned.
     *
     * @param key
     * @param value
     * @returns string|boolean false|pathname + query string
     */
    function ccfwQString (key, value) {
        let params = new URLSearchParams(window.location.search);

        if (!value && params.has(key)) {
            return params.get(key);
        }

        if (!key) {
            return false;
        }

        params.set(key, value);
        if (!window.history) {
            /* shh */
        } else {
            window.history.replaceState({}, '', `${location.pathname}?${params}`);
        }

        return (window.location.pathname + window.location.search);
    }

    function _ccfwSwitchTab(e) {
        e.preventDefault();

        setTab($(this).attr('href'));
        return false;
    }

    function setTab (tab) {
        let tabId, refererPath, anchors = $('.nav-tab-wrapper a');

        tab = !tab
            ? anchors.eq(0)
            : $('.nav-tab-wrapper a[href=\'' + tab + '\']');

        if (!tab.attr('href')) {
            tab = anchors.eq(0);
        }

        tabId = tab.attr('href').split('#')[1];

        tab.parent().find('a').removeClass('nav-tab-active');
        tab.addClass('nav-tab-active');

        $('.ccfw-component-settings-section').hide();
        $('div#' + tabId).fadeIn();

        // add to query string and update _wp_http_referer
        refererPath = ccfwQString('ccfw-tab', tabId);
        $('input[name="_wp_http_referer"]').val(refererPath);

        return false;
    }

    // only run JS on our settings page
    if ($('.settings_page_cookie-compliance-for-wordpress-settings').length > 0) {
        $('.nav-tab-wrapper').on('click', 'a', _ccfwSwitchTab);
        $('.ccfw-inline-tab-link').on('click', _ccfwSwitchTab);

        // set the tab
        let ccfwTabSelected = ccfwQString('ccfw-tab');
        setTab(ccfwTabSelected ? '#' + ccfwTabSelected : null);
    }
});

// polyfill Object.entries
if (!Object.entries) {
    Object.entries = function( obj ){
        let ownProps = Object.keys( obj ),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}
