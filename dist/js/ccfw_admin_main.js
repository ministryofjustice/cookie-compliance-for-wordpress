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

/***/ "./src/js/ccfw_admin_main.js":
/*!***********************************!*\
  !*** ./src/js/ccfw_admin_main.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery(function ($) {
  /**
   * This function is a setter and getter. On set it updates the browser history and returns the pathname + search
   * part of the URL. If no key is provided the funstion returns false. If a key with no value has been given, and
   * the query string parameter exists, the value is returned.
   *
   * @param key
   * @param value
   * @returns string|boolean false|pathname + query string
   */
  function ccfwQString(key, value) {
    var params = new URLSearchParams(window.location.search);

    if (!value && params.has(key)) {
      return params.get(key);
    }

    if (!key) {
      return false;
    }

    params.set(key, value);

    if (!window.history) {
      /* shhh */
    } else {
      window.history.replaceState({}, '', "".concat(location.pathname, "?").concat(params));
    }

    return window.location.pathname + window.location.search;
  }

  function setTab(tab) {
    var tabId, refererPath;

    if (!tab) {
      tab = $('.nav-tab-wrapper a').eq(0);
    } else {
      tab = $(".nav-tab-wrapper a[href='" + tab + "']");
    }

    if (!tab.attr('href')) {
      tab = $('.nav-tab-wrapper a').eq(0);
    }

    tabId = tab.attr('href').split('#')[1];
    tab.parent().find('a').removeClass('nav-tab-active');
    tab.addClass('nav-tab-active');
    $('.ccfw-component-settings-section').hide();
    $('div#' + tabId).fadeIn(); // add to query string and update _wp_http_referer

    refererPath = ccfwQString('ccfw-tab', tabId);
    $('input[name="_wp_http_referer"]').val(refererPath);
    return false;
  } // only run JS on our settings page


  if ($('.settings_page_cookie-compliance-for-wordpress-settings').length > 0) {
    $('.nav-tab-wrapper').on('click', 'a', function (e) {
      e.preventDefault();
      setTab($(this).attr('href'));
      return false;
    }); // set the tab

    var ccfwTabSelected = ccfwQString('ccfw-tab');

    if (ccfwTabSelected) {
      setTab('#' + ccfwTabSelected);
    } else {
      setTab();
    }
  }
});

/***/ }),

/***/ "./src/scss/ccfw_admin_main.scss":
/*!***************************************!*\
  !*** ./src/scss/ccfw_admin_main.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/scss/ccfw_frontend.scss":
/*!*************************************!*\
  !*** ./src/scss/ccfw_frontend.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************************************************************************!*\
  !*** multi ./src/js/ccfw_admin_main.js ./src/scss/ccfw_frontend.scss ./src/scss/ccfw_admin_main.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/adam/Dev/moj/wp-jotw-public/web/app/plugins/cookie-compliance-for-wordpress/src/js/ccfw_admin_main.js */"./src/js/ccfw_admin_main.js");
__webpack_require__(/*! /Users/adam/Dev/moj/wp-jotw-public/web/app/plugins/cookie-compliance-for-wordpress/src/scss/ccfw_frontend.scss */"./src/scss/ccfw_frontend.scss");
module.exports = __webpack_require__(/*! /Users/adam/Dev/moj/wp-jotw-public/web/app/plugins/cookie-compliance-for-wordpress/src/scss/ccfw_admin_main.scss */"./src/scss/ccfw_admin_main.scss");


/***/ })

/******/ });