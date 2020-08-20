;(function ($) {
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

    const cookie_key_hide_banner = 'ccfw_wp_plugin.hide_banner'
    const cookie_key_ga_accept   = 'ccfw_wp_plugin.ga.accept'

    // This is used so much make sure all modules use it to save calls to DOM
    const cacheMainElement = {
      init: function () {
        this.$el = $('#ccfw-page-banner')
      }
    }

   /**
   *  Helper functions for shared tasks
   * */
    const utilities = {
      init: function () {
        this.cacheDom()
      },
      cacheDom: function () {
        this.$el = cacheMainElement.$el
        this.$settingsModal = this.$el.find('#cookie-popup')
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
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      },
      checkForCookie: function (key) {
        let cookie = this.getCookie(key)
        let bool = cookie === undefined ? false : true
        return bool
      },
      hideBanner: function () {
        this.$el.hide()
      },
      hideSettingsModal: function () {
        this.$settingsModal.hide()
      },
      showSettingsModal: function () {
        this.$settingsModal.show()
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
        this.$el = cacheMainElement.$el
        this.$buttonaccept = this.$el.find('#cookie-accept')
        this.$buttondecline = this.$el.find('#cookie-decline')
        this.$buttoninfo = this.$el.find('#cookie-more-info')
      },
      bannerDisplay: function () {
        if (utilities.checkForCookie(cookie_key_hide_banner) === true) {
          utilities.hideBanner()
        } else {
          this.$el.show()
        }
      },
      bindEvents: function () {
        this.$buttonaccept.on('click', this.acceptAllButton.bind(this))
        this.$buttondecline.on('click', this.declineAllButton.bind(this))
        this.$buttoninfo.on('click', this.chooseCookieSettingsButton.bind(this))
      },
      acceptAllButton: function () {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        utilities.setCookie(cookie_key_ga_accept, 'true', 365)
        utilities.hideBanner()
      },
      declineAllButton: function() {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)

        // GA - If present remove GA cookie, otherwise do nothing, default is GA off
        if (utilities.checkForCookie(cookie_key_ga_accept)) {
          utilities.deleteCookie(cookie_key_ga_accept)
        }
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
        this.$el = cacheMainElement.$el
        this.$settingsModal = this.$el.find('#cookie-popup')
        this.$buttonaccept = this.$settingsModal.find('#cookie-accept')
        this.$buttondecline = this.$settingsModal.find('#cookie-decline')
        this.$buttoninfo = this.$settingsModal.find('#cookie-more-info')
        this.$buttonsavepreferences = this.$settingsModal.find('#cookie-save-preferences')
        this.$GAcheckbox = this.$settingsModal.find('#ccfw-ga-toggle')
        this.$buttonmodalclose = this.$settingsModal.find('#ccfw-modal-close')
        this.$body = $('body')
      },
      bindEvents: function () {
        this.$buttoninfo.on('click', this.viewMoreInfo.bind(this))
        this.$buttonsavepreferences.on('click', this.saveCookiePreferences.bind(this))
        this.$buttonmodalclose.on('click', this.modalDisplay.bind(this))
      },
      modalDisplay: function () {
        utilities.hideSettingsModal()
      },
      viewMoreInfo: function () {
        this.$buttoninfo.attr('aria-expanded', 'true')
        utilities.showSettingsModal()
        this.$body.addClass("ccfw-modal-open")

        /*Trap focus */
        /* Based on Hidde de Vries' solution: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element */
        let focusableEls = $('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]')
        let firstFocusableEl = focusableEls[0];
        let lastFocusableEl = focusableEls[focusableEls.length - 1];

        this.$el.on('keydown', function (e) {
          var isTabPressed = (e.key === 'Tab');

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus();
            }
          } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
              firstFocusableEl.focus();
            }
          }
        })
      },
      saveCookiePreferences: function () {
        let analyticsCookiesTurnedOn = this.$GAcheckbox.prop('checked')

        if (analyticsCookiesTurnedOn === true) {
          utilities.setCookie(cookie_key_ga_accept, 'true', 365)
        }

        if (analyticsCookiesTurnedOn === false) {
           // GA - If present remove GA cookie, otherwise do nothing, default is GA off
          if (utilities.checkForCookie(cookie_key_ga_accept)) {
            utilities.deleteCookie(cookie_key_ga_accept)
          }
        }

        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        utilities.hideBanner()
        utilities.hideSettingsModal()
      },
    }

    cacheMainElement.init()
    utilities.init()
    banner.init()
    settingsModal.init()
  })
})(jQuery)
