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
    const cookie_key_ga_reject   = 'ccfw_wp_plugin.ga.reject'

   /**
   *  Helper functions for shared tasks
   * */
    const utilities = {
      init: function () {},
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
        var d = new Date()
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 365)
        document.cookie = name +'=; Path=/; expires=' + d.toGMTString()
      },
      checkForCookie: function (key) {
        let cookie = this.getCookie(key)
        if (cookie === undefined) {
          var bool = false
        } else {
          var bool = true
        }
        return bool
      }
    }

    /**
     *  Banner management and control
     * */
    const banner = {
      init: function () {
        this.cacheDom()
        this.bindEvents()
        this.setBannerDisplay()
      },
      cacheDom: function () {
        this.$el = $('#ccfw-page-banner')
        this.$popup = $('#cookie-popup')
        this.$buttonaccept = this.$el.find('#cookie-accept')
        this.$buttondecline = this.$el.find('#cookie-decline')
        this.$buttoninfo = this.$el.find('#cookie-more-info')
        this.$buttonsavepreferences = this.$el.find('#cookie-save-preferences')
        this.$GAcheckbox = this.$el.find('#ccfw-ga-toggle')
        this.$buttonmodalclose = this.$el.find('#ccfw-modal-close')
        this.$body = $('body')
      },
      setBannerDisplay: function () {
        if (utilities.checkForCookie(cookie_key_hide_banner) === true) {
          this.$el.hide()
        } else {
          this.$el.show()
        }
      },
      bindEvents: function () {
        this.$buttonaccept.on('click', this.acceptAllButton.bind(this))
        this.$buttondecline.on('click', this.declineAllButton.bind(this))
        this.$buttoninfo.on('click', this.viewMoreInfo.bind(this))
        this.$buttonsavepreferences.on('click', this.saveCookiePreferences.bind(this))
        this.$buttonmodalclose.on('click', this.closeModal.bind(this))
      },
      acceptAllButton: function () {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        utilities.setCookie(cookie_key_ga_accept, 'true', 365)
        this.hideBanner()
      },
      declineAllButton: function() {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        utilities.setCookie(cookie_key_ga_reject, 'true', 365)
        this.hideBanner()
      },
      viewMoreInfo: function () {
        this.$buttoninfo.attr('aria-expanded', 'true')
        this.$popup.show()
        this.$el.addClass("cookie-banner-open")
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
      closeModal: function () {
        this.$buttoninfo.attr('aria-expanded', 'false')
        this.$popup.hide()
        this.$el.removeClass("cookie-banner-open")
        this.$body.removeClass("ccfw-modal-open")
        this.$el.removeClass("cookie-banner-open")
        this.$popup.hide()
      },
      saveCookiePreferences: function () {
        let analyticsCookiesTurnedOn = this.$GAcheckbox.prop('checked')

        console.log(analyticsCookiesTurnedOn)

        utilities.setCookie(cookie_key_hide_banner, 'true', 365)

        if (analyticsCookiesTurnedOn === true) {
          utilities.setCookie(cookie_key_ga_accept, 'true', 365)
        }

        if (analyticsCookiesTurnedOn === false) {
          utilities.setCookie(cookie_key_ga_reject, 'true', 365)
        }

        this.closeModal()
        this.hideBanner()
      },
      hideBanner: function () {
        this.$el.hide()
        this.$el.removeClass("cookie-banner-open")
      }
    }

    utilities.init()
    banner.init()
  })
})(jQuery)
