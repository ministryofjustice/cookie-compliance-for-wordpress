!function(){"use strict";var e=document.createElement("i");if(e.style.setProperty("--x","y"),"y"!==e.style.getPropertyValue("--x")&&e.msMatchesSelector){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector);var t,r=[],n=document,i=!1;document.addEventListener("DOMContentLoaded",(function(){i=!0})),"classList"in Element.prototype||H("classList",HTMLElement.prototype,Element.prototype),"innerHTML"in Element.prototype||H("innerHTML",HTMLElement.prototype,Element.prototype),"sheet"in SVGStyleElement.prototype||Object.defineProperty(SVGStyleElement.prototype,"sheet",{get:function(){for(var e,t=document.styleSheets,r=0;e=t[r++];)if(e.ownerNode===this)return e}});var o=/([\s{;])(--([A-Za-z0-9-_]*)\s*:([^;!}{]+)(!important)?)(?=\s*([;}]|$))/g,s=/([{;]\s*)([A-Za-z0-9-_]+\s*:[^;}{]*var\([^!;}{]+)(!important)?(?=\s*([;}$]|$))/g,a=/-ieVar-([^:]+):/g,c=/-ie-([^};]+)/g,l=/:(hover|active|focus|target|:before|:after|:first-letter|:first-line)/;w('link[rel="stylesheet"]',(function(e){var t,r,n;t=e.href,r=function(t){var r=O(t);if(t!==r){r=function(e,t){return t.replace(/url\(([^)]+)\)/g,(function(t,r){return(r=r.trim().replace(/(^['"]|['"]$)/g,"")).match(/^([a-z]+:|\/)/)?t:"url("+(e=e.replace(/\?.*/,""))+"./../"+r+")"}))}(e.href,r),e.disabled=!0;var n=document.createElement("style");e.media&&n.setAttribute("media",e.media),e.parentNode.insertBefore(n,e),q(n,r)}},(n=new XMLHttpRequest).open("GET",t),n.overrideMimeType("text/css"),n.onload=function(){n.status>=200&&n.status<400&&r(n.responseText)},n.send()})),w("style",(function(e){if(!e.ieCP_polyfilled&&!e.ieCP_elementSheet){var t=O(e.innerHTML);e.innerHTML!==t&&q(e,t)}})),w("[ie-style]",(function(e){var t=O("{"+e.getAttribute("ie-style")).substr(1);e.style.cssText+=";"+t;var r=B(e.style);r.getters&&D(e,r.getters,"%styleAttr"),r.setters&&R(e,r.setters)}));var u={},f={hover:{on:"mouseenter",off:"mouseleave"},focus:{on:"focusin",off:"focusout"},active:{on:"CSSActivate",off:"CSSDeactivate"}},p=null;document.addEventListener("mousedown",(function(e){setTimeout((function(){if(e.target===document.activeElement){var t=document.createEvent("Event");t.initEvent("CSSActivate",!0,!0),(p=e.target).dispatchEvent(t)}}))})),document.addEventListener("mouseup",(function(){if(p){var e=document.createEvent("Event");e.initEvent("CSSDeactivate",!0,!0),p.dispatchEvent(e),p=null}}));var d=0,v=new Set,m=!1,y=!1,h=new MutationObserver((function(e){if(!y)for(var t,r=0;t=e[r++];)"iecp-needed"!==t.attributeName&&G(t.target)}));setTimeout((function(){h.observe(document,{attributes:!0,subtree:!0})}));var E=location.hash;addEventListener("hashchange",(function(e){var t=document.getElementById(location.hash.substr(1));if(t){var r=document.getElementById(E.substr(1));G(t),G(r)}else G(document);E=location.hash}));var S=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"style"),P=S.get;S.get=function(){var e=P.call(this);return e.owningElement=this,e},Object.defineProperty(HTMLElement.prototype,"style",S);var g=getComputedStyle;window.getComputedStyle=function(e){var t=g.apply(this,arguments);return t.computedFor=e,t};var C=CSSStyleDeclaration.prototype,b=C.getPropertyValue;C.getPropertyValue=function(e){if(this.lastPropertyServedBy=!1,"-"!==(e=e.trim())[0]||"-"!==e[1])return b.apply(this,arguments);var t=e.substr(2),r="-ie-"+t,n="-ie-❗"+t,i=this[n]||this[r];if(this.computedFor){if(void 0===i||T[i]){if(T[i]||!_[e]||_[e].inherits)for(var o=this.computedFor.parentNode;1===o.nodeType;){if(o.ieCP_setters&&o.ieCP_setters[e]){var s=getComputedStyle(o),a=s[n]||s[r];if(void 0!==a){i=W(this,a),this.lastPropertyServedBy=o;break}}o=o.parentNode}}else i=W(this,i),this.lastPropertyServedBy=this.computedFor;if("initial"===i)return""}return void 0===i&&_[e]&&(i=_[e].initialValue),void 0===i?"":i};var T={inherit:1,revert:1,unset:1},L=C.setProperty;C.setProperty=function(e,t,r){if("-"!==e[0]||"-"!==e[1])return L.apply(this,arguments);var n=this.owningElement;n&&(n.ieCP_setters||(n.ieCP_setters={}),n.ieCP_setters[e]=1),e="-ie-"+("important"===r?"❗":"")+e.substr(2),this.cssText+="; "+e+":"+t+";",n===document.documentElement&&j(),n&&G(n)},window.CSS||(window.CSS={});var _={};CSS.registerProperty=function(e){_[e.name]=e}}function M(e,t){try{return e.querySelectorAll(t)}catch(e){return[]}}function w(e,i){for(var o,s={selector:e,callback:i,elements:new WeakMap},a=M(n,s.selector),c=0;o=a[c++];)s.elements.set(o,!0),s.callback.call(o,o);r.push(s),t||(t=new MutationObserver(V)).observe(n,{childList:!0,subtree:!0}),A(s)}function A(e,t){var r,o=0,s=[];try{t&&t.matches(e.selector)&&s.push(t)}catch(e){}for(i&&Array.prototype.push.apply(s,M(t||n,e.selector));r=s[o++];)e.elements.has(r)||(e.elements.set(r,!0),e.callback.call(r,r))}function x(e){for(var t,n=0;t=r[n++];)A(t,e)}function V(e){for(var t,r,n,i,o=0;r=e[o++];)for(n=r.addedNodes,t=0;i=n[t++];)1===i.nodeType&&x(i)}function H(e,t,r){var n=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(r,e,n)}function O(e){return e.replace(o,(function(e,t,r,n,i,o){return t+"-ie-"+(o?"❗":"")+n+":"+i})).replace(s,(function(e,t,r,n){return t+"-ieVar-"+(n?"❗":"")+r+"; "+r}))}function B(e){e["z-index"];var t,r,n=[],i={},o=e.cssText,s=o.match(a);if(s)for(t=0;r=s[t++];){var l=r.slice(7,-1);"!"===l[0]&&(l=l.substr(1)),n.push(l),u[l]||(u[l]=[]),u[l].push(e)}var f=o.match(c);if(f)for(t=0;r=f[t++];){var p=r.substr(4).split(":"),d=p[0],v=p[1];"!"===d[0]&&(d=d.substr(1)),i[d]=v}return{getters:n,setters:i}}function q(e,t){e.innerHTML=t,e.ieCP_polyfilled=!0;for(var r,n=e.sheet.rules,i=0;r=n[i++];){var o=B(r.style);o.getters&&k(r.selectorText,o.getters),o.setters&&N(r.selectorText,o.setters);var s=r.parentRule&&r.parentRule.media&&r.parentRule.media.mediaText;s&&(o.getters||o.setters)&&matchMedia(s).addListener((function(){G(document.documentElement)}))}j()}function k(e,t){F(e),w(z(e),(function(r){D(r,t,e),I(r)}))}function D(e,t,r){var n,i,o=0,s=r.split(",");for(e.setAttribute("iecp-needed",!0),e.ieCPSelectors||(e.ieCPSelectors={});n=t[o++];)for(i=0;r=s[i++];){var a=r.trim().split("::");e.ieCPSelectors[n]||(e.ieCPSelectors[n]=[]),e.ieCPSelectors[n].push({selector:a[0],pseudo:a[1]?"::"+a[1]:""})}}function N(e,t){F(e),w(z(e),(function(e){R(e,t)}))}function R(e,t){for(var r in e.ieCP_setters||(e.ieCP_setters={}),t)e.ieCP_setters["--"+r]=1;G(e)}function j(){for(var e in u){var t=u[e],r=0;for(style;style=t[r++];){var n=style["-ieVar-"+e];if(!style.owningElement&&n&&""!==(n=W(getComputedStyle(document.documentElement),n)))try{style[e]=n}catch(e){}}}}function F(e){for(var t in e=e.split(",")[0],f){var r=e.split(":"+t);r.length>1&&function(){var e=r[1].match(/^[^\s]*/),n=z(r[0]+e),i=f[t];w(n,(function(e){e.addEventListener(i.on,Z),e.addEventListener(i.off,Z)}))}()}}function z(e){return e.replace(l,"").replace(":not()","")}function $(e){e.ieCP_unique||(e.ieCP_unique=++d,e.classList.add("iecp-u"+e.ieCP_unique));var t=getComputedStyle(e),r="";for(var n in e.ieCPSelectors){var i=t["-ieVar-❗"+n],o=i||t["-ieVar-"+n];if(o){var s={},a=W(t,o,s);i&&(a+=" !important");for(var c,l=0;c=e.ieCPSelectors[n][l++];)if("%styleAttr"===c.selector)e.style[n]=a;else{if(!i&&!1!==s.allByRoot)continue;r+=c.selector+".iecp-u"+e.ieCP_unique+c.pseudo+"{"+n+":"+a+"}\n"}}}!function(e,t){if(!e.ieCP_styleEl&&t){var r=document.createElement("style");r.ieCP_elementSheet=1,document.head.appendChild(r),e.ieCP_styleEl=r}e.ieCP_styleEl&&(e.ieCP_styleEl.innerHTML=t)}(e,r)}function G(e){if(e){var t=e.querySelectorAll("[iecp-needed]");e.hasAttribute&&e.hasAttribute("iecp-needed")&&I(e);for(var r,n=0;r=t[n++];)I(r)}}function I(e){v.add(e),m||(m=!0,requestAnimationFrame((function(){m=!1,y=!0,v.forEach($),v.clear(),setTimeout((function(){y=!1}))})))}function Z(e){G(e.target)}function W(e,t,r){return function(e,t){for(var r,n,i=0,o=null,s=0,a="",c=0;r=e[c++];){if("("===r&&(++i,null===o&&e[c-4]+e[c-3]+e[c-2]==="var"&&(o=i,a+=e.substring(s,c-4),s=c),e[c-5]+e[c-4]+e[c-3]+e[c-2]==="calc"&&(n=i)),")"===r&&o===i){var l=e.substring(s,c-1).trim(),u=void 0,f=l.indexOf(",");-1!==f&&(u=l.slice(f+1),l=l.slice(0,f)),a+=t(l,u,n),s=c,o=null}")"===r&&n===--i&&(n=null)}return a+e.substring(s)}(t,(function(t,n,i){var o=e.getPropertyValue(t);return i&&(o=o.replace(/^calc\(/,"(")),r&&e.lastPropertyServedBy!==document.documentElement&&(r.allByRoot=!1),""===o&&n&&(o=W(e,n,r)),o}))}}();