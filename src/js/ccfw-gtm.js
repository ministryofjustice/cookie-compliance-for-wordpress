/**
 * A dataLayer management script for GTM
 *
 * First step; define some settings
 */
const CCFW = {
    gtm: ('; ' + document.cookie).split('; ccfw_gtm_id=').pop().split(';').shift(),
    gtmID: document.getElementById('ccfw-page-banner').getAttribute('data-gtm-id'),
    canRun: (id) => id.startsWith('GTM') || false,
    allowedIds: [],
    selector: {
        all: {
            accept: 'cookie-accept',
            decline: 'cookie-decline'
        },
        moreInfo: 'cookie-more-info',
        settings: 'js-ccfw-settings-button',
        toggles: 'ccfw-banner__toggle-slider'
    },
    storage: {
        time: {
            get: () => JSON.parse(window.localStorage.getItem('ccfw-time')),
            set: () => window.localStorage.setItem(
                'ccfw-time',
                JSON.stringify(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime())
            )
        },
        allowed: {
            get: () => JSON.parse(window.localStorage.getItem('ccfw-gtm-allowed')),
            set: (value) => window.localStorage.setItem('ccfw-gtm-allowed', JSON.stringify(value))
        },
        bannerHidden: {
            get: () => JSON.parse(window.localStorage.getItem('ccfw-banner-hidden')),
            set: (value) => window.localStorage.setItem('ccfw-banner-hidden', JSON.stringify(value))
        },
        clear: (key) => window.localStorage.removeItem(key)
    },
    listItem: {
        set: (value) => {
            dataLayer[0]['gtm.allowlist'] = value;
            /*console.log(dataLayer);*/
            CCFW.storage.allowed.set(value);
        },
        clear: (key, value) => {
            dataLayer[0][key].forEach((element, index, array) => {
                if (element === value) {
                    array.splice(index, 1);
                }
            });
        }
    },
    /**
     * Wrap the dataLayer.push function
     * @param event
     * @param object
     * @private
     */
    trackEvent: (event, object) => {
        if (!object) {
            dataLayer.push({ 'event': event });
            return;
        }
        dataLayer.push(jQuery.extend({}, { 'event': event }, object));
    },
    /**
     * Determine exactly what element was clicked and return its jQuery equivalent
     * @param event
     * @returns {jQuery|HTMLElement}
     * @private
     */
    jqTarget: function (event) {
        return jQuery(event.target);
    },
    /**
     * Runs on load
     */
    clearStorage: () => {
        let stored = CCFW.storage.time.get(); // always a year from storage
        let now = new Date().getTime();

        if (now > stored) { // a year has past
            CCFW.storage.clear('ccfw-gtm-allowed');
            CCFW.storage.clear('ccfw-banner-hidden');
            CCFW.storage.clear('ccfw-time');
        }
    },

    /**
     * @param remove acknowledges that we are removing all allowed ids
     */
    toggleAll: function (remove) {
        let allowList = CCFW.storage.allowed.get() || [];

        if (remove) {
            allowList = [];
        }

        jQuery('.' + CCFW.selector.toggles).each(function (key, element) {
            let allowed = jQuery(element).data('allowlist');

            if (remove) {
                jQuery(element).attr('aria-checked', false);
                jQuery('#ccfw-' + allowed + '-toggle-off').removeAttr('aria-hidden').show();
                jQuery('#ccfw-' + allowed + '-toggle-on').attr('aria-hidden', 'true').hide();
            } else {
                if (allowList.indexOf(allowed) === -1) {
                    allowList.push(allowed);
                }
                jQuery(element).attr('aria-checked', true);
                jQuery('#ccfw-' + allowed + '-toggle-on').removeAttr('aria-hidden').show();
                jQuery('#ccfw-' + allowed + '-toggle-off').attr('aria-hidden', 'true').hide();
            }
        });

        return allowList;
    },
    manageAll: (allowList, allowed, pressed) => {
        if (!allowList) {
            return;
        }

        let totalAllowed = jQuery('.' + CCFW.selector.toggles).length - 1;

        if (allowed !== 'all') {
            if (pressed) {
                allowList = allowList.filter(item => item !== 'all');
                jQuery('#ccfw-all-toggle-off').removeAttr('aria-hidden').show();
                jQuery('#ccfw-all-toggle-on').attr('aria-hidden', 'true').hide();
                if (allowList.length === 0) {
                    jQuery('button[data-allowlist="all"]').attr('aria-checked', false);
                }
            }

            if (allowList.length > 0) {
                jQuery('button[data-allowlist="all"]').attr('aria-checked', true);
            }

            if (totalAllowed === allowList.length) {
                if (allowList.indexOf('all') === -1) {
                    allowList.push('all');
                }
                jQuery('#ccfw-all-toggle-on').removeAttr('aria-hidden').show();
                jQuery('#ccfw-all-toggle-off').attr('aria-hidden', 'true').hide();
                jQuery('button[data-allowlist="all"]').attr('aria-checked', true);
            }
        }

        return allowList;
    }
};

const ccfwGTM = () => {
    if (CCFW.canRun(CCFW.gtmID)) {
        window.dataLayer = [];

        // INIT
        // use existing list if present
        // default to empty array if not
        let allowedList = CCFW.storage.allowed.get() || []; // default to empty array

        //Always allow variables and triggers - https://developers.google.com/tag-manager/web/restrict
        let ccfwTriggers = ['evl', 'cl', 'fsl', 'hl', 'jel', 'lcl', 'sdl', 'tl', 'ytl'];
        let ccfwVariables = ['k', 'v', 'c', 'ctv', 'e', 'jsm', 'dpg', 'd', 'vis', 'gas', 'f', 'j', 'smm', 'r', 'remm', 'u'];

        allowedList = allowedList.concat(ccfwTriggers, ccfwVariables);

        window.dataLayer = [{
            'gtm.allowlist': allowedList
        }];

        // Drop GTM code
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            });
            let f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', CCFW.gtmID);
        return true;
    } else {
        console.warn('CCFW GTM:', 'The GTM ID wasn\'t assigned or, does not exist.');
        return false;
    }
};

const togglesChange = function (e) {
    e.preventDefault();
    let toggle = jQuery(this);
    let allowed = toggle.data('allowlist');
    let allowList = CCFW.storage.allowed.get() || [];
    let pressed = toggle.attr('aria-checked') === 'true';
    toggle.attr('aria-checked', !pressed);

    if (allowed === 'all') {
        allowList = CCFW.toggleAll(pressed);
    }

    if (pressed) {
        allowList = allowList.filter(item => item !== allowed);
        jQuery('#ccfw-' + allowed + '-toggle-off').removeAttr('aria-hidden').show();
        jQuery('#ccfw-' + allowed + '-toggle-on').attr('aria-hidden', 'true').hide();
    } else {
        if (allowList.indexOf(allowed) === -1) {
            allowList.push(allowed);
        }
        jQuery('#ccfw-' + allowed + '-toggle-on').removeAttr('aria-hidden').show();
        jQuery('#ccfw-' + allowed + '-toggle-off').attr('aria-hidden', 'true').hide();
    }

    allowList = CCFW.manageAll(allowList, allowed, pressed);

    CCFW.listItem.set(allowList);

    return false;
};

export { CCFW, ccfwGTM, togglesChange };
