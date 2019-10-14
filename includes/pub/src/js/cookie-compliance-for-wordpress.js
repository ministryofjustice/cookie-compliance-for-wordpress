(function ($) {
  'use strict'

  /**
   *  Load JS when page has completely loaded inc images
   * */
  // $(window).on('load', function () {
  //    place code here
  // })

  /**
   *  This enables you to define handlers for when the html/DOM is ready.
   * */
  $(function () {
    var cookieBanner = {

      init: function () {
        this.cacheDom()
        this.bindEvents()
        this.setBannerDisplay()
      },
      cacheDom: function () {
        this.localStorage = window.localStorage
        console.log(this.localStorage)
        this.$el = $('#ccfw-page-banner-container')
        this.$buttonAccept = this.$el.find('button')
      },
      bindEvents: function () {
        this.$buttonAccept.on('click', this.hideBanner.bind(this))
      },
      setBannerDisplay: function () {
        var localStore = this.localStorage.getItem('ccfwCookiePolicy')

        if (localStore === 'true') {
          $('#ccfw-page-banner-container').hide()
        } else {
          $('#ccfw-page-banner-container').show()
        }
      },
      hideBanner: function () {
        if (typeof (Storage) !== 'undefined') {
          this.localStorage.setItem('ccfwCookiePolicy', 'true')
          this.$el.hide()
        } else {
          // Older browser support < IE8
          this.$el.hide()
          this.setCookie('ccfwCookiePolicy', 'true', 365)
        }
      },
      setCookie: function (name, value, days) {
        var d = new Date()
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
        document.cookie = name + '=' + value + '; path=/; expires=' + d.toGMTString()
      }
    }

    var cookiePageSettings = {

      init: function () {
        this.cacheDom()
        this.bindEvents()
        this.disableEnableGA()
      },
      cacheDom: function () {
        this.localStorage = window.localStorage
        this.$el = $('#ccfw-settings-page-container')
        this.$googleYes = this.$el.find('#ga-yes')
        this.$googleNo = this.$el.find('#ga-no')
      },
      bindEvents: function () {
        this.$googleNo.on('click', this.setGACookieTrue.bind(this))
        this.$googleYes.on('click', this.setGACookieFalse.bind(this))
      },
      setGACookieTrue: function () {
        if (typeof (Storage) !== 'undefined') {
          this.localStorage.setItem('ccfwCookiePolicy', 'true')
        } else {
          this.setCookie('ccfwCookiePolicy', 'true', 365)
        }
      },
      setGACookieFalse: function () {
        if (typeof (Storage) !== 'undefined') {
          this.localStorage.setItem('ccfwCookiePolicy', 'false')
        } else {
          this.setCookie('ccfwCookiePolicy', 'false', 365)
        }
      },
      setCookie: function (name, value, days) {
        var d = new Date()
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
        document.cookie = name + '=' + value + '; path=/; expires=' + d.toGMTString()
      },
      disableEnableGA: function () {
        // get the set cookie value (true or false)
        if (typeof (Storage) !== 'undefined') {
          var lStorage = this.localStorage.getItem('ccfwCookiePolicy')
        } else {
          // Older browser support < IE8
          var cStorage = this.getCookieValue('ccfwCookiePolicy')
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
      },
      getCookieValue: function (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) {
          return parts.pop().split(';').shift()
        }
      }
    }

    cookieBanner.init()
    cookiePageSettings.init()
  })
})(jQuery)
