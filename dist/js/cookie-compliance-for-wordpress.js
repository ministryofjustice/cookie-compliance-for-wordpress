/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/cookie-compliance-for-wordpress.js":
/*!***************************************************!*\
  !*** ./src/js/cookie-compliance-for-wordpress.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function ($) {
  'use strict';
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
    var cookie_key_hide_banner = 'ccfw_wp_plugin.hide_banner';
    var cookie_key_ga = 'ccfw_wp_plugin.ga';
    var cookie_key_gtm = 'ccfw_wp_plugin.gtm';
    /**
    *  Helper functions for shared tasks
    * */

    var utilities = {
      init: function init() {},
      getCookie: function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');

        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      },
      setCookie: function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + '=' + value + '; path=/; expires=' + d.toGMTString();
      },
      checkForCookie: function checkForCookie(key) {
        var cookie = this.getCookie(key);

        if (cookie === undefined) {
          var bool = false;
        } else {
          var bool = true;
        }

        return bool;
      }
    };
    /**
     *  Module to interact with Google Data Layer and setting Google cookie config
     *
     * */

    var googleAnalytics = {
      init: function init() {},
      googleSetDataLayer: function googleSetDataLayer(analytics, tagManager) {
        // Google Analytics value on or off
        if (analytics === 'on') {
          var boolGA = false;
        } else if (analytics === 'off') {
          var boolGA = true;
        } // Google Tag Manager value on or off


        if (tagManager === 'on') {
          var boolGTM = false;
        } else if (tagManager === 'off') {
          var boolGTM = true;
        }

        if (typeof ga === 'function') {
          ga(function () {
            // ga() function loads last, retrieve GA and GTM ID numbers
            var GA_ID = Object.keys(gaData)[0];
            var GTM_ID = Object.keys(google_tag_manager)[0];
            window['ga-disable-' + GA_ID] = boolGA;
            window['ga-disable-' + GTM_ID] = boolGTM;
          });
        }
      },
      googleSetCookie: function googleSetCookie(analytics, tagManager) {
        utilities.setCookie(cookie_key_ga, analytics, 365);
        utilities.setCookie(cookie_key_gtm, tagManager, 365);
      }
    };
    /**
     *  Opt-out by default of all analytics/trackers
     *  on page load or first visit
     * */

    var optOutByDefault = {
      init: function init() {
        this.loadGA();
      },
      loadGA: function loadGA() {
        if (utilities.getCookie(cookie_key_hide_banner) != 'true') {
          googleAnalytics.googleSetDataLayer('off', 'off');
          googleAnalytics.googleSetCookie('revoke', 'revoke');
        }
      }
    };
    /**
     *  Banner management and control
     * */

    var banner = {
      init: function init() {
        this.cacheDom();
        this.bindEvents();
        this.setBannerDisplay();
      },
      cacheDom: function cacheDom() {
        this.$el = $('#ccfw-page-banner');
        this.$popup = $('#cookie-popup');
        this.$buttonaccept = this.$el.find('#cookie-accept');
        this.$buttondecline = this.$el.find('#cookie-decline');
        this.$buttoninfo = this.$el.find('#cookie-more-info');
        this.$buttonsavepreferences = this.$el.find('#cookie-save-preferences');
        this.$GAcheckbox = this.$el.find('#ccfw-ga-checkbox');
        this.$buttonmodalclose = this.$el.find('#ccfw-modal-close');
        this.$body = $('body');
      },
      setBannerDisplay: function setBannerDisplay() {
        var cookieExists = utilities.checkForCookie(cookie_key_hide_banner);

        if (cookieExists === true) {
          this.$el.hide();
        } else {
          this.$el.show();
        }
      },
      bindEvents: function bindEvents() {
        this.$buttonaccept.on('click', this.acceptAllButton.bind(this));
        this.$buttondecline.on('click', this.declineAllButton.bind(this));
        this.$buttoninfo.on('click', this.viewMoreInfo.bind(this));
        this.$buttonsavepreferences.on('click', this.saveCookiePreferences.bind(this));
        this.$buttonmodalclose.on('click', this.closeModal.bind(this));
      },
      acceptAllButton: function acceptAllButton() {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365);
        googleAnalytics.googleSetDataLayer('on', 'on');
        googleAnalytics.googleSetCookie('accept', 'accept');
        this.hideBanner();
      },
      declineAllButton: function declineAllButton() {
        utilities.setCookie(cookie_key_hide_banner, 'true', 365);
        googleAnalytics.googleSetDataLayer('off', 'off');
        googleAnalytics.googleSetCookie('revoke', 'revoke');
        this.hideBanner();
      },
      viewMoreInfo: function viewMoreInfo() {
        this.$buttoninfo.attr('aria-expanded', 'true');
        this.$popup.show();
        this.$el.addClass("cookie-banner-open");
        this.$body.addClass("ccfw-modal-open");
        /*Trap focus */

        /* Based on Hidde de Vries' solution: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element */

        var focusableEls = $('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]');
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        this.$el.on('keydown', function (e) {
          var isTabPressed = e.key === 'Tab';

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey)
            /* shift + tab */
            {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
              }
            } else
            /* tab */
            {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
              }
            }
        });
      },
      closeModal: function closeModal() {
        this.$buttoninfo.attr('aria-expanded', 'false');
        this.$popup.hide();
        this.$el.removeClass("cookie-banner-open");
        this.$body.removeClass("ccfw-modal-open");
        this.$el.removeClass("cookie-banner-open");
        this.$popup.hide();
      },
      saveCookiePreferences: function saveCookiePreferences() {
        var analyticsCookiesTurnedOn = this.$GAcheckbox.prop('checked');
        utilities.setCookie(cookie_key_hide_banner, 'true', 365);

        if (analyticsCookiesTurnedOn === true) {
          googleAnalytics.googleSetDataLayer('on', 'on');
          googleAnalytics.googleSetCookie('accept', 'accept');
        } else {
          googleAnalytics.googleSetDataLayer('off', 'off');
          googleAnalytics.googleSetCookie('revoke', 'revoke');
        }

        this.closeModal();
        this.hideBanner();
      },
      hideBanner: function hideBanner() {
        this.$el.hide();
        this.$el.removeClass("cookie-banner-open");
      }
    };
    /**
     *  Settings page where a user toggles tracking on/off
     * */

    var settingsPage = {
      init: function init() {
        this.cacheDom();
        this.bindEvents();
        this.setPrevLink();
      },
      cacheDom: function cacheDom() {
        this.$el = $('#ccfw-settings-page-container');
        this.$googleYes = this.$el.find('#ga-yes');
        this.$googleNo = this.$el.find('#ga-no');
        this.$saveBtn = this.$el.find('#save-changes-btn');
        this.$saveNoticeBanner = this.$el.find('#save-notice');
        this.$prevLink = this.$el.find('#prev-link');
      },
      setPrevLink: function setPrevLink() {
        var referrer = document.referrer;

        if (referrer.length > 0) {
          this.$prevLink.attr('href', referrer);
        }
      },
      bindEvents: function bindEvents() {
        this.$saveBtn.on('click', this.saveSettings.bind(this));
      },
      saveSettings: function saveSettings() {
        /**
        *  Right now there is no distinction between
        *  GA and GTM both Google trackers here are checked on or off together.
        *  In the future we may want to refactor to check each individually.
        * */
        var googleButtonYes = this.$googleYes.prop('checked');
        var googleButtonNo = this.$googleNo.prop('checked');

        if (googleButtonYes === true) {
          googleAnalytics.googleSetDataLayer('on', 'on');
          googleAnalytics.googleSetCookie('accept', 'accept');
        } else if (googleButtonNo === true) {
          googleAnalytics.googleSetDataLayer('off', 'off');
          googleAnalytics.googleSetCookie('revoke', 'revoke');
        }

        utilities.setCookie(cookie_key_hide_banner, 'true', 365);
        this.displayNoticeBanner();
      },
      displayNoticeBanner: function displayNoticeBanner() {
        this.$saveNoticeBanner.show();
        $(document).scrollTop(this.$saveNoticeBanner.offset().top);
        this.$saveNoticeBanner.focus();
      }
    };
    utilities.init();
    googleAnalytics.init();
    optOutByDefault.init();
    banner.init();
    settingsPage.init();
  });
})(jQuery);

/***/ }),

/***/ 1:
/*!*********************************************************!*\
  !*** multi ./src/js/cookie-compliance-for-wordpress.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/beverleynewing/sites/wp-ppj/web/app/plugins/cookie-compliance-for-wordpress/src/js/cookie-compliance-for-wordpress.js */"./src/js/cookie-compliance-for-wordpress.js");


/***/ })

/******/ });