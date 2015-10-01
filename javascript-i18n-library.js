(function () {
  var i18nServiceFactory = function (moment, numbro, config) {
    var _config = {
      referenceTimezone: 'Europe/Paris',
      targetTimezone: 'Europe/Paris',
      locale: 'fr-FR',
      shortDateFormat: 'DD/MM/YYYY',
      longDateFormat: 'LL',
      shortTimeFormat: 'HH:mm',
      longTimeFormat: 'HH:mm:ss'
    };

    var _parseDateTime = function (dateTimeString) {
      var parsedDateTime = moment.tz(
        dateTimeString,
        moment.ISO_8601,
        _config.referenceTimezone);
      if (!parsedDateTime.isValid()) {
        throw 'Bad date format for input "' + dateTimeString + '", expect ISO_8601 format.';
      }

      var timeZonedDateTime = moment.tz(parsedDateTime, _config.targetTimezone);
      return timeZonedDateTime.locale(_config.locale);
    };

    var _mergeConfiguration = function (baseConfig, overrideConfig) {
      var stampConfig = JSON.parse(JSON.stringify(baseConfig));
      for (var key in overrideConfig) {
        stampConfig[key] = overrideConfig[key];
      }

      return stampConfig;
    };

    if (!!config) {
      _config = _mergeConfiguration(_config, config);
    }

    return {
      formatDateTime: function (dateTimeString, formatType) {
        var timeZonedDateTime = _parseDateTime(dateTimeString);
        var dateFormat = _config.shortDateFormat;
        var timeFormat = _config.shortTimeFormat;
        if (formatType === this.formats.LONG) {
          dateFormat = _config.longDateFormat;
          timeFormat = _config.longTimeFormat;
        }

        return timeZonedDateTime.format(dateFormat + ' ' + timeFormat);
      },
      formatDate: function (dateTimeString, formatType) {
        var timeZonedDateTime = _parseDateTime(dateTimeString);
        var dateFormat = _config.shortDateFormat;
        if (formatType === this.formats.LONG) {
          dateFormat = _config.longDateFormat;
        }

        return timeZonedDateTime.format(dateFormat);
      },
      formatTime: function (dateTimeString, formatType) {
        var timeZonedDateTime = _parseDateTime(dateTimeString);
        var timeFormat = _config.shortTimeFormat;
        if (formatType === this.formats.LONG) {
          timeFormat = _config.longTimeFormat;
        }

        return timeZonedDateTime.format(timeFormat);
      },
      formatCurrency: function (value, decimalCount) {
        var oldLanguage = numbro.language();
        numbro.language(_config.locale);
        if (decimalCount === undefined) {
          decimalCount = 2;
        }

        var decimalPattern = Array(decimalCount + 1).join('0');
        var valueFormated = numbro(value).formatCurrency('0,0[.]' + decimalPattern);
        numbro.language(oldLanguage);
        return valueFormated;
      },
      formats: {
        SHORT: "SHORT",
        LONG: "LONG"
      }
    };
  };

  // Node
  if (typeof module !== 'undefined' && module.exports) {
    var numbro = require("numbro");
    var moment = require("moment-timezone");
    module.exports = function (config) {
      return i18nServiceFactory(moment, numbro, config);
    };
  }

  // Browser
  if (typeof window !== 'undefined') {
    window.iadvize = window.iadvize || {};
    window.iadvize.i18nServiceFactory = function (config) {
      return i18nServiceFactory(window.moment, window.numbro, config);
    };
  }
})();
