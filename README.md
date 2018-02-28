# javascript-i18n-library [![Circle CI](https://circleci.com/gh/iadvize/javascript-i18n-library.svg?style=svg)](https://circleci.com/gh/iadvize/javascript-i18n-library) [![npm version](https://badge.fury.io/js/javascript-i18n-library.svg)](https://badge.fury.io/js/javascript-i18n-library)

> This javascript library is used to format dates, numbers and currencies. It's compatible with Node and Browsers. It depends on Moment.JS and Numbro.JS

## Examples

```javascript
var dateToFormat = "1990-11-26T23:21:00"; // also accepts "1990-11-26 23:21:00" format

// Dates
i18nService.formatDate(dateToFormat);                            // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.SHORT); // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.MEDIUM); // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.LONG);  // 26 novembre 1990

// Time
i18nService.formatTime(dateToFormat);                            // 23:21
i18nService.formatTime(dateToFormat, i18nService.formats.SHORT); // 23:21
i18nService.formatTime(dateToFormat, i18nService.formats.MEDIUM); // 23:21:00
i18nService.formatTime(dateToFormat, i18nService.formats.LONG);  // 23:21:00

// DateTime
i18nService.formatDateTime(dateToFormat);                            // 26/11/1990 23:21
i18nService.formatDateTime(dateToFormat, i18nService.formats.SHORT); // 26/11/1990 23:21
i18nService.formatDateTime(dateToFormat, i18nService.formats.MEDIUM); // 26/11/1990 23:21:00
i18nService.formatDateTime(dateToFormat, i18nService.formats.LONG);  // 26 novembre 1990 23:21:00

// TimeAgo
i18nService.getTimeAgoFromTimestamp(1444227494000 /* millis */);
i18nService.getTimeAgoFromDateTime(dateToFormat);

// Format numbers
i18nService.formatNumber(1000); // '1 000'
i18nService.unformat('1 000'); // 1000

i18nService.formatNumber(1000.1234); // '1 000,1234'
i18nService.formatNumber(1000.1234, 0); // '1 000'
i18nService.formatNumber(1000.1234, 1); // '1 000,1'

// Format currency
i18nService.formatCurrency(1000); // '1 000€'
i18nService.formatCurrency(1000, '$'), // 1 000$
i18nService.formatCurrency(1000.1234, 2, '$'), // 1 000,12$
i18nService.unformat('1 000€'); // 1000

// Format TimeAgo
i18nService.formatTimeAgoFromDateTime(dateToFormat); // il y a quelques secondes
i18nService.formatTimeAgoFromTimestamp(1444227494000 /* millis */); // il y a quelques secondes

// Libs exposition
i18nService.moment;
i18nService.momentTimezone;
i18nService.numbro;
```

## Install

``` sh
npm install javascript-i18n-library --save
```

## Documentation

### Configuration

The factory accept a config object to override default configuration.
``` javascript
{
    referenceTimezone: 'Europe/Paris', // timezone used when no timezone is defined on the date to parse
    timezone: 'Europe/Paris',          // timezone used to format the date
    offset: 120,                       // override the targetTimezone, add this offset (in minutes) to the parsed date
    locale: 'fr-FR',                   // locale used to format numbers, currencies and long date format
    currency: 'EUR',                   // the currency to use when formatting currencies values
    dateFormat: 'DMY',                 // generic format date (DMY, MDY or YMD)
    isMeridianTime: false              // format the time in meridian time or 24 hours time
}
```

### Configuration Node / Browserify

``` javascript
var i18nServiceFactory = require('javascript-i18n-library');
var config = {
    referenceTimezone: 'Europe/Paris',
    timezone: 'Europe/Paris',
    locale: 'fr-FR',
    currency: 'EUR',
    dateFormat: 'DMY',
    isMeridianTime: false
};

var i18nService = i18nServiceFactory(config);
```

### Configuration Browser

``` javascript
var config = {
    referenceTimezone: 'Europe/Paris',
    timezone: 'Europe/Paris',
    locale: 'fr-FR',
    currency: 'EUR',
    dateFormat: 'DMY',
    isMeridianTime: false
};

var i18nService = window.iadvize.i18nServiceFactory(config);
```

## Contribute

Look at contribution guidelines here : [CONTRIBUTING.md](CONTRIBUTING.md)

### Test

```sh
yarn test
```

To automatically launch the tests when a file is changed :

```sh
yarn run-script watch-test
```
