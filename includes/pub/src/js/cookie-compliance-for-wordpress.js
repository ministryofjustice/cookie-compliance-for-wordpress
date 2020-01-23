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
   *  Banner settings use local storage but with cookies as a fall back for older browers < IE8
   * */
  $(function () {
    /**
     *  Utilities - helper functions for shared tasks
     * */
    var utilities = {
      init: function () {
        this.storageAvailable()
      },
      // Run a small test to determine if the browser can use local storage functionality if not use browser cookies
      storageAvailable: function (type) {
        try {
          var storage = window[type]
          var x = '__storage_test__'
          storage.setItem(x, x)
          storage.removeItem(x)
          return true
        } catch (e) {
          return false
        }
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
      }
    }

    /**
     *  Top of page banner - controls the display of the cookie banner
     * */
    var cookieBanner = {

      init: function () {
        this.cacheDom()
        this.bindEvents()
        this.setBannerDisplay()
      },
      cacheDom: function () {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage = window.localStorage
        }
        this.$el = $('#ccfw-page-banner-container')
        this.$buttonAccept = this.$el.find('button')
      },
      setBannerDisplay: function () {
        if (utilities.storageAvailable('localStorage')) {
          var getValueFromLocalStorage = this.localStorage.getItem('ccfwCookiePolicy')
          var getValueFromLocalStorageBool = getValueFromLocalStorage || false
        } else {
          var getValueFromCookie = utilities.getCookie('ccfwCookiePolicy')
          var getValueFromCookieBool = getValueFromCookie || false
        }

        if ((getValueFromLocalStorageBool || getValueFromCookieBool) === 'true') {
          $('#ccfw-page-banner-container').hide()
        } else {
          $('#ccfw-page-banner-container').show()
        }
      },
      bindEvents: function () {
        this.$buttonAccept.on('click', this.hideBanner.bind(this))
      },
      hideBanner: function () {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicy', 'true')
          this.$el.hide()
        } else {
          this.$el.hide()
          utilities.setCookie('ccfwCookiePolicy', 'true', 365)
        }
      }
    }
    /**
     *  Cookie policy setting page - JS that controls the toggling of privacy/cookie settings
     * */
    var cookiePageSettings = {

      init: function () {
        this.cacheDom()
        this.bindEvents()
        this.disableEnableGA()
      },
      cacheDom: function () {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage = window.localStorage
        }
        this.$el = $('#ccfw-settings-page-container')
        this.$googleYes = this.$el.find('#ga-yes')
        this.$googleNo = this.$el.find('#ga-no')
      },
      bindEvents: function () {
        this.$googleNo.on('click', this.setGACookieTrue.bind(this))
        this.$googleYes.on('click', this.setGACookieFalse.bind(this))
      },
      setGACookieTrue: function () {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicy', 'true')
        } else {
          utilities.setCookie('ccfwCookiePolicy', 'true', 365)
        }
      },
      setGACookieFalse: function () {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicy', 'false')
        } else {
          utilities.setCookie('ccfwCookiePolicy', 'false', 365)
        }
      },
      setCookie: function (name, value, days) {
        var d = new Date()
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
        document.cookie = name + '=' + value + '; path=/; expires=' + d.toGMTString()
      },
      disableEnableGA: function () {
        // get the set cookie value (true or false)
        if (utilities.storageAvailable('localStorage')) {
          var lStorage = this.localStorage.getItem('ccfwCookiePolicy')
        } else {
          // Older browser support < IE8
          var cStorage = utilities.getCookieValue('ccfwCookiePolicy')
        }

        // return true or false depending on what was clicked
        var x = ((lStorage || cStorage) === 'true')

        // set CSS button to what was selected
        if (x === true) {
          x = true
          this.$googleNo.prop('checked', true)
        } else {
          x = false
          this.$googleYes.prop('checked', true)
        }

        // Set the Google Analytic method to true or false where x === true or false
        // True === Google is disabled & False === Google is kept on
        if (typeof ga === 'function') {
          ga(
            function (tracker) {
              window['ga-disable-UA-' + tracker.get('trackingId')] = x
            }
          )
        }
      }
    }

    utilities.init()
    cookieBanner.init()
    cookiePageSettings.init()
  })
})(jQuery)
