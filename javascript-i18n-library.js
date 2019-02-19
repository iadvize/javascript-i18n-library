(function () {
  var i18nServiceFactory = require('./i18nServiceFactory');

  // Node
  if (typeof module !== 'undefined' && module.exports) {
    var numbro = require('numbro');
    var numbroLanguageLoader = require('./numbro-language-loader');
    numbroLanguageLoader(numbro);

    var momentTimezone = require('moment-timezone');
    var moment = require('moment/min/moment-with-locales');
    var libPhoneNumber = require('google-libphonenumber');
    module.exports = function (config) {
      // Pass moment with locales and moment-timezone because moment-timezone is not able to load all locales.
      return i18nServiceFactory(moment, momentTimezone, numbro, libPhoneNumber, config);
    };
  }

  // Browser
  if (typeof window !== 'undefined') {
    window.iadvize = window.iadvize || {};
    window.iadvize.i18nServiceFactory = function (config) {
      // Pass global moment twice because moment and moment-timezone are merged on desktop.
      return i18nServiceFactory(window.moment, window.moment, window.numbro, window.libPhoneNumber, config);
    };
  }
})();
