/**
 * A dataLayer management script for GTM
 *
 * First step; define some settings
 */
const CCFW = {
    gtmID: ('; ' + document.cookie).split('; ccfw_gtm_id=').pop().split(';').shift(),
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
            get: () => JSON.parse(localStorage.getItem('ccfw-time')),
            set: () => localStorage.setItem(
                'ccfw-time',
                JSON.stringify(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime())
            )
        },
        allowed: {
            get: () => JSON.parse(localStorage.getItem('ccfw-gtm-allowed')),
            set: (value) => localStorage.setItem('ccfw-gtm-allowed', JSON.stringify(value))
        },
        bannerDisplay: {
            get: () => JSON.parse(localStorage.getItem('ccfw-banner-visibility')),
            set: (value) => localStorage.setItem('ccfw-banner-visibility', JSON.stringify(value))
        },
        clear: (key) => localStorage.removeItem(key)
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
        return $(event.target);
    },
    /**
     * Runs on load
     */
    clearStorage: () => {
        let stored = CCFW.storage.time.get(); // always a year from storage
        let now = new Date().getTime();

        if (now > stored) { // a year has past
            CCFW.storage.clear('ccfw-gtm-allowed');
            CCFW.storage.clear('ccfw-banner-visibility');
            CCFW.storage.clear('ccfw-time');
        }
    }
};

const ccfwGTM = () => {
    if (CCFW.canRun(CCFW.gtmID)) {
        window.dataLayer = [];
        // INIT - use existing list if present
        let allowedList = CCFW.storage.allowed.get();
        if (Array.isArray(allowedList)) {
            console.log('Allowed List', allowedList);
            window.dataLayer = [{
                'gtm.allowlist': allowedList
            }];
        }

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
    } else {
        console.warn('CCFW GTM:', 'The GTM ID wasn\'t assigned or, does not exist.');
    }
}

const togglesChange = function (e) {
    e.preventDefault();
    let toggle = $(this);
    let allowed = toggle.data('allowlist');
    let allowList = CCFW.storage.allowed.get() || [];
    let pressed = toggle.attr('aria-checked') === 'true';
    toggle.attr('aria-checked', !pressed);

    if (allowed === 'all') {
        allowList = toggleAll(pressed);
    }

    if (pressed) {
        allowList = allowList.filter(item => item !== allowed);
        $('#ccfw-' + allowed + '-toggle-off').removeAttr('aria-hidden').show();
        $('#ccfw-' + allowed + '-toggle-on').attr('aria-hidden', 'true').hide();
    } else {
        if (allowList.indexOf(allowed) === -1) {
            allowList.push(allowed);
        }
        $('#ccfw-' + allowed + '-toggle-on').removeAttr('aria-hidden').show();
        $('#ccfw-' + allowed + '-toggle-off').attr('aria-hidden', 'true').hide();
    }

    CCFW.listItem.set(allowList);
    console.log(allowList);

    return false;
};

/**
 * @param remove acknowledges that we are removing all allowed ids
 */
function toggleAll(remove) {
    let allowList = CCFW.storage.allowed.get() || [];

    if (remove) {
        allowList = [];
    }

    $('.' + CCFW.selector.toggles).each(function(key, element){
        let allowed = $(element).data('allowlist');

        if (remove) {
            $(element).attr('aria-checked', false);
            $('#ccfw-' + allowed + '-toggle-off').removeAttr('aria-hidden').show();
            $('#ccfw-' + allowed + '-toggle-on').attr('aria-hidden', 'true').hide();
        } else {
            if (allowList.indexOf(allowed) === -1) {
                allowList.push(allowed);
            }
            $(element).attr('aria-checked', true);
            $('#ccfw-' + allowed + '-toggle-on').removeAttr('aria-hidden').show();
            $('#ccfw-' + allowed + '-toggle-off').attr('aria-hidden', 'true').hide();
        }
    });

    return allowList;
}

const toggleAriaHidden = (elem, state) => {
    let siblings = [];
    let sibling = elem.parent().children();

    while (sibling) {
        if (sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    if (state === 'hide') {
        siblings.forEach((sibling) => {
            sibling.attr('aria-hidden', 'true');
            elem.removeAttr('aria-hidden', 'true');
        });
    } else {
        siblings.forEach((sibling) => {
            sibling.removeAttr('aria-hidden', 'true');
        });
    }
};

export { CCFW, ccfwGTM, togglesChange };
