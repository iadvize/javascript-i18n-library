exports = module.exports = i18nServiceFactory;

var i18nServiceFactory = function (moment, momentTimezone, numbro, libPhoneNumber, config) {
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
        medium: 'MM/DD/YYYY',
        long: 'LL'
      },
      DMY: {
        short: 'DD/MM/YYYY',
        medium: 'DD/MM/YYYY',
        long: 'LL'
      },
      YMD: {
        short: 'YYYY-MM-DD',
        medium: 'YYYY-MM-DD',
        long: 'LL'
      }
    },
    time: {
      meridian: {
        short: 'h:mm a',
        medium: 'h:mm:ss a',
        long: 'h:mm:ss a'
      },
      h24: {
        short: 'HH:mm',
        medium: 'HH:mm:ss',
        long: 'HH:mm:ss'
      }
    }
  };

  var _mergeConfiguration = function (baseConfig, overrideConfig) {
    var stampConfig = JSON.parse(JSON.stringify(baseConfig));
    for (var key in overrideConfig) {
      stampConfig[key] = overrideConfig[key];
    }

    return stampConfig;
  };

  var _parseTimestamp = function (timestamp) {
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

  var _parseDateTime = function (dateTimeString) {
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

  var _getTimeAgo = function (dateTime) {
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

    if (timeAgoPayload.offset < 0) {
      throw 'i18n : future date not possible ;)';
    }

    return timeAgoPayload;
  };

  var _currencyISOToCurrencySymbol = function (currency, locale) {
    var currencies = {
      AUD: { default: "AU$", "en-AU": "$" },
      BGN: { default: "лв" },
      BRL: { default: "BR$" },
      CAD: { default: "CA$", "en-CA": "$" },
      CHF: { default: "CHF" },
      CNY: { default: "CN¥", "zh-CN": "Ұ", "zh-HK": "元", "zh-TW": "￥" },
      CZK: { default: "CZK" },
      DKK: { default: "DKK", "da-DA": "kr" },
      EUR: { default: "€" },
      GBP: { default: "£UK", "en-GB": "£" },
      HKD: { default: "HK$", "zh-HK": "$" },
      HRK: { default: "HRK" },
      HUF: { default: "HUF" },
      IDR: { default: "IDR" },
      ILS: { default: "₪" },
      INR: { default: "₹" },
      JPY: { default: "JP¥", "ja-JP": "¥" },
      KRW: { default: "₩" },
      MXN: { default: "MX$" },
      MYR: { default: "MYR" },
      NOK: { default: "NOK", "sv-SE": "kr" },
      NZD: { default: "NZ$", "en-NZ": "$" },
      PHP: { default: "PHP" },
      PLN: { default: "PLN" },
      RON: { default: "ROL", "ro-RO": "lei" },
      RUB: { default: "RUB" },
      SEK: { default: "SEK", "sv-SE": "kr" },
      SGD: { default: "S$" },
      THB: { default: "฿" },
      TRY: { default: "TRY" },
      USD: { default: "US$", "en-US": "$" },
      ZAR: { default: "ZAR" }
    };

    if (currencies[currency]) {
      return currencies[currency][locale] || currencies[currency]['default'];
    }

    return '¤';
  };

  if (!!config) {
    _config = _mergeConfiguration(_config, config);
  }

  _config.timeFormat = _config.isMeridianTime ? 'meridian' : 'h24';
  _config.currencySymbol = _currencyISOToCurrencySymbol(_config.currency, _config.locale);

  return {
    getTimeAgoFromTimestamp: function (timestamp) {
      return _getTimeAgo(_parseTimestamp(timestamp));
    },
    getTimeAgoFromDateTime: function (dateTimeString) {
      return _getTimeAgo(_parseDateTime(dateTimeString));
    },
    formatTimeAgoFromDateTime: function (dateTimeString) {
      return _parseDateTime(dateTimeString).fromNow();
    },
    formatTimeAgoFromTimestamp: function (timestamp) {
      return _parseTimestamp(timestamp).fromNow();
    },
    formatDateTime: function (dateTimeString, formatType) {
      var timeZonedDateTime = _parseDateTime(dateTimeString);
      var dateFormat = _formats.date[_config.dateFormat].short;
      var timeFormat = _formats.time[_config.timeFormat].short;
      if (formatType === this.formats.LONG) {
        dateFormat = _formats.date[_config.dateFormat].long;
        timeFormat = _formats.time[_config.timeFormat].long;
      } else if (formatType === this.formats.MEDIUM) {
        dateFormat = _formats.date[_config.dateFormat].medium;
        timeFormat = _formats.time[_config.timeFormat].medium;
      }

      return timeZonedDateTime.format(dateFormat + ' ' + timeFormat);
    },
    formatDate: function (dateTimeString, formatType) {
      var timeZonedDateTime = _parseDateTime(dateTimeString);
      var dateFormat = _formats.date[_config.dateFormat].short;
      if (formatType === this.formats.LONG) {
        dateFormat = _formats.date[_config.dateFormat].long;
      } else if (formatType === this.formats.MEDIUM) {
        dateFormat = _formats.date[_config.dateFormat].medium;
      }

      return timeZonedDateTime.format(dateFormat);
    },
    formatTime: function (dateTimeString, formatType) {
      var timeZonedDateTime = _parseDateTime(dateTimeString);
      var timeFormat = _formats.time[_config.timeFormat].short;
      if (formatType === this.formats.LONG) {
        timeFormat = _formats.time[_config.timeFormat].long;
      } else if (formatType === this.formats.MEDIUM) {
        timeFormat = _formats.time[_config.timeFormat].medium;
      }

      return timeZonedDateTime.format(timeFormat);
    },
    formatNumber: function (value, decimalCount) {
      var oldLanguage = numbro.language();
      numbro.language(_config.locale);
      if (decimalCount === undefined) {
        var splittedValue = value.toString().split('.');
        if (!!splittedValue[1]) {
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
    formatCurrency: function (value, decimalCount, forcedCurrency) {
      var oldLanguage = numbro.language();
      numbro.language(_config.locale);

      if (typeof decimalCount === 'string') {
        forcedCurrency = decimalCount;
        decimalCount = undefined;
      }

      if (decimalCount === undefined) {
        var splittedValue = value.toString().split('.');
        if (!!splittedValue[1]) {
          decimalCount = splittedValue[1].length;
        } else {
          decimalCount = 0;
        }
      }

      var decimalPattern = Array(decimalCount + 1).join('0');
      var dotSymbol = decimalCount === 0 ? '[.]' : '.';
      var valueFormated = numbro(value).formatCurrency('0,0' + dotSymbol + decimalPattern);
      var currentCurrencySymbol = numbro.languages()[_config.locale].currency.symbol;
      var currencySymbol = forcedCurrency ? _currencyISOToCurrencySymbol(forcedCurrency, _config.locale) : _config.currencySymbol;
      valueFormated = valueFormated.replace(currentCurrencySymbol, currencySymbol);
      numbro.language(oldLanguage);
      return valueFormated;
    },
    unformat: function (formattedValue) {
      var oldLanguage = numbro.language();
      numbro.language(_config.locale);
      var rawValue = numbro().unformat(formattedValue);
      numbro.language(oldLanguage);
      return rawValue;
    },
    formats: {
      SHORT: "SHORT",
      MEDIUM: "MEDIUM",
      LONG: "LONG"
    },
    moment,
    momentTimezone,
    numbro,
    libPhoneNumber,
  };
};