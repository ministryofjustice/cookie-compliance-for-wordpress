(()=>{"use strict";var t,e={466:()=>{var t={gtm:("; "+document.cookie).split("; ccfw_gtm_id=").pop().split(";").shift(),gtmID:document.getElementById("ccfw-page-banner").getAttribute("data-gtm-id"),canRun:function(t){return t.startsWith("GTM")||!1},allowedIds:[],selector:{all:{accept:"cookie-accept",decline:"cookie-decline"},moreInfo:"cookie-more-info",settings:"js-ccfw-settings-button",toggles:"ccfw-banner__toggle-slider"},storage:{time:{get:function(){return JSON.parse(window.localStorage.getItem("ccfw-time"))},set:function(){return window.localStorage.setItem("ccfw-time",JSON.stringify(new Date((new Date).setFullYear((new Date).getFullYear()+1)).getTime()))}},allowed:{get:function(){return JSON.parse(window.localStorage.getItem("ccfw-gtm-allowed"))},set:function(t){return window.localStorage.setItem("ccfw-gtm-allowed",JSON.stringify(t))}},bannerHidden:{get:function(){return JSON.parse(window.localStorage.getItem("ccfw-banner-hidden"))},set:function(t){return window.localStorage.setItem("ccfw-banner-hidden",JSON.stringify(t))}},clear:function(t){return window.localStorage.removeItem(t)}},listItem:{set:function(e){dataLayer[0]["gtm.allowlist"]=e,t.storage.allowed.set(e)},clear:function(t,e){dataLayer[0][t].forEach((function(t,o,n){t===e&&n.splice(o,1)}))}},trackEvent:function(t,e){e?dataLayer.push(jQuery.extend({},{event:t},e)):dataLayer.push({event:t})},jqTarget:function(t){return jQuery(t.target)},clearStorage:function(){var e=t.storage.time.get();(new Date).getTime()>e&&(t.storage.clear("ccfw-gtm-allowed"),t.storage.clear("ccfw-banner-hidden"),t.storage.clear("ccfw-time"))},toggleAll:function(e){var o=t.storage.allowed.get()||[];return e&&(o=[]),jQuery("."+t.selector.toggles).each((function(t,n){var i=jQuery(n).data("allowlist");e?(jQuery(n).attr("aria-checked",!1),jQuery("#ccfw-"+i+"-toggle-off").removeAttr("aria-hidden").show(),jQuery("#ccfw-"+i+"-toggle-on").attr("aria-hidden","true").hide()):(-1===o.indexOf(i)&&o.push(i),jQuery(n).attr("aria-checked",!0),jQuery("#ccfw-"+i+"-toggle-on").removeAttr("aria-hidden").show(),jQuery("#ccfw-"+i+"-toggle-off").attr("aria-hidden","true").hide())})),o},manageAll:function(e,o,n){if(e){var i=jQuery("."+t.selector.toggles).length-1;return"all"!==o&&(n&&(e=e.filter((function(t){return"all"!==t})),jQuery("#ccfw-all-toggle-off").removeAttr("aria-hidden").show(),jQuery("#ccfw-all-toggle-on").attr("aria-hidden","true").hide(),0===e.length&&jQuery('button[data-allowlist="all"]').attr("aria-checked",!1)),e.length>0&&jQuery('button[data-allowlist="all"]').attr("aria-checked",!0),i===e.length&&(-1===e.indexOf("all")&&e.push("all"),jQuery("#ccfw-all-toggle-on").removeAttr("aria-hidden").show(),jQuery("#ccfw-all-toggle-off").attr("aria-hidden","true").hide(),jQuery('button[data-allowlist="all"]').attr("aria-checked",!0))),e}}};function e(t){t.includes("ua")||(o("_ga"),o("_ga_"),n("_gid"),o("_gat")),t.includes("html")||(n("fr"),n("tr"),n("_fbc"),n("_fbp"),n("PSUK_source")),t.includes("gclidw")||(n("_gcl_au"),n("_gcl_dc"),n("_gcl_aw"))}function o(t){n(t);for(var e=document.cookie.split(";"),o=0;o<e.length;o++){var i=e[o].trim();if(i){var a=i.indexOf("="),c=a>-1?i.substr(0,a):i;c.substring(0,t.length)==t&&n(c)}}}function n(t){document.cookie=t+"=; expires=Sun, 01 May 1707 00:00:00 UTC; path=/;",document.cookie=t+"=; expires=Sun, 01 May 1707 00:00:00 UTC; path=/;domain="+location.host,document.cookie=t+"=; expires=Sun, 01 May 1707 00:00:00 UTC; path=/;domain=."+location.host;var e=location.host.split(".");e.length>=3&&(e[0]=""),e=e.join("."),document.cookie=t+"=; expires=Sun, 01 May 1707 00:00:00 UTC; path=/;domain="+e}!function(o){o((function(o){var n={init:function(){this.$el=o("#ccfw-page-banner"),this.$notEl=o("#ccfw-page-banner ~ *"),this.$body=o("body"),this.$html=o("html")}},i={init:function(){this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$el=n.$el,this.$notEl=n.$notEl,this.$settingsModal=this.$el.find("#cookie-popup"),this.$body=n.$body,this.$html=n.$html,this.$cookieSettingsButton=this.$body.find("#js-ccfw-settings-button")},bindEvents:function(){this.$cookieSettingsButton.on("click",this.showBanner.bind(this))},showBanner:function(){this.$el.show(),this.$cookieSettingsButton.hide(),o([document.documentElement,document.body]).animate({scrollTop:o("#ccfw-page-banner").offset().top},200)},hideBanner:function(){this.$el.hide(),this.$cookieSettingsButton.show()},hideSettingsModal:function(){this.$settingsModal.hide(),this.$body.removeClass("ccfw-modal-open"),this.$el.removeClass("ccfw-cookie-banner-open"),this.$html.removeClass("ccfw-cookie-banner-open"),this.$body.removeClass("ccfw-cookie-banner-open"),this.$notEl.removeAttr("aria-hidden")},showSettingsModal:function(){this.$settingsModal.show(),this.$body.addClass("ccfw-modal-open"),this.$el.addClass("ccfw-cookie-banner-open"),this.$html.addClass("ccfw-cookie-banner-open"),this.$body.addClass("ccfw-cookie-banner-open"),this.$notEl.attr("aria-hidden","true"),c.trapSettingsFocus(),this.$el.scrollTop(0);var e=t.storage.allowed.get()||[];o("."+t.selector.toggles).each((function(t,n){var i=o(n).data("allowlist");-1!==e.indexOf(i)?(o(n).attr("aria-checked",!0),o("#ccfw-"+i+"-toggle-on").removeAttr("aria-hidden").show(),o("#ccfw-"+i+"-toggle-off").attr("aria-hidden","true").hide()):(o(n).attr("aria-checked",!1),o("#ccfw-"+i+"-toggle-off").removeAttr("aria-hidden").show(),o("#ccfw-"+i+"-toggle-on").attr("aria-hidden","true").hide())}))}},a={init:function(){this.cacheDom(),this.bindEvents(),this.bannerDisplay()},cacheDom:function(){this.$el=n.$el,this.$buttonAccept=this.$el.find("#cookie-accept"),this.$buttonDecline=this.$el.find("#cookie-decline"),this.$buttonInfo=this.$el.find("#cookie-more-info")},bindEvents:function(){this.$buttonAccept.on("click",this.acceptAllButton.bind(this)),this.$buttonDecline.on("click",this.declineAllButton.bind(this)),this.$buttonInfo.on("click",this.chooseCookieSettingsButton.bind(this))},bannerDisplay:function(){t.storage.bannerHidden.get()?i.hideBanner():i.showBanner()},acceptAllButton:function(){return t.listItem.set(t.toggleAll(!1)),t.storage.time.set(),t.storage.bannerHidden.set(!0),i.hideBanner(),window.location.reload(!1),!1},declineAllButton:function(){return t.listItem.set(t.toggleAll(!0)),t.storage.time.set(),t.storage.bannerHidden.set(!0),i.hideBanner(),e(t.storage.allowed.get()),window.location.reload(!1),!1},chooseCookieSettingsButton:function(){i.showSettingsModal()}},c={init:function(){this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$el=n.$el,this.$settingsModal=this.$el.find("#cookie-popup"),this.$buttonAccept=this.$settingsModal.find("#cookie-accept"),this.$buttonDecline=this.$settingsModal.find("#cookie-decline"),this.$buttonInfo=this.$settingsModal.find("#cookie-more-info"),this.$buttonSavePreferences=this.$settingsModal.find("#cookie-save-preferences"),this.$buttonModalClose=this.$settingsModal.find("#ccfw-modal-close"),this.$body=n.$body},bindEvents:function(){this.$buttonModalClose.on("click",this.modalDisplay.bind(this)),this.$buttonInfo.on("click",this.trapSettingsFocus.bind(this)),this.$buttonSavePreferences.on("click",this.saveCookiePreferences.bind(this))},modalDisplay:function(){i.hideSettingsModal()},trapSettingsFocus:function(){this.$settingsModal.focus();var t=o('#cookie-popup a[href], #cookie-popup details, #cookie-popup button, #cookie-popup input[type="checkbox"]'),e=t[0],n=t[t.length-1];this.$el.on("keydown",(function(t){"Escape"===t.key&&i.hideSettingsModal(),"Tab"===t.key&&(t.shiftKey?document.activeElement===e&&(n.focus(),t.preventDefault()):document.activeElement===n&&(e.focus(),t.preventDefault()))}))},saveCookiePreferences:function(){return t.storage.bannerHidden.set("true"),t.storage.time.set(),i.hideBanner(),i.hideSettingsModal(),e(t.storage.allowed.get()),window.location.reload(!1),!1}};n.init(),i.init(),a.init(),c.init(),t.manageAll(t.storage.allowed.get(),"init",!0)}));var n,i=o("footer").css("paddingBottom"),a=(n=94,1*i.replace("px","")+n);o("footer").css("paddingBottom",a+"px")}(jQuery)},885:()=>{},521:()=>{},866:()=>{}},o={};function n(t){var i=o[t];if(void 0!==i)return i.exports;var a=o[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.m=e,t=[],n.O=(e,o,i,a)=>{if(!o){var c=1/0;for(d=0;d<t.length;d++){for(var[o,i,a]=t[d],s=!0,r=0;r<o.length;r++)(!1&a||c>=a)&&Object.keys(n.O).every((t=>n.O[t](o[r])))?o.splice(r--,1):(s=!1,a<c&&(c=a));if(s){t.splice(d--,1);var l=i();void 0!==l&&(e=l)}}return e}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[o,i,a]},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={239:0,773:0,944:0,470:0};n.O.j=e=>0===t[e];var e=(e,o)=>{var i,a,[c,s,r]=o,l=0;if(c.some((e=>0!==t[e]))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(r)var d=r(n)}for(e&&e(o);l<c.length;l++)a=c[l],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(d)},o=self.webpackChunkcookie_compliance_for_wordpress=self.webpackChunkcookie_compliance_for_wordpress||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})(),n.O(void 0,[773,944,470],(()=>n(466))),n.O(void 0,[773,944,470],(()=>n(885))),n.O(void 0,[773,944,470],(()=>n(521)));var i=n.O(void 0,[773,944,470],(()=>n(866)));i=n.O(i)})();