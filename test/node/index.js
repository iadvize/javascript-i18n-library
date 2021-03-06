var assert = require('assert');
var i18nServiceFactory = require('../../javascript-i18n-library');
var moment = require('moment');

describe('Date format', function () {
  it('should format short date DMY', function () {
    var i18nService = i18nServiceFactory({
      dateFormat: 'DMY'
    });
    assert.equal('31/12/2015', i18nService.formatDate('2015-12-31T10:11:12'));
  });
  it('should format short date MDY', function () {
    var i18nService = i18nServiceFactory({
      dateFormat: 'MDY'
    });
    assert.equal('12/31/2015', i18nService.formatDate('2015-12-31T10:11:12'));
  });
  it('should format short date DMY', function () {
    var i18nService = i18nServiceFactory({
      dateFormat: 'YMD'
    });
    assert.equal('2015-12-31', i18nService.formatDate('2015-12-31T10:11:12'));
  });
  var locales =
    [
      {
        name: 'fr-FR',
        valueLong: '31 décembre 2015',
        valueMedium: '31/12/2015',
        valueShort: '31/12/2015',
      },
      {
        name: 'en-US',
        valueLong: 'December 31, 2015',
        valueMedium: '31/12/2015',
        valueShort: '31/12/2015',
      }
    ];
  locales.forEach(function (locale) {
    it('should format short date for ' + locale.name + ' locale', function () {
      var i18nService = i18nServiceFactory({
        locale: locale.name
      });
      assert.equal(i18nService.formatDate('2015-12-31T10:11:12'), locale.valueShort);
      assert.equal(i18nService.formatDate('2015-12-31T10:11:12', i18nService.formats.SHORT), locale.valueShort);
    });
    it('should format medium date for ' + locale.name + ' locale', function () {
      var i18nService = i18nServiceFactory({
        locale: locale.name
      });
      assert.equal(i18nService.formatDate('2015-12-31T10:11:12', i18nService.formats.MEDIUM), locale.valueMedium);
    });
    it('should format long date for ' + locale.name + ' locale', function () {
      var i18nService = i18nServiceFactory({
        locale: locale.name
      });
      assert.equal(i18nService.formatDate('2015-12-31T10:11:12', i18nService.formats.LONG), locale.valueLong);
    });
  });
});

describe('Time format', function () {
  it('should format short time h24', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: false
    });
    assert.equal('10:11', i18nService.formatTime('2015-12-31T10:11:12'));
    assert.equal('10:11', i18nService.formatTime('2015-12-31T10:11:12', i18nService.formats.SHORT));
  });
  it('should format medium time h24', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: false
    });
    assert.equal('10:11:12', i18nService.formatTime('2015-12-31T10:11:12', i18nService.formats.MEDIUM));
  });
  it('should format long time h24', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: false
    });
    assert.equal('10:11:12', i18nService.formatTime('2015-12-31T10:11:12', i18nService.formats.LONG));
  });
  it('should format short time meridian am', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: true
    });
    assert.equal('6:11 am', i18nService.formatTime('2015-12-31T06:11:12'));
    assert.equal('6:11 am', i18nService.formatTime('2015-12-31T06:11:12', i18nService.formats.SHORT));
  });
  it('should format medium time meridian am', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: true
    });
    assert.equal('6:11:12 am', i18nService.formatTime('2015-12-31T06:11:12', i18nService.formats.MEDIUM));
  });
  it('should format long time meridian am', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: true
    });
    assert.equal('6:11:12 am', i18nService.formatTime('2015-12-31T06:11:12', i18nService.formats.LONG));
  });
  it('should format short time meridian pm', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: true
    });
    assert.equal('2:11 pm', i18nService.formatTime('2015-12-31T14:11:12'));
    assert.equal('2:11 pm', i18nService.formatTime('2015-12-31T14:11:12', i18nService.formats.SHORT));
  });
  it('should format medium time meridian pm', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: true
    });
    assert.equal('2:11:12 pm', i18nService.formatTime('2015-12-31T14:11:12', i18nService.formats.MEDIUM));
  });
  it('should format long time meridian pm', function () {
    var i18nService = i18nServiceFactory({
      isMeridianTime: true
    });
    assert.equal('2:11:12 pm', i18nService.formatTime('2015-12-31T14:11:12', i18nService.formats.LONG));
  });
});


describe('DateTime format', function () {
  var i18nServiceScenario = i18nServiceFactory();
  var scenarios =
    [
      {
        locale: 'fr-FR',
        format: 'DMY',
        value: '2015-12-31T10:11:12',
        expected: '31 décembre 2015 10:11:12',
        isMeridianTime: false,
        size: i18nServiceScenario.formats.LONG
      },
      {
        locale: 'fr-FR',
        format: 'DMY',
        value: '2015-12-31T10:11:12',
        expected: '31/12/2015 10:11:12',
        isMeridianTime: false,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'fr-FR',
        format: 'DMY',
        value: '2015-12-31T10:11:12',
        expected: '31/12/2015 10:11',
        isMeridianTime: false,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'fr-FR',
        format: 'MDY',
        value: '2015-12-31T10:11:12',
        expected: '12/31/2015 10:11',
        isMeridianTime: false,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'fr-FR',
        format: 'YMD',
        value: '2015-12-31T10:11:12',
        expected: '2015-12-31 10:11',
        isMeridianTime: false,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'fr-FR',
        format: 'YMD',
        value: '2015-12-31T10:11:12',
        expected: '2015-12-31 10:11:12',
        isMeridianTime: false,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'en-US',
        format: 'DMY',
        value: '2015-12-31T06:11:12',
        expected: 'December 31, 2015 6:11:12 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.LONG
      },
      {
        locale: 'en-US',
        format: 'DMY',
        value: '2015-12-31T14:11:12',
        expected: 'December 31, 2015 2:11:12 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.LONG
      },
      {
        locale: 'en-US',
        format: 'DMY',
        value: '2015-12-31T14:11:12',
        expected: '31/12/2015 2:11 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'en-US',
        format: 'DMY',
        value: '2015-12-31T14:11:12',
        expected: '31/12/2015 2:11:12 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'en-US',
        format: 'MDY',
        value: '2015-12-31T14:11:12',
        expected: '12/31/2015 2:11 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'en-US',
        format: 'MDY',
        value: '2015-12-31T14:11:12',
        expected: '12/31/2015 2:11:12 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'en-US',
        format: 'YMD',
        value: '2015-12-31T14:11:12',
        expected: '2015-12-31 2:11 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'en-US',
        format: 'YMD',
        value: '2015-12-31T14:11:12',
        expected: '2015-12-31 2:11:12 pm',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'en-US',
        format: 'DMY',
        value: '2015-12-31T02:11:12',
        expected: '31/12/2015 2:11 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'en-US',
        format: 'DMY',
        value: '2015-12-31T02:11:12',
        expected: '31/12/2015 2:11:12 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'en-US',
        format: 'MDY',
        value: '2015-12-31T02:11:12',
        expected: '12/31/2015 2:11 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'en-US',
        format: 'MDY',
        value: '2015-12-31T02:11:12',
        expected: '12/31/2015 2:11:12 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.MEDIUM
      },
      {
        locale: 'en-US',
        format: 'YMD',
        value: '2015-12-31T02:11:12',
        expected: '2015-12-31 2:11 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.SHORT
      },
      {
        locale: 'en-US',
        format: 'YMD',
        value: '2015-12-31T02:11:12',
        expected: '2015-12-31 2:11:12 am',
        isMeridianTime: true,
        size: i18nServiceScenario.formats.MEDIUM
      }
    ];

  scenarios.forEach(function (scenario) {
    it('should format ' + scenario.size.toLowerCase() +
      ' datetime for ' + scenario.locale +
      ' locale, format: ' + scenario.format +
      ', meridian:' + scenario.isMeridianTime, function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: scenario.isMeridianTime,
        dateFormat: scenario.format,
        locale: scenario.locale
      });
      assert.equal(scenario.expected, i18nService.formatDateTime(scenario.value, scenario.size));
    });
  });
});

describe('TimeAgo', function () {
  describe('Timestamp', function () {
    it('should return 1 day', function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: false
      });
      var expected = JSON.stringify({
        type: 'days',
        offset: 1
      });
      var now = new Date();
      var datetime = new Date(now.getTime() - 86400000); // substract 1 day
      var result = i18nService.getTimeAgoFromTimestamp(datetime.getTime());
      assert.equal(expected, JSON.stringify(result));
    });
    it('should return 1 hour', function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: false
      });
      var expected = JSON.stringify({
        type: 'hours',
        offset: 1
      });
      var now = new Date();
      var datetime = new Date(now.getTime() - 3600000); // substract 1 day
      var result = i18nService.getTimeAgoFromTimestamp(datetime.getTime());
      assert.equal(expected, JSON.stringify(result));
    });
    it('should return 1 second', function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: false
      });
      var expected = JSON.stringify({
        type: 'seconds',
        offset: 1
      });
      var now = new Date();
      var datetime = new Date(now.getTime() - 1000); // substract 1 day
      var result = i18nService.getTimeAgoFromTimestamp(datetime.getTime());
      assert.equal(expected, JSON.stringify(result));
    });
  });
  describe('DateTime', function () {
    it('should return 1 day', function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: false
      });
      var expected = JSON.stringify({
        type: 'days',
        offset: 1
      });
      var now = new Date();
      var datetime = new Date(now.getTime() - 86400000); // substract 1 day
      var dateFormatted = moment(datetime).format();
      var result = i18nService.getTimeAgoFromDateTime(dateFormatted);
      assert.equal(expected, JSON.stringify(result));
    });
    it('should return 1 hour', function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: false
      });
      var expected = JSON.stringify({
        type: 'hours',
        offset: 1
      });
      var now = new Date();
      var datetime = new Date(now.getTime() - 3600000); // substract 1 day
      var dateFormatted = moment(datetime).format();
      var result = i18nService.getTimeAgoFromDateTime(dateFormatted);
      assert.equal(expected, JSON.stringify(result));
    });
    it('should return 1 second', function () {
      var i18nService = i18nServiceFactory({
        isMeridianTime: false
      });
      var expected = JSON.stringify({
        type: 'seconds',
        offset: 1
      });
      var now = new Date();
      var datetime = new Date(now.getTime() - 1000); // substract 1 day
      var dateFormatted = moment(datetime).format();
      var result = i18nService.getTimeAgoFromDateTime(dateFormatted);
      assert.equal(expected, JSON.stringify(result));
    });
  });
  describe('Format', function () {
    var scenarios = [{
      substract: 1000,
      expect: 'il y a quelques secondes',
      locale: 'fr-FR'
    }, {
      substract: 60000,
      expect: 'il y a une minute',
      locale: 'fr-FR'
    }, {
      substract: 300000,
      expect: 'il y a 5 minutes',
      locale: 'fr-FR'
    }, {
      substract: 3600000,
      expect: 'il y a une heure',
      locale: 'fr-FR'
    }, {
      substract: 3600000 * 3,
      expect: 'il y a 3 heures',
      locale: 'fr-FR'
    }, {
      substract: 3600000 * 24,
      expect: 'il y a un jour',
      locale: 'fr-FR'
    }, {
      substract: 3600000 * 24 * 32,
      expect: 'il y a un mois',
      locale: 'fr-FR'
    }, {
      substract: 1000,
      expect: 'a few seconds ago',
      locale: 'en-GB'
    }, {
      substract: 60000,
      expect: 'a minute ago',
      locale: 'en-GB'
    }, {
      substract: 300000,
      expect: '5 minutes ago',
      locale: 'en-GB'
    }, {
      substract: 3600000,
      expect: 'an hour ago',
      locale: 'en-GB'
    }, {
      substract: 3600000 * 3,
      expect: '3 hours ago',
      locale: 'en-GB'
    }, {
      substract: 3600000 * 24,
      expect: 'a day ago',
      locale: 'en-GB'
    }, {
      substract: 3600000 * 24 * 32,
      expect: 'a month ago',
      locale: 'en-GB'
    }];

    var createTest = function (scenario, testFunction) {
      return function () {
        it('should return "' + scenario.expect + '" for locale ' + scenario.locale, function () {
          var i18nService = i18nServiceFactory({
            locale: scenario.locale
          });
          var now = new Date();
          var datetime = new Date(now.getTime() - scenario.substract); // substract 1 second
          var result = testFunction(datetime, i18nService);
          assert.equal(result, scenario.expect);
        });
      };
    };

    var testFunctions = scenarios.map(function (scenario) {
      return {
        dateTime: createTest(scenario, function (dateTime, i18nService) {
          var dateFormatted = moment(dateTime).format();
          return i18nService.formatTimeAgoFromDateTime(dateFormatted);
        }),
        timestamp: createTest(scenario, function (dateTime, i18nService) {
          return i18nService.formatTimeAgoFromTimestamp(dateTime.getTime());
        })
      };
    });

    describe('DateTime', function () {
      testFunctions.forEach(function (testFunction) {
        testFunction.dateTime();
      });
    });
    describe('TimeStamp', function () {
      testFunctions.forEach(function (testFunction) {
        testFunction.timestamp();
      });
    });
  });
});

describe('Erroring', function () {
  describe('Format', function () {
    it('should throw bad datetime format format error', function () {
      var throwingFunction = function () {
        var i18nService = i18nServiceFactory({
          isMeridianTime: false
        });
        i18nService.formatDate('BAD FORMAT');
      };

      assert.throws(throwingFunction);
    });
  });
});

describe('Number format and unformat', function () {
  var scenarios =
    [
      {
        locale: 'fr-FR',
        value: 1000,
        expected: '1 000'
      },
      {
        locale: 'fr-FR',
        value: 1000,
        expected: '1 000,00',
        decimalCount: 2
      },
      {
        locale: 'fr-FR',
        value: 1000.1234,
        expected: '1 000,1234'
      },
      {
        locale: 'en-GB',
        value: 1000,
        expected: '1,000'
      },
      {
        locale: 'en-GB',
        value: 1000,
        expected: '1,000.00',
        decimalCount: 2
      },
      {
        locale: 'en-GB',
        value: 1000.1234,
        expected: '1,000.1234'
      }
    ];

  scenarios.forEach(function (scenario) {
    it('should format and unformat ' + scenario.locale + ' number with ' + (!!scenario['decimalCount'] ? scenario['decimalCount'] : 0) + ' decimals', function () {
      var i18nService = i18nServiceFactory({
        locale: scenario.locale
      });
      var result = i18nService.formatNumber(scenario.value, scenario['decimalCount']);
      assert.equal(scenario.expected, result);
      assert.equal(scenario.value, i18nService.unformat(result));
    });
  });
});

describe('Number string format', function () {
  var scenarios =
    [
      {
        locale: 'fr-FR',
        value: '1000',
        expected: '1 000'
      }
    ];
});

describe('Currency format and unformat', function () {
  var scenarios =
    [
      {
        locale: 'fr-FR',
        value: 1000,
        currency: 'EUR',
        expected: '1 000€'
      },
      {
        locale: 'fr-FR',
        value: 1000,
        currency: 'EUR',
        expected: '1 000,00€',
        decimalCount: 2
      },
      {
        locale: 'fr-FR',
        value: 1000.1234,
        currency: 'USD',
        expected: '1 000,1234US$'
      },
      {
        locale: 'en-GB',
        value: 1000,
        currency: 'CHF',
        expected: 'CHF1,000'
      },
      {
        locale: 'en-GB',
        value: 1000,
        currency: 'GBP',
        expected: '£1,000.00',
        decimalCount: 2
      },
      {
        locale: 'en-GB',
        currency: 'USD',
        value: 1000.1234,
        expected: 'US$1,000.1234'
      }
    ];

  scenarios.forEach(function (scenario) {
    it('should format and unformat ' + scenario.locale + ' currency with ' + (!!scenario['decimalCount'] ? scenario['decimalCount'] : 0) + ' decimals and currency ' + scenario['currency'], function () {
      var i18nService = i18nServiceFactory({
        locale: scenario.locale,
        currency: scenario.currency
      });
      var result = i18nService.formatCurrency(scenario.value, scenario['decimalCount']);
      assert.equal(scenario.expected, result);
      assert.equal(scenario.value, i18nService.unformat(result));
    });
  });
});

describe('Currency format with forced currency', function () {
  var scenarios =
    [
      {
        locale: 'fr-FR',
        value: 1000,
        currency: 'EUR',
        forcedCurrency: 'USD',
        expected: '1 000US$'
      },
      {
        locale: 'fr-FR',
        value: 1000.1234,
        currency: 'USD',
        forcedCurrency: 'USD',
        expected: '1 000,1234US$'
      },
      {
        locale: 'en-GB',
        value: 1000,
        currency: 'CHF',
        forcedCurrency: 'USD',
        expected: 'US$1,000'
      },
      {
        locale: 'en-GB',
        value: 1000,
        currency: 'CHF',
        forcedCurrency: 'UNKNOWN',
        expected: '¤1,000'
      }

    ];

  scenarios.forEach(function (scenario) {
    it('should format ' + scenario.locale + ' with currency ' + scenario.forcedCurrency, function () {
      var i18nService = i18nServiceFactory({
        locale: scenario.locale,
        currency: scenario.currency
      });
      var result = i18nService.formatCurrency(scenario.value, scenario.forcedCurrency);
      assert.equal(scenario.expected, result);
    });
  });
});

describe('Currency format with forced currency and decimal count', function () {
  var scenarios =
    [
      {
        locale: 'fr-FR',
        value: 1000,
        currency: 'EUR',
        forcedCurrency: 'USD',
        expected: '1 000US$',
        decimalCount: undefined
      },
      {
        locale: 'fr-FR',
        value: 1000.1234,
        currency: 'USD',
        forcedCurrency: 'USD',
        expected: '1 000,12US$',
        decimalCount: 2
      },
      {
        locale: 'fr-FR',
        value: 1000.1234,
        currency: 'USD',
        forcedCurrency: 'USD',
        expected: '1 000US$',
        decimalCount: 0
      },
      {
        locale: 'en-GB',
        value: 1000,
        currency: 'CHF',
        forcedCurrency: 'USD',
        expected: 'US$1,000',
        decimalCount: null
      }
    ];

  scenarios.forEach(function (scenario) {
    it('should format ' + scenario.locale + ' with currency ' + scenario.forcedCurrency + ' and ' + scenario.decimalCount + ' decimals', function () {
      var i18nService = i18nServiceFactory({
        locale: scenario.locale,
        currency: scenario.currency
      });
      var result = i18nService.formatCurrency(scenario.value, scenario.decimalCount, scenario.forcedCurrency);
      assert.equal(scenario.expected, result);
    });
  });
});

describe('Exposes moment', function () {
  it('should exposes moment library', function () {
    var i18nService = i18nServiceFactory();
    assert.notEqual(undefined, i18nService.moment);
  });
});


describe('Exposes momentTimezone', function () {
  it('should exposes moment library', function () {
    var i18nService = i18nServiceFactory();
    assert.notEqual(undefined, i18nService.momentTimezone);
  });
});


describe('Exposes numbro', function () {
  it('should exposes numbro library', function () {
    var i18nService = i18nServiceFactory();
    assert.notEqual(undefined, i18nService.numbro);
  });
});

describe('Exposes libPhoneNumber', function () {
  it('should exposes libPhoneNumber library', function () {
    var i18nService = i18nServiceFactory();
    assert.notEqual(undefined, i18nService.libPhoneNumber);
  });
});
