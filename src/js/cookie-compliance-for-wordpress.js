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
    const cookie_key_ga          = 'ccfw_wp_plugin.ga'
    const cookie_key_gtm         = 'ccfw_wp_plugin.gtm'

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
     *  Module to interact with Google Data Layer and setting Google cookie config
     *
     * */
    const googleAnalytics = {
      init: function () {},
      googleSetDataLayer: function (analytics,tagManager) {

        // Google Analytics value on or off
        if (analytics === 'on') {
          var boolGA = false
        } else if (analytics === 'off') {
          var boolGA = true
        }

        // Google Tag Manager value on or off
        if (tagManager === 'on') {
          var boolGTM = false
        } else if (tagManager === 'off') {
          var boolGTM = true
        }

        if (typeof ga === 'function') {
          ga(() => {
            // ga() function loads last, retrieve GA and GTM ID numbers
            var GA_ID = Object.keys(gaData)[0]
            var GTM_ID = Object.keys(google_tag_manager)[0]

            window['ga-disable-' + GA_ID] = boolGA
            window['ga-disable-' + GTM_ID] = boolGTM
          })
        }
      },
      googleSetCookie: function (analytics,tagManager) {
        utilities.setCookie(cookie_key_ga, analytics, 365)
        utilities.setCookie(cookie_key_gtm, tagManager, 365)
      }
     }

    /**
     *  Opt-out by default of all analytics/trackers
     *  on page load or first visit
     * */
    const optOutByDefault = {
      init: function () {
        this.loadGA()
      },
      loadGA: function () {
        if (utilities.getCookie(cookie_key_hide_banner) != 'true'){
          googleAnalytics.googleSetDataLayer('off', 'off')
          googleAnalytics.googleSetCookie('revoke', 'revoke')
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
        this.setBannerDisplay()
      },
      cacheDom: function () {
        this.$el = $('#ccfw-page-banner')
        this.$popup = $('#cookie-popup')
        this.$buttonaccept = this.$el.find('#cookie-accept')
        this.$buttondecline = this.$el.find('#cookie-decline')
        this.$buttoninfo = this.$el.find('#cookie-more-info')
        this.$buttonsavepreferences = this.$el.find('#cookie-save-preferences')
        this.$GAcheckbox = this.$el.find('#ccfw-ga-checkbox')
      },
      setBannerDisplay: function () {
        let cookieExists = utilities.checkForCookie(cookie_key_hide_banner)
        if (cookieExists === true) {
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
      },
      acceptAllButton: function () {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        googleAnalytics.googleSetDataLayer('on', 'on')
        googleAnalytics.googleSetCookie('accept', 'accept')
        this.hideBanner()
      },
      declineAllButton: function() {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        googleAnalytics.googleSetDataLayer('off', 'off')
        googleAnalytics.googleSetCookie('revoke', 'revoke')
        this.hideBanner()
      },
      viewMoreInfo: function () {
        if (this.$el.hasClass("cookie-banner-open")){
          this.$buttoninfo.attr('aria-expanded', 'false')
          this.$popup.hide()
          this.$el.removeClass("cookie-banner-open")
        }
        else {
          this.$buttoninfo.attr('aria-expanded', 'true')
          this.$popup.show()
          this.$el.addClass("cookie-banner-open")

          /*Trap focus */
          /* Based on Hidde de Vries' solution: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element */
          let focusableEls = $('#ccfw-page-banner a[href], #ccfw-page-banner details, #ccfw-page-banner button, #ccfw-page-banner input[type="checkbox"]')
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
        }

      },
      saveCookiePreferences: function () {
        let analyticsCookiesTurnedOn = this.$GAcheckbox.prop('checked')
        utilities.setCookie(cookie_key_hide_banner, 'true', 365)

        if (analyticsCookiesTurnedOn === true) {
          googleAnalytics.googleSetDataLayer('on', 'on')
          googleAnalytics.googleSetCookie('accept', 'accept')
        } else {
          googleAnalytics.googleSetDataLayer('off', 'off')
          googleAnalytics.googleSetCookie('revoke', 'revoke')
        }
        this.hideBanner()
      },
      hideBanner: function () {
        this.$el.hide()
        this.$el.removeClass("cookie-banner-open")
      }
    }

    /**
     *  Settings page where a user toggles tracking on/off
     * */
    const settingsPage = {
      init: function () {
          this.cacheDom()
          this.bindEvents()
          this.setPrevLink()
      },
      cacheDom: function () {
        this.$el = $('#ccfw-settings-page-container')
        this.$googleYes = this.$el.find('#ga-yes')
        this.$googleNo = this.$el.find('#ga-no')
        this.$saveBtn = this.$el.find('#save-changes-btn')
        this.$saveNoticeBanner = this.$el.find('#save-notice')
        this.$prevLink = this.$el.find('#prev-link')
      },
      setPrevLink: function () {
        let referrer = document.referrer
        if (referrer.length > 0) {
          this.$prevLink.attr('href', referrer)
        }
      },
      bindEvents: function () {
        this.$saveBtn.on('click', this.saveSettings.bind(this))
      },
      saveSettings: function () {
        /**
       *  Right now there is no distinction between
       *  GA and GTM both Google trackers here are checked on or off together.
       *  In the future we may want to refactor to check each individually.
       * */
        const googleButtonYes = this.$googleYes.prop('checked')
        const googleButtonNo = this.$googleNo.prop('checked')

        if (googleButtonYes === true) {
          googleAnalytics.googleSetDataLayer('on', 'on')
          googleAnalytics.googleSetCookie('accept', 'accept')
        } else if (googleButtonNo === true) {
          googleAnalytics.googleSetDataLayer('off', 'off')
          googleAnalytics.googleSetCookie('revoke', 'revoke')
        }

        utilities.setCookie(cookie_key_hide_banner, 'true', 365)
        this.displayNoticeBanner()
      },
      displayNoticeBanner: function () {
        this.$saveNoticeBanner.show()
        $(document).scrollTop(this.$saveNoticeBanner.offset().top)
        this.$saveNoticeBanner.focus()
      }
    }

    utilities.init()
    googleAnalytics.init()
    optOutByDefault.init()
    banner.init()
    settingsPage.init()
  })
})(jQuery)
