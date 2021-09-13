import { CCFW } from './ccfw-gtm';

(function ($) {
    'use strict';

    /**
     *  Define handlers for when the html/DOM is ready.
     * TODO: Target data attributes rather than CSS classes
     * */
    $(function ($) {
        // This is used so much make sure all modules use it to save calls to DOM
        const cacheMainElements = {
            init: function () {
                this.$el = $('#ccfw-page-banner');
                this.$body = $('body');
                this.$html = $('html');
            }
        };

        /**
         *  Helper functions for shared tasks
         * */
        const utilities = {
            init: function () {
                this.cacheDom();
                this.bindEvents();
            },
            cacheDom: function () {
                this.$el = cacheMainElements.$el;
                this.$settingsModal = this.$el.find('#cookie-popup');
                this.$body = cacheMainElements.$body;
                this.$html = cacheMainElements.$html;
                this.$cookieSettingsButton = this.$body.find('#js-ccfw-settings-button');
            },
            bindEvents: function () {
                this.$cookieSettingsButton.on('click', this.showBanner.bind(this));
            },
            showBanner: function () {
                this.$el.show();
                this.$cookieSettingsButton.hide();
                this.toggleAriaHidden(this.$el, 'hide');
            },
            hideBanner: function () {
                this.$el.hide();
                this.toggleAriaHidden(this.$el, 'show');
                this.$cookieSettingsButton.show();
            },
            hideSettingsModal: function () {
                this.$settingsModal.hide();
                this.$body.removeClass('ccfw-modal-open');
                this.$el.removeClass('ccfw-cookie-banner-open');
                this.$html.removeClass('ccfw-cookie-banner-open');
                this.$body.removeClass('ccfw-cookie-banner-open');
            },
            showSettingsModal: function () {
                this.$settingsModal.show();
                this.$body.addClass('ccfw-modal-open');
                this.$el.addClass('ccfw-cookie-banner-open');
                this.$html.addClass('ccfw-cookie-banner-open');
                this.$body.addClass('ccfw-cookie-banner-open');

                settingsModal.trapSettingsFocus();
                this.$el.scrollTop(0);

                // get allowed
                let allowList = CCFW.storage.allowed.get() || [];
                $('.' + CCFW.selector.toggles).each(function(key, element){
                    let allowed = $(element).data('allowlist');

                    if (allowList.indexOf(allowed) !== -1) {
                        $(element).attr('aria-checked', true);
                        $('#ccfw-' + allowed + '-toggle-on').removeAttr('aria-hidden').show();
                        $('#ccfw-' + allowed + '-toggle-off').attr('aria-hidden', 'true').hide();
                    } else {
                        $(element).attr('aria-checked', false);
                        $('#ccfw-' + allowed + '-toggle-off').removeAttr('aria-hidden').show();
                        $('#ccfw-' + allowed + '-toggle-on').attr('aria-hidden', 'true').hide();
                    }
                });
            },
            toggleAriaHidden: (elem, state) => {
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
                        elem.removeAttr('aria-hidden');
                    });
                } else {
                    siblings.forEach((sibling) => {
                        sibling.removeAttr('aria-hidden');
                    });
                }
            }
        };

        /**
         *  Banner management and control
         * */
        const banner = {
            init: function () {
                this.cacheDom();
                this.bindEvents();
                this.bannerDisplay();
            },
            cacheDom: function () {
                this.$el = cacheMainElements.$el;
                this.$buttonAccept = this.$el.find('#cookie-accept');
                this.$buttonDecline = this.$el.find('#cookie-decline');
                this.$buttonInfo = this.$el.find('#cookie-more-info');
            },
            bindEvents: function () {
                this.$buttonAccept.on('click', this.acceptAllButton.bind(this));
                this.$buttonDecline.on('click', this.declineAllButton.bind(this));
                this.$buttonInfo.on('click', this.chooseCookieSettingsButton.bind(this));
            },
            bannerDisplay: function () {
                if (!CCFW.storage.bannerHidden.get()) {
                    utilities.showBanner();
                    this.trapBannerFocus();
                } else {
                    utilities.hideBanner();
                }
            },
            trapBannerFocus: function () {
                let buttons = $('.ccfw-banner__buttons');
                let focusable = $('#cookie-accept, #cookie-decline, #cookie-more-info');
                let first = focusable[0];
                let last = focusable[focusable.length - 1];

                buttons.find('button').eq(0).focus();
                buttons.on('keydown', function (e) {
                    if (e.key !== 'Tab') {
                        return;
                    }
                    if (e.shiftKey) /* shift + tab */ {
                        if (document.activeElement === first) {
                            last.focus();
                            e.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === last) {
                            first.focus();
                            e.preventDefault();
                        }
                    }
                });
            },
            acceptAllButton: function () {
                CCFW.listItem.set(
                    CCFW.toggleAll(false)
                );
                CCFW.storage.time.set();
                CCFW.storage.bannerHidden.set(true);
                utilities.hideBanner();
                window.location.reload(false);
                return false;
            },
            declineAllButton: function () {
                CCFW.listItem.set(
                    CCFW.toggleAll(true)
                );
                CCFW.storage.bannerHidden.set(true);
                utilities.hideBanner();
            },
            chooseCookieSettingsButton: function () {
                utilities.showSettingsModal();
            }
        };

        const settingsModal = {
            init: function () {
                this.cacheDom();
                this.bindEvents();
            },
            cacheDom: function () {
                this.$el = cacheMainElements.$el;
                this.$settingsModal = this.$el.find('#cookie-popup');
                this.$buttonAccept = this.$settingsModal.find('#cookie-accept');
                this.$buttonDecline = this.$settingsModal.find('#cookie-decline');
                this.$buttonInfo = this.$settingsModal.find('#cookie-more-info');
                this.$buttonSavePreferences = this.$settingsModal.find('#cookie-save-preferences');
                this.$buttonModalClose = this.$settingsModal.find('#ccfw-modal-close');
                this.$body = cacheMainElements.$body;
            },
            bindEvents: function () {
                this.$buttonModalClose.on('click', this.modalDisplay.bind(this));
                this.$buttonInfo.on('click', this.trapSettingsFocus.bind(this));
                this.$buttonSavePreferences.on('click', this.saveCookiePreferences.bind(this))
            },
            modalDisplay: function () {
                utilities.hideSettingsModal();
            },
            trapSettingsFocus: function () {
                this.$settingsModal.focus();
                let focusable = $('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]');
                let first = focusable[0];
                let last = focusable[focusable.length - 1];

                this.$el.on('keydown', function (e) {
                    // Close banner if user presses escape key
                    if (e.key === 'Escape') {
                        utilities.hideSettingsModal();
                    }

                    if (e.key !== 'Tab') {
                        return;
                    }

                    if (e.shiftKey) /* shift + tab */ {
                        if (document.activeElement === first) {
                            last.focus();
                            e.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === last) {
                            first.focus();
                            e.preventDefault();
                        }
                    }
                });
            },
            saveCookiePreferences: function () {
                CCFW.storage.bannerHidden.set('true');
                CCFW.storage.time.set();
                utilities.hideBanner()
                utilities.hideSettingsModal()
                window.location.reload(false);
                return false;
            }
        };

        cacheMainElements.init();
        utilities.init();
        banner.init();
        settingsModal.init();
        CCFW.manageAll(CCFW.storage.allowed.get(), 'init', true)
    });
})(jQuery);
