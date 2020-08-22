jQuery(function ($) {

    /**
     * This function is a setter and getter. On set it updates the browser history and returns the pathname + search
     * part of the URL. If no key is provided the funstion returns false. If a key with no value has been given, and
     * the query string parameter exists, the value is returned.
     *
     * @param key
     * @param value
     * @returns string|boolean false|pathname + query string
     */
    function mojQString(key, value)
    {
        var params = new URLSearchParams(window.location.search);

        if (!value && params.has(key)) {
            return params.get(key);
        }

        if (!key) {
            return false;
        }

        params.set(key, value);
        if (!window.history) {
            /* shhh */
        } else {
            window.history.replaceState({}, '', `${location.pathname}?${params}`);
        }

        return (window.location.pathname + window.location.search);
    }

    function setTab(tab)
    {
        var tabId, refererPath;

        if (!tab) {
            tab = $('.nav-tab-wrapper a').eq(0);
        } else {
            tab = $(".nav-tab-wrapper a[href='" + tab +"']");
        }

        if (!tab.attr('href')) {
            tab = $('.nav-tab-wrapper a').eq(0);
        }

        tabId = tab.attr('href').split('#')[1];

        tab.parent().find('a').removeClass('nav-tab-active');
        tab.addClass('nav-tab-active');

        $('.moj-component-settings-section').hide();
        $('div#' + tabId).fadeIn();

        // add to query string and update _wp_http_referer
        refererPath = mojQString('moj-tab', tabId);
        $('input[name="_wp_http_referer"]').val(refererPath);

        return false;
    }

    // only run JS on our settings page
    if ($('.settings_page_mojComponentSettings').length > 0) {
        $('.nav-tab-wrapper').on('click', 'a', function (e) {
            e.preventDefault();

            setTab($(this).attr('href'));
            return false;
        });

        // set the tab
        var mojTabSelected = mojQString('moj-tab');

        if (mojTabSelected) {
            setTab('#' + mojTabSelected);
        } else {
            setTab();
        }
    }
});
