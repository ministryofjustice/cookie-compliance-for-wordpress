!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=4)}({4:function(e,t,n){e.exports=n(5)},5:function(e,t){!function(e){"use strict";e((function(){var t={init:function(){this.$el=e("#ccfw-page-banner"),this.$body=e("body"),this.$html=e("html")}},n={init:function(){this.cacheDom()},cacheDom:function(){this.$el=t.$el,this.$settingsModal=this.$el.find("#cookie-popup"),this.$body=t.$body,this.$html=t.$html},getCookie:function(e){var t=("; "+document.cookie).split("; "+e+"=");if(2===t.length)return t.pop().split(";").shift()},setCookie:function(e,t,n){var i=new Date;i.setTime(i.getTime()+864e5*n),document.cookie=e+"="+t+"; path=/; expires="+i.toGMTString()},deleteCookie:function(e){document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"},checkForCookie:function(e){return void 0!==this.getCookie(e)},hideBanner:function(){this.$el.hide()},hideSettingsModal:function(){this.$settingsModal.hide(),this.$body.removeClass("ccfw-modal-open"),this.$el.removeClass("ccfw-cookie-banner-open"),this.$html.removeClass("ccfw-cookie-banner-open"),this.$body.removeClass("ccfw-cookie-banner-open")},showSettingsModal:function(){this.$settingsModal.show(),this.$body.addClass("ccfw-modal-open"),this.$el.addClass("ccfw-cookie-banner-open"),this.$html.addClass("ccfw-cookie-banner-open"),this.$body.addClass("ccfw-cookie-banner-open"),o.trapSettingsFocus()}},i={init:function(){this.cacheDom(),this.bindEvents(),this.bannerDisplay()},cacheDom:function(){this.$el=t.$el,this.$buttonAccept=this.$el.find("#cookie-accept"),this.$buttonDecline=this.$el.find("#cookie-decline"),this.$buttonInfo=this.$el.find("#cookie-more-info")},bannerDisplay:function(){!0===n.checkForCookie("ccfw_wp_plugin.banner.hidden")?n.hideBanner():(this.$el.show(),this.trapBannerFocus())},bindEvents:function(){this.$buttonAccept.on("click",this.acceptAllButton.bind(this)),this.$buttonDecline.on("click",this.declineAllButton.bind(this)),this.$buttonInfo.on("click",this.chooseCookieSettingsButton.bind(this))},trapBannerFocus:function(){var t=e(".ccfw-banner__buttons"),n=e(".ccfw-banner__buttons #cookie-accept, .ccfw-banner__buttons #cookie-decline, .ccfw-banner__buttons #cookie-more-info"),i=n[0],o=n[n.length-1];t.on("keydown",(function(e){var t="Tab"===e.key;console.log(n),t&&(e.shiftKey?document.activeElement===i&&(o.focus(),e.preventDefault()):document.activeElement===o&&(i.focus(),e.preventDefault()))}))},acceptAllButton:function(){n.setCookie("ccfw_wp_plugin.banner.hidden","true",365),n.setCookie("ccfw_wp_plugin.ga.accept","true",365),n.hideBanner()},declineAllButton:function(){n.setCookie("ccfw_wp_plugin.banner.hidden","true",365),n.hideBanner()},chooseCookieSettingsButton:function(){n.showSettingsModal()}},o={init:function(){this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$el=t.$el,this.$settingsModal=this.$el.find("#cookie-popup"),this.$buttonAccept=this.$settingsModal.find("#cookie-accept"),this.$buttonDecline=this.$settingsModal.find("#cookie-decline"),this.$buttonInfo=this.$settingsModal.find("#cookie-more-info"),this.$buttonSavePreferences=this.$settingsModal.find("#cookie-save-preferences"),this.$GAcheckBox=this.$settingsModal.find("#ccfw-analytics-cookies-toggle"),this.$buttonModalClose=this.$settingsModal.find("#ccfw-modal-close"),this.$body=t.$body},bindEvents:function(){this.$buttonModalClose.on("click",this.modalDisplay.bind(this)),this.$buttonInfo.on("click",this.trapSettingsFocus.bind(this)),this.$buttonSavePreferences.on("click",this.saveCookiePreferences.bind(this)),this.$GAcheckBox.on("click",this.toggleAriaPressed.bind(this))},modalDisplay:function(){n.hideSettingsModal()},toggleAriaPressed:function(){var e="true"===this.$GAcheckBox.attr("aria-pressed");this.$GAcheckBox.attr("aria-pressed",!e)},trapSettingsFocus:function(){this.$settingsModal.focus();var t=e('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]'),i=t[0],o=t[t.length-1];this.$el.on("keydown",(function(e){"Escape"===e.key&&n.hideSettingsModal(),"Tab"===e.key&&(e.shiftKey?document.activeElement===i&&(o.focus(),e.preventDefault()):document.activeElement===o&&(i.focus(),e.preventDefault()))}))},saveCookiePreferences:function(){var e="true"===this.$GAcheckBox.attr("aria-pressed");!0===e&&n.setCookie("ccfw_wp_plugin.ga.accept","true",365),!1===e&&n.checkForCookie("ccfw_wp_plugin.ga.accept")&&n.deleteCookie("ccfw_wp_plugin.ga.accept"),n.setCookie("ccfw_wp_plugin.banner.hidden","true",365),n.hideBanner(),n.hideSettingsModal()}};t.init(),n.init(),i.init(),o.init()}))}(jQuery)}});