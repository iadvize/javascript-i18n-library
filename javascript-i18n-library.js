(function() {
  var i18nServiceFactory = function(moment, numbro, config) {
    var _config = {
      referenceTimezone: 'Europe/Paris',
      timezone: 'Europe/Paris',
      locale: 'fr-FR',
      dateFormat: 'DMY',
      isMeridianTime: false
    };

    var _formats = {
      date: {
        MDY: {
          short: 'MM/DD/YYYY',
          long: 'LL'
        },
        DMY: {
          short: 'DD/MM/YYYY',
          long: 'LL'
        },
        YMD: {
          short: 'YYYY-MM-DD',
          long: 'LL'
        }
      },
      time: {
        meridian: {
          short: 'h:mm a',
          long: 'h:mm:ss a'
        },
        h24: {
          short: 'HH:mm',
          long: 'HH:mm:ss'
        }
      }
    };

    var _parseDateTime = function(dateTimeString) {
      var parsedDateTime = moment.tz(
        dateTimeString,
        moment.ISO_8601,
        _config.referenceTimezone);
      if (!parsedDateTime.isValid()) {
        throw 'i18n : bad date format for input "' + dateTimeString + '", expect ISO_8601 format.';
      }

      var timeZonedDateTime;
      if (_config.offset !== undefined) {
        timeZonedDateTime = parsedDateTime.utc().add(_config.offset, 'minutes');
      } else {
        timeZonedDateTime = moment.tz(parsedDateTime, _config.timezone);
      }

      return timeZonedDateTime.locale(_config.locale);
    };

    var _mergeConfiguration = function(baseConfig, overrideConfig) {
      var stampConfig = JSON.parse(JSON.stringify(baseConfig));
      for (var key in overrideConfig) {
        stampConfig[key] = overrideConfig[key];
      }

      return stampConfig;
    };

    if (!!config) {
      _config = _mergeConfiguration(_config, config);
    }

    _config.timeFormat = _config.isMeridianTime ? 'meridian' : 'h24';

    return {
      formatDateTime: function(dateTimeString, formatType) {
        var timeZonedDateTime = _parseDateTime(dateTimeString);
        var dateFormat = _formats.date[_config.dateFormat].short;
        var timeFormat = _formats.time[_config.timeFormat].short;
        if (formatType === this.formats.LONG) {
          dateFormat = _formats.date[_config.dateFormat].long;
          timeFormat = _formats.time[_config.timeFormat].long;
        }

        return timeZonedDateTime.format(dateFormat + ' ' + timeFormat);
      },
      formatDate: function(dateTimeString, formatType) {
        var timeZonedDateTime = _parseDateTime(dateTimeString);
        var dateFormat = _formats.date[_config.dateFormat].short;
        if (formatType === this.formats.LONG) {
          dateFormat = _formats.date[_config.dateFormat].long;
        }

        return timeZonedDateTime.format(dateFormat);
      },
      formatTime: function(dateTimeString, formatType) {
        var timeZonedDateTime = _parseDateTime(dateTimeString);
        var timeFormat = _formats.time[_config.timeFormat].short;
        if (formatType === this.formats.LONG) {
          var timeFormat = _formats.time[_config.timeFormat].long;
        }

        return timeZonedDateTime.format(timeFormat);
      },
      formatCurrency: function(value, decimalCount) {
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
    module.exports = function(config) {
      return i18nServiceFactory(moment, numbro, config);
    };
  }

  // Browser
  if (typeof window !== 'undefined') {
    window.iadvize = window.iadvize || {};
    window.iadvize.i18nServiceFactory = function(config) {
      return i18nServiceFactory(window.moment, window.numbro, config);
    };
  }
})();
