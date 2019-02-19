(function () {
  var i18nServiceFactory = require('./i18nServiceFactory')

  window.iadvize = window.iadvize || {};
  window.iadvize.i18nServiceFactory = function (config) {
    // Pass global moment twice because moment and moment-timezone are merged on desktop.
    return i18nServiceFactory(window.moment, window.moment, window.numbro, window.libPhoneNumber, config);
  };
})();
