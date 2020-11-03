<<<<<<< Updated upstream
!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=4)}({4:function(e,t,n){e.exports=n(5)},5:function(e,t){!function(e){"use strict";e((function(){var t={init:function(){this.$el=e("#ccfw-page-banner"),this.$body=e("body"),this.$html=e("html")}},n={init:function(){this.cacheDom()},cacheDom:function(){this.$el=t.$el,this.$settingsModal=this.$el.find("#cookie-popup"),this.$body=t.$body,this.$html=t.$html},getCookie:function(e){var t=("; "+document.cookie).split("; "+e+"=");if(2===t.length)return t.pop().split(";").shift()},setCookie:function(e,t,n){var i=new Date;i.setTime(i.getTime()+864e5*n),document.cookie=e+"="+t+"; path=/; expires="+i.toGMTString()},deleteCookie:function(e){document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"},checkForCookie:function(e){return void 0!==this.getCookie(e)},hideBanner:function(){this.$el.hide()},hideSettingsModal:function(){this.$settingsModal.hide(),this.$body.removeClass("ccfw-modal-open"),this.$el.removeClass("ccfw-cookie-banner-open"),this.$html.removeClass("ccfw-cookie-banner-open"),this.$body.removeClass("ccfw-cookie-banner-open")},showSettingsModal:function(){this.$settingsModal.show(),this.$body.addClass("ccfw-modal-open"),this.$el.addClass("ccfw-cookie-banner-open"),this.$html.addClass("ccfw-cookie-banner-open"),this.$body.addClass("ccfw-cookie-banner-open"),o.trapSettingsFocus()}},i={init:function(){this.cacheDom(),this.bindEvents(),this.bannerDisplay()},cacheDom:function(){this.$el=t.$el,this.$buttonAccept=this.$el.find("#cookie-accept"),this.$buttonDecline=this.$el.find("#cookie-decline"),this.$buttonInfo=this.$el.find("#cookie-more-info")},bannerDisplay:function(){!0===n.checkForCookie("ccfw_wp_plugin.banner.hidden")?n.hideBanner():(this.$el.show(),this.trapBannerFocus())},bindEvents:function(){this.$buttonAccept.on("click",this.acceptAllButton.bind(this)),this.$buttonDecline.on("click",this.declineAllButton.bind(this)),this.$buttonInfo.on("click",this.chooseCookieSettingsButton.bind(this))},trapBannerFocus:function(){var t=e(".ccfw-banner__buttons"),n=e(".ccfw-banner__buttons #cookie-accept, .ccfw-banner__buttons #cookie-decline, .ccfw-banner__buttons #cookie-more-info"),i=n[0],o=n[n.length-1];t.on("keydown",(function(e){var t="Tab"===e.key;console.log(n),t&&(e.shiftKey?document.activeElement===i&&(o.focus(),e.preventDefault()):document.activeElement===o&&(i.focus(),e.preventDefault()))}))},acceptAllButton:function(){n.setCookie("ccfw_wp_plugin.banner.hidden","true",365),n.setCookie("ccfw_wp_plugin.ga.accept","true",365),n.hideBanner()},declineAllButton:function(){n.setCookie("ccfw_wp_plugin.banner.hidden","true",365),n.hideBanner()},chooseCookieSettingsButton:function(){n.showSettingsModal()}},o={init:function(){this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$el=t.$el,this.$settingsModal=this.$el.find("#cookie-popup"),this.$buttonAccept=this.$settingsModal.find("#cookie-accept"),this.$buttonDecline=this.$settingsModal.find("#cookie-decline"),this.$buttonInfo=this.$settingsModal.find("#cookie-more-info"),this.$buttonSavePreferences=this.$settingsModal.find("#cookie-save-preferences"),this.$GAcheckBox=this.$settingsModal.find("#ccfw-analytics-cookies-toggle"),this.$buttonModalClose=this.$settingsModal.find("#ccfw-modal-close"),this.$body=t.$body},bindEvents:function(){this.$buttonModalClose.on("click",this.modalDisplay.bind(this)),this.$buttonInfo.on("click",this.trapSettingsFocus.bind(this)),this.$buttonSavePreferences.on("click",this.saveCookiePreferences.bind(this)),this.$GAcheckBox.on("click",this.toggleAriaPressed.bind(this))},modalDisplay:function(){n.hideSettingsModal()},toggleAriaPressed:function(){var e="true"===this.$GAcheckBox.attr("aria-checked");this.$GAcheckBox.attr("aria-checked",!e)},trapSettingsFocus:function(){this.$settingsModal.focus();var t=e('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]'),i=t[0],o=t[t.length-1];this.$el.on("keydown",(function(e){"Escape"===e.key&&n.hideSettingsModal(),"Tab"===e.key&&(e.shiftKey?document.activeElement===i&&(o.focus(),e.preventDefault()):document.activeElement===o&&(i.focus(),e.preventDefault()))}))},saveCookiePreferences:function(){var e="true"===this.$GAcheckBox.attr("aria-checked");!0===e&&n.setCookie("ccfw_wp_plugin.ga.accept","true",365),!1===e&&n.checkForCookie("ccfw_wp_plugin.ga.accept")&&n.deleteCookie("ccfw_wp_plugin.ga.accept"),n.setCookie("ccfw_wp_plugin.banner.hidden","true",365),n.hideBanner(),n.hideSettingsModal()}};t.init(),n.init(),i.init(),o.init()}))}(jQuery)}});
=======
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/ccfw_frontend.js":
/*!*********************************!*\
  !*** ./src/js/ccfw_frontend.js ***!
  \*********************************/
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
        this.$html = $('html');
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
        this.$body = cacheMainElements.$body;
        this.$html = cacheMainElements.$html;
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
        this.$el.removeClass("ccfw-cookie-banner-open");
        this.$html.removeClass("ccfw-cookie-banner-open");
        this.$body.removeClass("ccfw-cookie-banner-open");
      },
      showSettingsModal: function showSettingsModal() {
        this.$settingsModal.show();
        this.$body.addClass("ccfw-modal-open");
        this.$el.addClass("ccfw-cookie-banner-open");
        this.$html.addClass("ccfw-cookie-banner-open");
        this.$body.addClass("ccfw-cookie-banner-open");
        settingsModal.trapSettingsFocus();
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
          this.trapBannerFocus();
        }
      },
      bindEvents: function bindEvents() {
        this.$buttonAccept.on('click', this.acceptAllButton.bind(this));
        this.$buttonDecline.on('click', this.declineAllButton.bind(this));
        this.$buttonInfo.on('click', this.chooseCookieSettingsButton.bind(this));
      },
      trapBannerFocus: function trapBannerFocus() {
        var cookieBannerButtons = $('.ccfw-banner__buttons');
        var focusableEls = $('.ccfw-banner__buttons #cookie-accept, .ccfw-banner__buttons #cookie-decline, .ccfw-banner__buttons #cookie-more-info');
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        cookieBannerButtons.on('keydown', function (e) {
          var isTabPressed = e.key === 'Tab';
          console.log(focusableEls);

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey)
            /* shift + tab */
            {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
              }
            } else
            /* tab */
            {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
              }
            }
        });
      },
      acceptAllButton: function acceptAllButton() {
        utilities.setCookie(cookie_key_banner_hidden, 'true', 365);
        utilities.setCookie(cookie_key_ga_accept, 'true', 365);
        utilities.hideBanner();
      },
      declineAllButton: function declineAllButton() {
        utilities.setCookie(cookie_key_banner_hidden, 'true', 365);
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
        this.$GAcheckBox = this.$settingsModal.find('#ccfw-analytics-cookies-toggle');
        this.$buttonModalClose = this.$settingsModal.find('#ccfw-modal-close');
        this.$body = cacheMainElements.$body;
      },
      bindEvents: function bindEvents() {
        this.$buttonModalClose.on('click', this.modalDisplay.bind(this));
        this.$buttonInfo.on('click', this.trapSettingsFocus.bind(this));
        this.$buttonSavePreferences.on('click', this.saveCookiePreferences.bind(this));
        this.$GAcheckBox.on('click', this.toggleAriaPressed.bind(this));
      },
      modalDisplay: function modalDisplay() {
        utilities.hideSettingsModal();
      },
      toggleAriaPressed: function toggleAriaPressed() {
        var pressed = this.$GAcheckBox.attr("aria-checked") === "true";
        this.$GAcheckBox.attr("aria-checked", !pressed);
      },
      trapSettingsFocus: function trapSettingsFocus() {
        this.$settingsModal.focus();
        /*Trap focus */

        /* Based on Hidde de Vries' solution: https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element */

        var focusableEls = $('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]');
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        this.$el.on('keydown', function (e) {
          // Close banner if user presses escape key
          if (e.key === 'Escape') {
            utilities.hideSettingsModal();
          }

          var isTabPressed = e.key === 'Tab';

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey)
            /* shift + tab */
            {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
              }
            } else
            /* tab */
            {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
              }
            }
        });
      },
      saveCookiePreferences: function saveCookiePreferences() {
        var analyticsCookiesTurnedOn = this.$GAcheckBox.attr("aria-checked") === "true";

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

/***/ 2:
/*!***************************************!*\
  !*** multi ./src/js/ccfw_frontend.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/beverleynewing/sites/wp-jotw-public/web/app/plugins/cookie-compliance-for-wordpress/src/js/ccfw_frontend.js */"./src/js/ccfw_frontend.js");


/***/ })

/******/ });
>>>>>>> Stashed changes
