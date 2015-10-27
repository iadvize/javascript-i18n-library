(function() {
  var i18nServiceFactory = function(moment, momentTimezone, numbro, config) {
    var _config = {
      referenceTimezone: 'Europe/Paris',
      timezone: 'Europe/Paris',
      locale: 'fr-FR',
      currency: 'EUR',
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

    var _mergeConfiguration = function(baseConfig, overrideConfig) {
      var stampConfig = JSON.parse(JSON.stringify(baseConfig));
      for (var key in overrideConfig) {
        stampConfig[key] = overrideConfig[key];
      }

      return stampConfig;
    };

    var _parseTimestamp = function(timestamp) {
      var parsedTimestamp = parseInt(timestamp, 10);
      if (isNaN(parsedTimestamp)) {
        throw 'i18n : bad timestamp format for input "' + timestamp + '", expect timestamp format.';
      }
      else if (parsedTimestamp.toString().length < 13) {
        // 13 digits timestamp (9999999999999) == Sat Nov 20 2286,
        throw 'i18n : bad timestamp format for input "' + timestamp + '", expect a millisecond timestamp.';
      }

      var parsedDateTime = momentTimezone.tz(
        parsedTimestamp,
        _config.referenceTimezone);

      var timeZonedDateTime;
      if (_config.offset !== undefined) {
        timeZonedDateTime = parsedDateTime.utc().add(_config.offset, 'minutes');
      } else {
        timeZonedDateTime = momentTimezone.tz(parsedDateTime, _config.timezone);
      }

      return moment(timeZonedDateTime).locale(_config.locale);
    };

    var _parseDateTime = function(dateTimeString) {
      var parsedDateTime = momentTimezone.tz(
        dateTimeString,
        moment.ISO_8601(),
        _config.referenceTimezone);
      if (!parsedDateTime.isValid()) {
        throw 'i18n : bad date format for input "' + dateTimeString + '", expect ISO_8601 format.';
      }

      var timeZonedDateTime;
      if (_config.offset !== undefined) {
        timeZonedDateTime = parsedDateTime.utc().add(_config.offset, 'minutes');
      } else {
        timeZonedDateTime = momentTimezone.tz(parsedDateTime, _config.timezone);
      }

      return moment(timeZonedDateTime).locale(_config.locale);
    };

    var _getTimeAgo = function(dateTime) {
      var currentDateTime = moment();
      var timeAgoPayload = {
        type: '',
        offset: null
      };

      if ((timeAgoPayload.offset = currentDateTime.diff(dateTime, 'days')) > 0) {
        timeAgoPayload.type = 'days';
      }
      else if ((timeAgoPayload.offset = currentDateTime.diff(dateTime, 'hours')) > 0) {
        timeAgoPayload.type = 'hours';
      }
      else if ((timeAgoPayload.offset = currentDateTime.diff(dateTime, 'minutes')) > 0) {
        timeAgoPayload.type = 'minutes';
      }
      else {
        timeAgoPayload.offset = currentDateTime.diff(dateTime, 'seconds');
        timeAgoPayload.type = 'seconds';
      }

      if(timeAgoPayload.offset < 0) {
        throw 'i18n : future date not possible ;)';
      }

      return timeAgoPayload;
    };

    var _currencyISOToCurrencySymbol = function(currency) {
      switch(currency) {
        case 'EUR':
          return '€';
        case 'USD':
          return '$';
        case 'GBP':
          return '£';
        case 'CHF':
          return 'CHF';
        default:
          return 'NO CURRENCY';
      }
    };

    if (!!config) {
      _config = _mergeConfiguration(_config, config);
    }

    _config.timeFormat = _config.isMeridianTime ? 'meridian' : 'h24';
    _config.currencySymbol = _currencyISOToCurrencySymbol(_config.currency);

    return {
      getTimeAgoFromTimestamp: function(timestamp) {
        return _getTimeAgo(_parseTimestamp(timestamp));
      },
      getTimeAgoFromDateTime: function(dateTimeString) {
        return _getTimeAgo(_parseDateTime(dateTimeString));
      },
      formatTimeAgoFromDateTime: function(dateTimeString) {
        return _parseDateTime(dateTimeString).fromNow();
      },
      formatTimeAgoFromTimestamp: function(timestamp) {
        return _parseTimestamp(timestamp).fromNow();
      },
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
      formatNumber: function(value, decimalCount) {
        var oldLanguage = numbro.language();
        numbro.language(_config.locale);
        if (decimalCount === undefined) {
          var splittedValue = value.toString().split('.');
          if(!!splittedValue[1]) {
            decimalCount = splittedValue[1].length;
          } else {
            decimalCount = 0;
          }
        }

        var decimalPattern = Array(decimalCount + 1).join('0');
        var dotSymbol = decimalCount === 0 ? '[.]' : '.';
        var valueFormated = numbro(value).format('0,0' + dotSymbol + decimalPattern);
        numbro.language(oldLanguage);
        return valueFormated;
      },
      formatCurrency: function(value, decimalCount) {
        var oldLanguage = numbro.language();
        numbro.language(_config.locale);
        if (decimalCount === undefined) {
          var splittedValue = value.toString().split('.');
          if(!!splittedValue[1]) {
            decimalCount = splittedValue[1].length;
          } else {
            decimalCount = 0;
          }
        }

        var decimalPattern = Array(decimalCount + 1).join('0');
        var dotSymbol = decimalCount === 0 ? '[.]' : '.';
        var valueFormated = numbro(value).formatCurrency('0,0' + dotSymbol + decimalPattern);
        var currentCurrencySymbol = numbro.languages()[_config.locale].currency.symbol;
        valueFormated = valueFormated.replace(currentCurrencySymbol, _config.currencySymbol);
        numbro.language(oldLanguage);
        return valueFormated;
      },
      unformat: function(formattedValue) {
        var oldLanguage = numbro.language();
        numbro.language(_config.locale);
        var rawValue = numbro().unformat(formattedValue);
        numbro.language(oldLanguage);
        return rawValue;
      },
      formats: {
        SHORT: "SHORT",
        LONG: "LONG"
      }
    };
  };

  // Node
  if (typeof module !== 'undefined' && module.exports) {
    var numbro = require('numbro');
    var numbroLanguageLoader = require('./numbro-language-loader');
    numbroLanguageLoader(numbro);

    var momentTimezone = require('moment-timezone');
    var moment = require('moment/min/moment-with-locales');
    module.exports = function(config) {
      // Pass moment with locales and moment-timezone because moment-timezone is not able to load all locales.
      return i18nServiceFactory(moment, momentTimezone, numbro, config);
    };
  }

  // Browser
  if (typeof window !== 'undefined') {
    window.iadvize = window.iadvize || {};
    window.iadvize.i18nServiceFactory = function(config) {
      // Pass global moment twice because moment and moment-timezone are merged on desktop.
      return i18nServiceFactory(window.moment, window.moment, window.numbro, config);
    };
  }
})();
