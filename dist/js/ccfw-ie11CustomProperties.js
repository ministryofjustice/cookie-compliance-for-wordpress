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

/***/ "./src/js/ie11CustomProperties.js":
/*!****************************************!*\
  !*** ./src/js/ie11CustomProperties.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ie11CustomProperties.js v3.0.6 | MIT License | https://git.io/fjXMN */
!function () {
  'use strict'; // check for support

  var testEl = document.createElement('i');
  testEl.style.setProperty('--x', 'y');
  if (testEl.style.getPropertyValue('--x') === 'y' || !testEl.msMatchesSelector) return;
  if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
  var listeners = [],
      root = document,
      Observer;

  function qsa(el, selector) {
    try {
      return el.querySelectorAll(selector);
    } catch (e) {
      // console.warn('the Selector '+selector+' can not be parsed');
      return [];
    }
  }

  function onElement(selector, callback) {
    var listener = {
      selector: selector,
      callback: callback,
      elements: new WeakMap()
    };
    var els = qsa(root, listener.selector),
        i = 0,
        el;

    while (el = els[i++]) {
      listener.elements.set(el, true);
      listener.callback.call(el, el);
    }

    listeners.push(listener);

    if (!Observer) {
      Observer = new MutationObserver(checkMutations);
      Observer.observe(root, {
        childList: true,
        subtree: true
      });
    }

    checkListener(listener);
  }

  ;

  function checkListener(listener, target) {
    var i = 0,
        el,
        els = [];

    try {
      target && target.matches(listener.selector) && els.push(target);
    } catch (e) {}

    if (loaded) {
      // ok? check inside node on innerHTML - only when loaded
      Array.prototype.push.apply(els, qsa(target || root, listener.selector));
    }

    while (el = els[i++]) {
      if (listener.elements.has(el)) continue;
      listener.elements.set(el, true);
      listener.callback.call(el, el);
    }
  }

  function checkListeners(inside) {
    var i = 0,
        listener;

    while (listener = listeners[i++]) {
      checkListener(listener, inside);
    }
  }

  function checkMutations(mutations) {
    var j = 0,
        i,
        mutation,
        nodes,
        target;

    while (mutation = mutations[j++]) {
      nodes = mutation.addedNodes, i = 0;

      while (target = nodes[i++]) {
        target.nodeType === 1 && checkListeners(target);
      }
    }
  }

  var loaded = false;
  document.addEventListener('DOMContentLoaded', function () {
    loaded = true;
  }); // svg polyfills

  function copyProperty(prop, from, to) {
    var desc = Object.getOwnPropertyDescriptor(from, prop);
    Object.defineProperty(to, prop, desc);
  }

  if (!('classList' in Element.prototype)) {
    copyProperty('classList', HTMLElement.prototype, Element.prototype);
  }

  if (!('innerHTML' in Element.prototype)) {
    copyProperty('innerHTML', HTMLElement.prototype, Element.prototype);
  }

  if (!('sheet' in SVGStyleElement.prototype)) {
    Object.defineProperty(SVGStyleElement.prototype, 'sheet', {
      get: function get() {
        var all = document.styleSheets,
            i = 0,
            sheet;

        while (sheet = all[i++]) {
          if (sheet.ownerNode === this) return sheet;
        }
      }
    });
  } // main logic
  // cached regexps, better performance


  var regFindSetters = /([\s{;])(--([A-Za-z0-9-_]*)\s*:([^;!}{]+)(!important)?)(?=\s*([;}]|$))/g;
  var regFindGetters = /([{;]\s*)([A-Za-z0-9-_]+\s*:[^;}{]*var\([^!;}{]+)(!important)?(?=\s*([;}$]|$))/g;
  var regRuleIEGetters = /-ieVar-([^:]+):/g;
  var regRuleIESetters = /-ie-([^};]+)/g; //const regHasVar = /var\(/;

  var regPseudos = /:(hover|active|focus|target|:before|:after|:first-letter|:first-line)/;
  onElement('link[rel="stylesheet"]', function (el) {
    fetchCss(el.href, function (css) {
      var newCss = rewriteCss(css);
      if (css === newCss) return;
      newCss = relToAbs(el.href, newCss);
      el.disabled = true;
      var style = document.createElement('style');
      if (el.media) style.setAttribute('media', el.media);
      el.parentNode.insertBefore(style, el);
      activateStyleElement(style, newCss);
    });
  });

  function foundStyle(el) {
    if (el.ieCP_polyfilled) return;
    if (el.ieCP_elementSheet) return;
    var css = el.innerHTML;
    var newCss = rewriteCss(css);
    if (css === newCss) return;
    activateStyleElement(el, newCss);
  }

  onElement('style', foundStyle); // immediate, to pass w3c-tests, bud its a bad idea
  // addEventListener('DOMNodeInserted',function(e){ e.target.tagName === 'STYLE' && foundStyle(e.target); });

  onElement('[ie-style]', function (el) {
    var newCss = rewriteCss('{' + el.getAttribute('ie-style')).substr(1);
    el.style.cssText += ';' + newCss;
    var found = parseRewrittenStyle(el.style);
    if (found.getters) addGetterElement(el, found.getters, '%styleAttr');
    if (found.setters) addSetterElement(el, found.setters);
  });

  function relToAbs(base, css) {
    return css.replace(/url\(([^)]+)\)/g, function ($0, $1) {
      $1 = $1.trim().replace(/(^['"]|['"]$)/g, '');
      if ($1.match(/^([a-z]+:|\/)/)) return $0;
      base = base.replace(/\?.*/, '');
      return 'url(' + base + './../' + $1 + ')';
    });
  } // ie has a bug, where unknown properties at pseudo-selectors are computed at the element
  // #el::after { -content:'x'; } => getComputedStyle(el)['-content'] == 'x'
  // should we add something like -ieVar-pseudo_after-content:'x'?


  function rewriteCss(css) {
    /* uncomment if spec finished and needed by someone
    css = css.replace(/@property ([^{]+){([^}]+)}/, function($0, prop, body){
    	prop = prop.trim();
    	const declaration = {name:prop};
    	body.split(';').forEach(function(pair){
    		const x = pair.split(':');
    		if (x[1]) declaration[ x[0].trim() ] = x[1];
    	});
    	declaration['inherits'] = declaration['inherits'].trim()==='true' ? true : false;
    	declaration['initialValue'] = declaration['initial-value'];
    	CSS.registerProperty(declaration)
    	return '/*\n @property ... removed \n*'+'/';
    });
    */
    return css.replace(regFindSetters, function ($0, $1, $2, $3, $4, important) {
      return $1 + '-ie-' + (important ? '❗' : '') + $3 + ':' + encodeValue($4);
    }).replace(regFindGetters, function ($0, $1, $2, important) {
      return $1 + '-ieVar-' + (important ? '❗' : '') + $2 + '; ' + $2; // keep the original, so chaining works "--x:var(--y)"
    });
  }

  function encodeValue(value) {
    return value;
    return value.replace(/ /g, '␣');
  }

  var keywords = {
    initial: 1,
    inherit: 1,
    revert: 1,
    unset: 1
  };

  function decodeValue(value) {
    return value;
    if (value === undefined) return;
    value = value.replace(/␣/g, ' ');
    var trimmed = value.trim();
    if (keywords[trimmed]) return trimmed;
    return value;
  } // beta


  var styles_of_getter_properties = {};

  function parseRewrittenStyle(style) {
    // less memory then parameter cssText?
    // beta
    style['z-index']; // ie11 can access unknown properties in stylesheets only if accessed a dashed known property

    var cssText = style.cssText;
    var matchesGetters = cssText.match(regRuleIEGetters),
        j,
        match;

    if (matchesGetters) {
      var getters = []; // eg. [border,color]

      for (j = 0; match = matchesGetters[j++];) {
        var propName = match.slice(7, -1);
        if (propName[0] === '❗') propName = propName.substr(1);
        getters.push(propName); // beta

        if (!styles_of_getter_properties[propName]) styles_of_getter_properties[propName] = [];
        styles_of_getter_properties[propName].push(style);
      }
    }

    var matchesSetters = cssText.match(regRuleIESetters);

    if (matchesSetters) {
      var setters = {}; // eg. [--color:#fff, --padding:10px];

      for (j = 0; match = matchesSetters[j++];) {
        var x = match.substr(4).split(':');
        var _propName = x[0];
        var propValue = x[1];
        if (_propName[0] === '❗') _propName = _propName.substr(1);
        setters[_propName] = propValue;
      }
    }

    return {
      getters: getters,
      setters: setters
    };
  }

  function activateStyleElement(style, css) {
    style.innerHTML = css;
    style.ieCP_polyfilled = true;
    var rules = style.sheet.rules,
        i = 0,
        rule; // cssRules = CSSRuleList, rules = MSCSSRuleList

    while (rule = rules[i++]) {
      var found = parseRewrittenStyle(rule.style);
      if (found.getters) addGettersSelector(rule.selectorText, found.getters);
      if (found.setters) addSettersSelector(rule.selectorText, found.setters); // mediaQueries: redraw the hole document
      // better add events for each element?

      var media = rule.parentRule && rule.parentRule.media && rule.parentRule.media.mediaText;

      if (media && (found.getters || found.setters)) {
        matchMedia(media).addListener(function () {
          drawTree(document.documentElement);
        });
      }
    } // beta


    redrawStyleSheets();
  }

  function addGettersSelector(selector, properties) {
    selectorAddPseudoListeners(selector);
    onElement(unPseudo(selector), function (el) {
      addGetterElement(el, properties, selector);
      drawElement(el);
    });
  }

  function addGetterElement(el, properties, selector) {
    var i = 0,
        prop,
        j;
    var selectors = selector.split(','); // split grouped selectors

    el.setAttribute('iecp-needed', true);
    if (!el.ieCPSelectors) el.ieCPSelectors = {};

    while (prop = properties[i++]) {
      for (j = 0; selector = selectors[j++];) {
        var parts = selector.trim().split('::');
        if (!el.ieCPSelectors[prop]) el.ieCPSelectors[prop] = [];
        el.ieCPSelectors[prop].push({
          selector: parts[0],
          pseudo: parts[1] ? '::' + parts[1] : ''
        });
      }
    }
  }

  function addSettersSelector(selector, propVals) {
    selectorAddPseudoListeners(selector);
    onElement(unPseudo(selector), function (el) {
      addSetterElement(el, propVals);
    });
  }

  function addSetterElement(el, propVals) {
    if (!el.ieCP_setters) el.ieCP_setters = {};

    for (var prop in propVals) {
      // eg. {foo:#fff, bar:baz}
      el.ieCP_setters['--' + prop] = 1;
    }

    drawTree(el);
  } //beta


  function redrawStyleSheets() {
    for (var prop in styles_of_getter_properties) {
      var styles = styles_of_getter_properties[prop];

      for (var i = 0, style; style = styles[i++];) {
        if (style.owningElement) continue;
        var value = style['-ieVar-' + prop];
        if (!value) continue;
        value = styleComputeValueWidthVars(getComputedStyle(document.documentElement), value);
        if (value === '') continue;

        try {
          style[prop] = value;
        } catch (e) {}
      }
    }
  }

  var pseudos = {
    hover: {
      on: 'mouseenter',
      off: 'mouseleave'
    },
    focus: {
      on: 'focusin',
      off: 'focusout'
    },
    active: {
      on: 'CSSActivate',
      off: 'CSSDeactivate'
    }
  };

  function selectorAddPseudoListeners(selector) {
    // ie11 has the strange behavoir, that groups of selectors are individual rules, but starting with the full selector:
    // td, th, button { color:red } results in this rules:
    // "td, th, button" | "th, th" | "th"
    selector = selector.split(',')[0];

    for (var pseudo in pseudos) {
      var parts = selector.split(':' + pseudo);

      if (parts.length > 1) {
        var ending;

        (function () {
          ending = parts[1].match(/^[^\s]*/); // ending elementpart of selector (used for not(:active))

          var sel = unPseudo(parts[0] + ending);
          var listeners = pseudos[pseudo];
          onElement(sel, function (el) {
            el.addEventListener(listeners.on, drawTreeEvent);
            el.addEventListener(listeners.off, drawTreeEvent);
          });
        })();
      }
    }
  }

  var CSSActive = null;
  document.addEventListener('mousedown', function (e) {
    setTimeout(function () {
      if (e.target === document.activeElement) {
        var evt = document.createEvent('Event');
        evt.initEvent('CSSActivate', true, true);
        CSSActive = e.target;
        CSSActive.dispatchEvent(evt);
      }
    });
  });
  document.addEventListener('mouseup', function () {
    if (CSSActive) {
      var evt = document.createEvent('Event');
      evt.initEvent('CSSDeactivate', true, true);
      CSSActive.dispatchEvent(evt);
      CSSActive = null;
    }
  });

  function unPseudo(selector) {
    return selector.replace(regPseudos, '').replace(':not()', '');
  }

  var uniqueCounter = 0;
  /* old *
  function _drawElement(el) {
  	if (!el.ieCP_unique) { // use el.uniqueNumber? but needs class for the css-selector => test performance
  		el.ieCP_unique = ++uniqueCounter;
  		el.classList.add('iecp-u' + el.ieCP_unique);
  	}
  	var style = getComputedStyle(el);
  	if (el.ieCP_sheet) while (el.ieCP_sheet.rules[0]) el.ieCP_sheet.deleteRule(0);
  	for (var prop in el.ieCPSelectors) {
  		var important = style['-ieVar-❗' + prop];
  		let valueWithVar = important || style['-ieVar-' + prop];
  		if (!valueWithVar) continue; // todo, what if '0'
  			var details = {};
  		var value = styleComputeValueWidthVars(style, valueWithVar, details);
  			if (important) value += ' !important';
  		for (var i=0, item; item=el.ieCPSelectors[prop][i++];) { // todo: split and use requestAnimationFrame?
  			if (item.selector === '%styleAttr') {
  				el.style[prop] = value;
  			} else {
  					// beta
  				if (!important && details.allByRoot !== false) continue; // dont have to draw root-properties
  					//let selector = item.selector.replace(/>? \.[^ ]+/, ' ', item.selector); // todo: try to equalize specificity
  				let selector = item.selector;
  				elementStyleSheet(el).insertRule(selector + '.iecp-u' + el.ieCP_unique + item.pseudo + ' {' + prop + ':' + value + '}', 0);
  			}
  		}
  	}
  }
  function elementStyleSheet(el){
  	if (!el.ieCP_sheet) {
  		const styleEl = document.createElement('style');
  		styleEl.ieCP_elementSheet = 1;
  		//el.appendChild(styleEl); // yes! self-closing tags can have style as children, but - if i set innerHTML, the stylesheet is lost
  		document.head.appendChild(styleEl);
  		el.ieCP_sheet = styleEl.sheet;
  	}
  	return el.ieCP_sheet;
  }
  	/* */

  function _drawElement(el) {
    if (!el.ieCP_unique) {
      // use el.uniqueNumber? but needs class for the css-selector => test performance
      el.ieCP_unique = ++uniqueCounter;
      el.classList.add('iecp-u' + el.ieCP_unique);
    }

    var style = getComputedStyle(el);
    var css = '';

    for (var prop in el.ieCPSelectors) {
      var important = style['-ieVar-❗' + prop];
      var valueWithVar = important || style['-ieVar-' + prop];
      if (!valueWithVar) continue; // todo, what if '0'

      var details = {};
      var value = styleComputeValueWidthVars(style, valueWithVar, details); //if (value==='initial') value = initials[prop];

      if (important) value += ' !important';

      for (var i = 0, item; item = el.ieCPSelectors[prop][i++];) {
        // todo: split and use requestAnimationFrame?
        if (item.selector === '%styleAttr') {
          el.style[prop] = value;
        } else {
          // beta
          if (!important && details.allByRoot !== false) continue; // dont have to draw root-properties
          //let selector = item.selector.replace(/>? \.[^ ]+/, ' ', item.selector); // todo: try to equalize specificity

          var selector = item.selector;
          css += selector + '.iecp-u' + el.ieCP_unique + item.pseudo + '{' + prop + ':' + value + '}\n';
        }
      }
    }

    elementSetCss(el, css);
  }

  function elementSetCss(el, css) {
    if (!el.ieCP_styleEl && css) {
      var styleEl = document.createElement('style');
      styleEl.ieCP_elementSheet = 1; //el.appendChild(styleEl); // yes! self-closing tags can have style as children, but - if i set innerHTML, the stylesheet is lost

      document.head.appendChild(styleEl);
      el.ieCP_styleEl = styleEl;
    }

    if (el.ieCP_styleEl) el.ieCP_styleEl.innerHTML = css;
  }
  /* */


  function drawTree(target) {
    if (!target) return;
    var els = target.querySelectorAll('[iecp-needed]');
    if (target.hasAttribute && target.hasAttribute('iecp-needed')) drawElement(target); // self

    for (var i = 0, el; el = els[i++];) {
      drawElement(el);
    } // tree

  } // draw queue


  var drawQueue = new Set();
  var collecting = false;
  var drawing = false;

  function drawElement(el) {
    drawQueue.add(el);
    if (collecting) return;
    collecting = true;
    requestAnimationFrame(function () {
      //setImmediate(function(){
      collecting = false;
      drawing = true;
      drawQueue.forEach(_drawElement);
      drawQueue.clear();
      setTimeout(function () {
        // mutationObserver will trigger delayed, requestAnimationFrame will miss some changes
        drawing = false;
      });
    });
  }

  function drawTreeEvent(e) {
    drawTree(e.target);
  }

  function findVars(str, cb) {
    // css value parser
    var level = 0,
        openedLevel = null,
        lastPoint = 0,
        newStr = '',
        i = 0,
        _char,
        insideCalc;

    while (_char = str[i++]) {
      if (_char === '(') {
        ++level;

        if (openedLevel === null && str[i - 4] + str[i - 3] + str[i - 2] === 'var') {
          openedLevel = level;
          newStr += str.substring(lastPoint, i - 4);
          lastPoint = i;
        }

        if (str[i - 5] + str[i - 4] + str[i - 3] + str[i - 2] === 'calc') {
          insideCalc = level;
        }
      }

      if (_char === ')' && openedLevel === level) {
        var variable = str.substring(lastPoint, i - 1).trim(),
            fallback = void 0;
        var x = variable.indexOf(',');

        if (x !== -1) {
          fallback = variable.slice(x + 1);
          variable = variable.slice(0, x);
        }

        newStr += cb(variable, fallback, insideCalc);
        lastPoint = i;
        openedLevel = null;
      }

      if (_char === ')') {
        --level;
        if (insideCalc === level) insideCalc = null;
      }
    }

    newStr += str.substring(lastPoint);
    return newStr;
  }

  function styleComputeValueWidthVars(style, valueWithVars, details) {
    return findVars(valueWithVars, function (variable, fallback, insideCalc) {
      var value = style.getPropertyValue(variable);
      if (insideCalc) value = value.replace(/^calc\(/, '('); // prevent nested calc

      if (details && style.lastPropertyServedBy !== document.documentElement) details.allByRoot = false;
      if (value === '' && fallback) value = styleComputeValueWidthVars(style, fallback, details);
      return value;
    });
  } // mutation listener


  var observer = new MutationObserver(function (mutations) {
    if (drawing) return;

    for (var i = 0, mutation; mutation = mutations[i++];) {
      if (mutation.attributeName === 'iecp-needed') continue; // why?
      // recheck all selectors if it targets new elements?

      drawTree(mutation.target);
    }
  });
  setTimeout(function () {
    observer.observe(document, {
      attributes: true,
      subtree: true
    });
  }); // :target listener

  var oldHash = location.hash;
  addEventListener('hashchange', function (e) {
    var newEl = document.getElementById(location.hash.substr(1));

    if (newEl) {
      var oldEl = document.getElementById(oldHash.substr(1));
      drawTree(newEl);
      drawTree(oldEl);
    } else {
      drawTree(document);
    }

    oldHash = location.hash;
  }); // add owningElement to Element.style

  var descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');
  var styleGetter = descriptor.get;

  descriptor.get = function () {
    var style = styleGetter.call(this);
    style.owningElement = this;
    return style;
  };

  Object.defineProperty(HTMLElement.prototype, 'style', descriptor); // add computedFor to computed style-objects

  var originalGetComputed = getComputedStyle;

  window.getComputedStyle = function (el) {
    var style = originalGetComputed.apply(this, arguments);
    style.computedFor = el; //style.pseudoElt = pseudoElt; //not needed at the moment

    return style;
  }; // getPropertyValue / setProperty hooks


  var StyleProto = CSSStyleDeclaration.prototype;
  var oldGetP = StyleProto.getPropertyValue;

  StyleProto.getPropertyValue = function (property) {
    this.lastPropertyServedBy = false;
    property = property.trim();
    /* *
    if (this.owningElement) {
    	const ieProperty = '-ieVar-'+property;
    	const iePropertyImportant = '-ieVar-❗'+property;
    	let value = this[iePropertyImportant] || this[ieProperty];
    	if (value !== undefined) {
    		// todo, test if syntax valid
    		return value;
    	}
    }
    /* */

    if (property[0] !== '-' || property[1] !== '-') return oldGetP.apply(this, arguments);
    var undashed = property.substr(2);
    var ieProperty = '-ie-' + undashed;
    var iePropertyImportant = '-ie-❗' + undashed;
    var value = decodeValue(this[iePropertyImportant] || this[ieProperty]);

    if (this.computedFor) {
      // computedStyle
      if (value !== undefined && !inheritingKeywords[value]) {
        //if (regHasVar.test(value))  // todo: to i need this check?!!! i think its faster without
        value = styleComputeValueWidthVars(this, value);
        this.lastPropertyServedBy = this.computedFor;
      } else {
        // inherited
        if (inheritingKeywords[value] || !register[property] || register[property].inherits) {
          //let el = this.pseudoElt ? this.computedFor : this.computedFor.parentNode;
          var el = this.computedFor.parentNode;

          while (el.nodeType === 1) {
            // how slower would it be to getComputedStyle for every element, not just with defined ieCP_setters
            if (el.ieCP_setters && el.ieCP_setters[property]) {
              // i could make
              // value = el.nodeType ? getComputedStyle(this.computedFor.parentNode).getPropertyValue(property)
              // but i fear performance, stupid?
              var style = getComputedStyle(el);
              var tmpVal = decodeValue(style[iePropertyImportant] || style[ieProperty]);

              if (tmpVal !== undefined) {
                // calculated style from current element not from the element the value was inherited from! (style, value)
                //value = tmpVal; if (regHasVar.test(tmpVal))  // todo: to i need this check?!!! i think its faster without
                value = styleComputeValueWidthVars(this, tmpVal);
                this.lastPropertyServedBy = el;
                break;
              }
            }

            el = el.parentNode;
          }
        }
      }

      if (value === 'initial') return '';
    } //if ((value === undefined || value === 'initial') && register[property]) value = register[property].initialValue; // todo?


    if (value === undefined && register[property]) value = register[property].initialValue;
    if (value === undefined) return '';
    return value;
  };

  var inheritingKeywords = {
    inherit: 1,
    revert: 1,
    unset: 1
  };
  var oldSetP = StyleProto.setProperty;

  StyleProto.setProperty = function (property, value, prio) {
    if (property[0] !== '-' || property[1] !== '-') return oldSetP.apply(this, arguments);
    var el = this.owningElement;

    if (el) {
      if (!el.ieCP_setters) el.ieCP_setters = {};
      el.ieCP_setters[property] = 1;
    }

    property = '-ie-' + (prio === 'important' ? '❗' : '') + property.substr(2);
    this.cssText += '; ' + property + ':' + encodeValue(value) + ';'; //this[property] = value;

    el === document.documentElement && redrawStyleSheets();
    el && drawTree(el); // its delayed internal
  };
  /*
  var descriptor = Object.getOwnPropertyDescriptor(StyleProto, 'cssText');
  var cssTextGetter = descriptor.get;
  var cssTextSetter = descriptor.set;
  // descriptor.get = function () {
  // 	const style = styleGetter.call(this);
  // 	style.owningElement = this;
  // 	return style;
  // }
  descriptor.set = function (css) {
  	var el = this.owningElement;
  	if (el) {
  		css = rewriteCss('{'+css).substr(1);
  		cssTextSetter.call(this, css);
  		var found = parseRewrittenStyle(this);
  		if (found.getters) addGetterElement(el, found.getters, '%styleAttr');
  		if (found.setters) addSetterElement(el, found.setters);
  		return;
  	}
  	return cssTextSetter.call(this, css);
  }
  Object.defineProperty(StyleProto, 'cssText', descriptor);
  */


  if (!window.CSS) window.CSS = {};
  var register = {};

  CSS.registerProperty = function (options) {
    register[options.name] = options;
  }; // fix "initial" keyword with generated custom properties, this is not supported ad all by ie, should i make a separate "inherit"-polyfill?

  /*
  const computed = getComputedStyle(document.documentElement)
  const initials = {};
  for (let i in computed) {
  	initials[i.replace(/([A-Z])/, function(x){ return '-'+x.toLowerCase(x) })] = computed[i];
  }
  initials['display'] = 'inline';
  */
  // utils


  function fetchCss(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.overrideMimeType('text/css');

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        callback(request.responseText);
      }
    };

    request.send();
  }
}();

/***/ }),

/***/ "./src/scss/cookie-compliance-for-wordpress.scss":
/*!*******************************************************!*\
  !*** ./src/scss/cookie-compliance-for-wordpress.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**********************************************************************************************!*\
  !*** multi ./src/js/ie11CustomProperties.js ./src/scss/cookie-compliance-for-wordpress.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/beverleynewing/sites/wp-ppj/web/app/plugins/cookie-compliance-for-wordpress/src/js/ie11CustomProperties.js */"./src/js/ie11CustomProperties.js");
module.exports = __webpack_require__(/*! /Users/beverleynewing/sites/wp-ppj/web/app/plugins/cookie-compliance-for-wordpress/src/scss/cookie-compliance-for-wordpress.scss */"./src/scss/cookie-compliance-for-wordpress.scss");


/***/ })

/******/ });