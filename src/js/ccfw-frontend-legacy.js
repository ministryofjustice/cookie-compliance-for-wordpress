(function ($) {
    'use strict'
    /**
     *  Define handlers when you need to maniplate late loading items such as images
     * */

    // $(window).on('load', function () {
    // place code here if you need to manipule a late loading object like images
    // })

    /**
     *  Define handlers for when the html/DOM is ready.
     *  Banner settings use cookies (rather than local storage) to make older browers < IE8 happy
     * TODO: Target data attributes rather than CSS classes
     * */
    $(function () {

        const cookie_key_banner_hidden = 'ccfw_wp_plugin.banner.hidden'
        const cookie_key_ga_accept   = 'ccfw_wp_plugin.ga.accept'

        // This is used so much make sure all modules use it to save calls to DOM
        const cacheMainElements = {
            init: function () {
                this.$el = $('#ccfw-page-banner')
                this.$body = $('body')
                this.$html = $('html')
            }
        }

        /**
         *  Helper functions for shared tasks
         * */
        const utilities = {
            init: function () {
                this.cacheDom()
                this.bindEvents()
            },
            cacheDom: function () {
                this.$el = cacheMainElements.$el
                this.$settingsModal = this.$el.find('#cookie-popup')
                this.$body = cacheMainElements.$body
                this.$html = cacheMainElements.$html
                this.$cookieSettingsButton = this.$body.find('#js-ccfw-settings-button')
            },
            bindEvents: function () {
                this.$cookieSettingsButton.on('click', this.showBanner.bind(this))
            },
            getCookie: function (name) {
                var value = '; ' + document.cookie
                var parts = value.split('; ' + name + '=')
                if (parts.length === 2) {
                    return parts.pop().split(';').shift()
                }
            },
            setCookie: function (name, value, days) {
                var d = new Date()
                d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
                document.cookie = name + '=' + value + '; path=/; expires=' + d.toGMTString()
            },
            deleteCookie: function (name) {
                document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            },
            checkForCookie: function (key) {
                let cookie = this.getCookie(key)
                let bool = cookie === undefined ? false : true
                return bool
            },
            showBanner: function () {
                this.$el.show()
                this.$cookieSettingsButton.hide()
                this.toggleAriaHidden(this.$el, "hide")
            },
            hideBanner: function () {
                this.$el.hide()
                this.toggleAriaHidden(this.$el, "unhide")
                this.$cookieSettingsButton.show()
            },
            hideSettingsModal: function () {
                this.$settingsModal.hide()
                this.$body.removeClass("ccfw-modal-open")
                this.$el.removeClass("ccfw-cookie-banner-open")
                this.$html.removeClass("ccfw-cookie-banner-open")
                this.$body.removeClass("ccfw-cookie-banner-open")
            },
            showSettingsModal: function () {
                this.$settingsModal.show()
                this.$body.addClass("ccfw-modal-open")
                this.$el.addClass("ccfw-cookie-banner-open")
                this.$html.addClass("ccfw-cookie-banner-open")
                this.$body.addClass("ccfw-cookie-banner-open")
                if (utilities.checkForCookie(cookie_key_ga_accept)) {
                    settingsModal.$GAcheckBox.attr("aria-checked", true);
                }
                settingsModal.trapSettingsFocus();

                let pressed = settingsModal.$GAcheckBox.attr("aria-checked") === "true";

                if (pressed) {
                    settingsModal.$gaToggleOnText.show()
                    settingsModal.$gaToggleOffText.hide()
                } else {
                    settingsModal.$gaToggleOffText.show()
                    settingsModal.$gaToggleOnText.hide()
                }
            },
            toggleAriaHidden: function (elem, state) {
                var siblings = [];
                var sibling = elem.parent().children();

                while (sibling) {
                    if (sibling !== elem) {
                        siblings.push(sibling);
                    }
                    sibling = sibling.nextSibling
                }

                if (state === "hide") {
                    siblings.forEach(function (sibling) {
                        sibling.attr("aria-hidden", "true")
                        elem.removeAttr("aria-hidden", "true")
                    })
                } else {
                    siblings.forEach(function (sibling) {
                        sibling.removeAttr("aria-hidden", "true")
                    })
                }
            }
        }

        /**
         *  Banner management and control
         * */
        const banner = {
            init: function () {
                this.cacheDom()
                this.bindEvents()
                this.bannerDisplay()
            },
            cacheDom: function () {
                this.$el = cacheMainElements.$el
                this.$buttonAccept = this.$el.find('#cookie-accept')
                this.$buttonDecline = this.$el.find('#cookie-decline')
                this.$buttonInfo = this.$el.find('#cookie-more-info')
            },
            bindEvents: function () {
                this.$buttonAccept.on('click', this.acceptAllButton.bind(this))
                this.$buttonDecline.on('click', this.declineAllButton.bind(this))
                this.$buttonInfo.on('click', this.chooseCookieSettingsButton.bind(this))
            },
            bannerDisplay: function () {
                if (utilities.checkForCookie(cookie_key_banner_hidden) === false) {
                    utilities.showBanner()
                    this.trapBannerFocus()
                } else {
                    utilities.hideBanner()
                }
            },
            trapBannerFocus: function () {
                let cookieBannerButtons = $('.ccfw-banner__buttons')
                let focusableEls = $('.ccfw-banner__buttons #cookie-accept, .ccfw-banner__buttons #cookie-decline, .ccfw-banner__buttons #cookie-more-info')

                let firstFocusableEl = focusableEls[0];
                let lastFocusableEl = focusableEls[focusableEls.length - 1];

                cookieBannerButtons.on('keydown', function (e) {
                    var isTabPressed = (e.key === 'Tab');

                    if (!isTabPressed) {
                        return;
                    }
                    if (e.shiftKey) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus()
                            e.preventDefault()
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus()
                            e.preventDefault()
                        }
                    }
                })
            },
            acceptAllButton: function () {
                utilities.setCookie(cookie_key_banner_hidden, 'true', 365)
                utilities.setCookie(cookie_key_ga_accept, 'true', 365)
                utilities.hideBanner()
            },
            declineAllButton: function() {
                utilities.setCookie(cookie_key_banner_hidden, 'true', 365)
                utilities.deleteCookie(cookie_key_ga_accept)
                utilities.hideBanner()
            },
            chooseCookieSettingsButton: function() {
                utilities.showSettingsModal()
            }
        }

        const settingsModal = {
            init: function () {
                this.cacheDom()
                this.bindEvents()
            },
            cacheDom: function () {
                this.$el = cacheMainElements.$el
                this.$settingsModal = this.$el.find('#cookie-popup')
                this.$buttonAccept = this.$settingsModal.find('#cookie-accept')
                this.$buttonDecline = this.$settingsModal.find('#cookie-decline')
                this.$buttonInfo = this.$settingsModal.find('#cookie-more-info')
                this.$buttonSavePreferences = this.$settingsModal.find('#cookie-save-preferences')
                this.$GAcheckBox = this.$settingsModal.find('#ccfw-analytics-cookies-toggle')
                this.$buttonModalClose = this.$settingsModal.find('#ccfw-modal-close')
                this.$body = cacheMainElements.$body
                this.$gaToggleOnText = this.$settingsModal.find('#ccfw-ga-toggle-on')
                this.$gaToggleOffText = this.$settingsModal.find('#ccfw-ga-toggle-off')
            },
            bindEvents: function () {
                this.$buttonModalClose.on('click', this.modalDisplay.bind(this))
                this.$buttonInfo.on('click', this.trapSettingsFocus.bind(this))
                this.$buttonSavePreferences.on('click', this.saveCookiePreferences.bind(this))
                this.$GAcheckBox.on('click', this.toggleAriaPressed.bind(this))
            },
            modalDisplay: function () {
                utilities.hideSettingsModal()
            },
            toggleAriaPressed: function () {
                let pressed = this.$GAcheckBox.attr("aria-checked") === "true";
                this.$GAcheckBox.attr("aria-checked", !pressed);

                if (!pressed) {
                    this.$gaToggleOnText.show()
                    this.$gaToggleOffText.hide()
                } else {
                    this.$gaToggleOffText.show()
                    this.$gaToggleOnText.hide()
                }
            },
            trapSettingsFocus: function () {
                this.$settingsModal.focus()

                /*Trap focus */
                /* Based on Hidde de Vries' solution: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element */
                let focusableEls = $('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]')
                let firstFocusableEl = focusableEls[0];
                let lastFocusableEl = focusableEls[focusableEls.length - 1];

                this.$el.on('keydown', function (e) {
                    // Close banner if user presses escape key
                    if (e.key === 'Escape') {
                        utilities.hideSettingsModal()
                    }

                    var isTabPressed = (e.key === 'Tab');

                    if (!isTabPressed) {
                        return;
                    }

                    if (e.shiftKey) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus()
                            e.preventDefault()
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus()
                            e.preventDefault()
                        }
                    }
                })
            },
            saveCookiePreferences: function () {
                let analyticsCookiesTurnedOn = this.$GAcheckBox.attr("aria-checked") === "true";

                if (analyticsCookiesTurnedOn === true) {
                    utilities.setCookie(cookie_key_ga_accept, 'true', 365)
                }

                if (analyticsCookiesTurnedOn === false) {
                    // GA - If present remove GA cookie, otherwise do nothing, default is GA off
                    if (utilities.checkForCookie(cookie_key_ga_accept)) {
                        utilities.deleteCookie(cookie_key_ga_accept)
                    }
                }

                utilities.setCookie(cookie_key_banner_hidden, 'true', 365)
                utilities.hideBanner()
                utilities.hideSettingsModal()
            },
        }

        cacheMainElements.init()
        utilities.init()
        banner.init()
        settingsModal.init()
    })
})(jQuery);
