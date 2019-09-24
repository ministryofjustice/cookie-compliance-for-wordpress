(function ($) {
	'use strict';

	// This enables you to define handlers for when the DOM is ready
	$(
		function () {

			var cookieBanner = {

				init: function () {
					this.cacheDom();
					this.bindEvents();
				},
				cacheDom: function () {
					this.$el = $('#global-cookie-message');
					this.$buttonAccept = this.$el.find('button');
				},
				bindEvents: function () {
					this.$buttonAccept.on('click', this.hideCookieMessage.bind(this));
				},
				hideCookieMessage: function () {
					this.$el.hide();
					this.setCookie('ccfw_cookie_policy', 'seen_cookie_message_accepted', 365);
				},
				setCookie: function (name, value, days) {
					var d = new Date();
					d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
					document.cookie = name + "=" + value + "; path=/; expires=" + d.toGMTString();
				},
				getCookie: function (name) {
					var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
					return v ? v[2] : null;
				},
				gaRegEx: function () {
					var page = $('html').text();
					var gTagManagerID = /GTM-[a-zA-Z0-9]+/g;
					var foundID = page.match(gTagManagerID);
					console.log(foundID[0])
				}
			};

			var cookiePageSettings = {

				init: function () {
					this.cacheDom();
					this.bindEvents();
					this.disableEnableGA();
				},
				cacheDom: function () {
					this.$el = $('#ccfw-settings-page');
					this.$googleYes = this.$el.find('#ga-yes');
					this.$googleNo = this.$el.find('#ga-no');
				},
				bindEvents: function () {
					this.$googleNo.on('click', this.setGACookieTrue.bind(this));
					this.$googleYes.on('click', this.setGACookieFalse.bind(this));
				},
				setGACookieTrue: function () {
					this.setCookie('ccfw_cookie_policy', 'true', 365);
				},
				setGACookieFalse: function () {
					this.setCookie('ccfw_cookie_policy', 'false', 365);
				},
				setCookie: function (name, value, days) {
					var d = new Date();
					d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
					document.cookie = name + '=' + value + "; path=/; expires=" + d.toGMTString();
				},
				disableEnableGA: function () {

					// get the set cookie value (true or false)
					var x = this.getCookieValue('ccfw_cookie_policy');

					// convert the cookie string to a boolean var for GA
					if (x == 'true') {
						x = true;
						this.$googleNo.prop("checked", true);
					} else {
						x = false;
						this.$googleYes.prop("checked", true);
					}

					// access the Google Analytic method and then set tracking to true or false
					ga(
						function (tracker) {
							window['ga-disable-UA-' + tracker.get('trackingId')] = x;
						}
					);

				},
				getCookieValue: function (name) {
					var value = "; " + document.cookie;
					var parts = value.split("; " + name + "=");
					if (parts.length == 2) {
						return parts.pop().split(";").shift();
					}
				}
			};

			cookieBanner.init();
			cookiePageSettings.init();

		}
	);

})(jQuery);