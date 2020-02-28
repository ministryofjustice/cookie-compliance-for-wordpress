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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/frontend.js":
/*!****************************!*\
  !*** ./src/js/frontend.js ***!
  \****************************/
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
   *  Banner settings use local storage but with cookies as a fall back for older browers < IE8
   * */

  $(function () {
    /**
       *  Utilities - helper functions for shared tasks
       * */
    var utilities = {
      init: function init() {
        this.storageAvailable();
      },
      // Run a small test to determine if the browser can use local storage functionality if not use browser cookies
      storageAvailable: function storageAvailable(type) {
        try {
          var storage = window[type];
          var x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return false; // temporary change to false to turn off local storage use as I wanted only cookies used
        } catch (e) {
          return false;
        }
      },
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
      }
    };
    /**
       *  Top of page banner - controls the display of the cookie banner
       * */

    var cookieBanner = {
      init: function init() {
        this.cacheDom();
        this.bindEvents();
        this.setBannerDisplay();
      },
      cacheDom: function cacheDom() {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage = window.localStorage;
        }

        this.$el = $('#ccfw-page-banner');
        this.$buttonAccept = this.$el.find('button');
      },
      setBannerDisplay: function setBannerDisplay() {
        if (utilities.storageAvailable('localStorage')) {
          var getValueFromLocalStorage = this.localStorage.getItem('ccfwCookiePolicySaved');
          var getValueFromLocalStorageBool = getValueFromLocalStorage || false;
        } else {
          var getValueFromCookie = utilities.getCookie('ccfwCookiePolicySaved');
          var getValueFromCookieBool = getValueFromCookie || false;
        }

        if ((getValueFromLocalStorageBool || getValueFromCookieBool) === 'true') {
          $('#ccfw-page-banner').hide();
        } else {
          $('#ccfw-page-banner').show();
        }
      },
      bindEvents: function bindEvents() {
        this.$buttonAccept.on('click', this.hideBanner.bind(this));
      },
      hideBanner: function hideBanner() {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicy', 'true');
          this.localStorage.setItem('ccfwCookiePolicySaved', 'true');
          this.$el.hide();
        } else {
          this.$el.hide();
          utilities.setCookie('ccfwCookiePolicy', 'true', 365);
          utilities.setCookie('ccfwCookiePolicySaved', 'true', 365);
        }
      }
    };
    /**
       *  Cookie policy setting page - JS that controls the toggling of privacy/cookie settings
       * */

    var cookiePageSettings = {
      init: function init() {
        if ($('#ccfw-settings-page-container').length) {
          this.cacheDom();
          this.bindEvents();
          this.disableEnableGA();
          this.setPrevLink();
        }
      },
      cacheDom: function cacheDom() {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage = window.localStorage;
        }

        this.$el = $('#ccfw-settings-page-container');
        this.$googleYes = this.$el.find('#ga-yes');
        this.$googleNo = this.$el.find('#ga-no');
        this.$saveBtn = this.$el.find('#save-changes-btn');
        this.$saveNtc = this.$el.find('#save-notice');
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
        if (this.$googleYes.prop('checked')) {
          this.setGACookieTrue();
        } else {
          this.setGACookieFalse();
        }

        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicySaved', 'true');
        } else {
          utilities.setCookie('ccfwCookiePolicySaved', 'true', 365);
        }

        this.$saveNtc.show();
        $(document).scrollTop(this.$saveNtc.offset().top);
        this.$saveNtc.focus();
      },
      setGACookieTrue: function setGACookieTrue() {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicy', 'true');
        } else {
          utilities.setCookie('ccfwCookiePolicy', 'true', 365);
        }
      },
      setGACookieFalse: function setGACookieFalse() {
        if (utilities.storageAvailable('localStorage')) {
          this.localStorage.setItem('ccfwCookiePolicy', 'false');
        } else {
          utilities.setCookie('ccfwCookiePolicy', 'false', 365);
        }
      },
      setCookie: function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + '=' + value + '; path=/; expires=' + d.toGMTString();
      },
      disableEnableGA: function disableEnableGA() {
        // get the set cookie value (true or false)
        if (utilities.storageAvailable('localStorage')) {
          var lStorage = this.localStorage.getItem('ccfwCookiePolicy');
        } else {
          // Older browser support < IE8
          var cStorage = utilities.getCookie('ccfwCookiePolicy') || false;
        } // return true or false depending on what was clicked


        var x = (lStorage || cStorage) === 'true'; // set CSS button to what was selected

        if (x === true) {
          x = true;
          this.$googleYes.prop('checked', true);
        } else {
          x = false;
          this.$googleNo.prop('checked', true);
        } // Set the Google Analytic method to true or false where x === true or false
        // True === Google is disabled & False === Google is kept on


        if (typeof ga === 'function') {
          ga(function (tracker) {
            window['ga-disable-UA-' + tracker.get('trackingId')] = x;
          });
        }
      }
    };
    utilities.init();
    cookieBanner.init();
    cookiePageSettings.init();
  });
})(jQuery);

/***/ }),

/***/ "./src/scss/frontend-styles.scss":
/*!***************************************!*\
  !*** ./src/scss/frontend-styles.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!******************************************************************!*\
  !*** multi ./src/js/frontend.js ./src/scss/frontend-styles.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/adam/Dev/moj/wp-brookhouse/web/app/plugins/cookie-compliance-for-wordpress/src/js/frontend.js */"./src/js/frontend.js");
module.exports = __webpack_require__(/*! /Users/adam/Dev/moj/wp-brookhouse/web/app/plugins/cookie-compliance-for-wordpress/src/scss/frontend-styles.scss */"./src/scss/frontend-styles.scss");


/***/ })

/******/ });