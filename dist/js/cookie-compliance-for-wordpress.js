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
    var cookie_key_banner_hidden = 'ccfw_wp_plugin.banner.hidden';
    var cookie_key_ga_accept = 'ccfw_wp_plugin.ga.accept'; // This is used so much make sure all modules use it to save calls to DOM

    var cacheMainElements = {
      init: function init() {
        this.$el = $('#ccfw-page-banner');
        this.$body = $('body');
      }
    };
    /**
    *  Helper functions for shared tasks
    * */

    var utilities = {
      init: function init() {
        this.cacheDom();
      },
      cacheDom: function cacheDom() {
        this.$el = cacheMainElements.$el;
        this.$settingsModal = this.$el.find('#cookie-popup');
        this.$body = $('body');
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
      },
      deleteCookie: function deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      },
      checkForCookie: function checkForCookie(key) {
        var cookie = this.getCookie(key);
        var bool = cookie === undefined ? false : true;
        return bool;
      },
      hideBanner: function hideBanner() {
        this.$el.hide();
      },
      hideSettingsModal: function hideSettingsModal() {
        this.$settingsModal.hide();
        this.$body.removeClass("ccfw-modal-open");
        this.$el.removeClass("cookie-banner-open");
      },
      showSettingsModal: function showSettingsModal() {
        this.$settingsModal.show();
        this.$body.addClass("ccfw-modal-open");
        this.$el.addClass("cookie-banner-open");
      }
    };
    /**
     *  Banner management and control
     * */

    var banner = {
      init: function init() {
        this.cacheDom();
        this.bindEvents();
        this.bannerDisplay();
      },
      cacheDom: function cacheDom() {
        this.$el = cacheMainElements.$el;
        this.$buttonAccept = this.$el.find('#cookie-accept');
        this.$buttonDecline = this.$el.find('#cookie-decline');
        this.$buttonInfo = this.$el.find('#cookie-more-info');
      },
      bannerDisplay: function bannerDisplay() {
        if (utilities.checkForCookie(cookie_key_banner_hidden) === true) {
          utilities.hideBanner();
        } else {
          this.$el.show();
        }
      },
      bindEvents: function bindEvents() {
        this.$buttonAccept.on('click', this.acceptAllButton.bind(this));
        this.$buttonDecline.on('click', this.declineAllButton.bind(this));
        this.$buttonInfo.on('click', this.chooseCookieSettingsButton.bind(this));
      },
      acceptAllButton: function acceptAllButton() {
        utilities.setCookie(cookie_key_banner_hidden, 'true', 365);
        utilities.setCookie(cookie_key_ga_accept, 'true', 365);
        utilities.hideBanner();
      },
      declineAllButton: function declineAllButton() {
        utilities.setCookie(cookie_key_banner_hidden, 'true', 365); // GA - If present remove GA cookie, otherwise do nothing, default is GA off

        if (utilities.checkForCookie(cookie_key_ga_accept)) {
          utilities.deleteCookie(cookie_key_ga_accept);
        }

        utilities.hideBanner();
      },
      chooseCookieSettingsButton: function chooseCookieSettingsButton() {
        utilities.showSettingsModal();
      }
    };
    var settingsModal = {
      init: function init() {
        this.cacheDom();
        this.bindEvents();
      },
      cacheDom: function cacheDom() {
        this.$el = cacheMainElements.$el;
        this.$settingsModal = this.$el.find('#cookie-popup');
        this.$buttonAccept = this.$settingsModal.find('#cookie-accept');
        this.$buttonDecline = this.$settingsModal.find('#cookie-decline');
        this.$buttonInfo = this.$settingsModal.find('#cookie-more-info');
        this.$buttonSavePreferences = this.$settingsModal.find('#cookie-save-preferences');
        this.$GAcheckBox = this.$settingsModal.find('#ccfw-ga-toggle');
        this.$buttonModalClose = this.$settingsModal.find('#ccfw-modal-close');
        this.$body = cacheMainElements.$body;
      },
      bindEvents: function bindEvents() {
        this.$buttonModalClose.on('click', this.modalDisplay.bind(this));
        this.$buttonInfo.on('click', this.viewMoreInfo.bind(this));
        this.$buttonSavePreferences.on('click', this.saveCookiePreferences.bind(this));
      },
      modalDisplay: function modalDisplay() {
        utilities.hideSettingsModal();
      },
      viewMoreInfo: function viewMoreInfo() {
        this.$buttonInfo.attr('aria-expanded', 'true');
        utilities.showSettingsModal();
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
      saveCookiePreferences: function saveCookiePreferences() {
        var analyticsCookiesTurnedOn = this.$GAcheckBox.prop('checked');

        if (analyticsCookiesTurnedOn === true) {
          utilities.setCookie(cookie_key_ga_accept, 'true', 365);
        }

        if (analyticsCookiesTurnedOn === false) {
          // GA - If present remove GA cookie, otherwise do nothing, default is GA off
          if (utilities.checkForCookie(cookie_key_ga_accept)) {
            utilities.deleteCookie(cookie_key_ga_accept);
          }
        }

        utilities.setCookie(cookie_key_banner_hidden, 'true', 365);
        utilities.hideBanner();
        utilities.hideSettingsModal();
      }
    };
    cacheMainElements.init();
    utilities.init();
    banner.init();
    settingsModal.init();
  });
})(jQuery);

/***/ }),

/***/ 1:
/*!*********************************************************!*\
  !*** multi ./src/js/cookie-compliance-for-wordpress.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/beverleynewing/sites/wp-jotw-public/web/app/plugins/cookie-compliance-for-wordpress/src/js/cookie-compliance-for-wordpress.js */"./src/js/cookie-compliance-for-wordpress.js");


/***/ })

/******/ });