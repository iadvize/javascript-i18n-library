# js-i18n-library

> This javascript library is used to format dates, numbers and currencies. It's compatible with Node and Browsers. It depends on Moment.JS and Numbro.JS

## Installation
``` sh
npm install javascript-i18n-library --save
```

## Configuration

The factory accept a config object to override default configuration.
```js
{
    referenceTimezone: 'Europe/Paris', // timezone used when no timezone is defined on the date to parse 
    timezone: 'Europe/Paris',          // timezone used to format the date
    offset: 120,                       // override the targetTimezone, add this offset (in minutes) to the parsed date
    locale: 'fr-FR',                   // locale used to format numbers, currencies and long date format
    dateFormat: 'DMY',                 // generic format date (DMY, MDY or YMD)
    isMeridianTime: false              // format the time in meridian time or 24 hours time
}
```

## Usage Node / Browserify
``` javascript
var i18nServiceFactory = require('javascript-i18n-library');
var config = {
    referenceTimezone: 'Europe/Paris',
    timezone: 'Europe/Paris',
    locale: 'fr-FR',
    dateFormat: 'DMY',
    isMeridianTime: false
};

var i18nService = i18nServiceFactory(config);
var dateToFormat = "1990-11-26T23:21:00"; // also accepts "1990-11-26 23:21:00" format

// Dates
i18nService.formatDate(dateToFormat);                            // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.SHORT); // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.LONG);  // 26 novembre 1990

// Time
i18nService.formatTime(dateToFormat);                            // 23:21
i18nService.formatTime(dateToFormat, i18nService.formats.SHORT); // 23:21
i18nService.formatTime(dateToFormat, i18nService.formats.LONG);  // 23:21:00

// DateTime
i18nService.formatDateTime(dateToFormat);                            // 26/11/1990 23:21
i18nService.formatDateTime(dateToFormat, i18nService.formats.SHORT); // 26/11/1990 23:21
i18nService.formatDateTime(dateToFormat, i18nService.formats.LONG);  // 26 novembre 1990 23:21:00

// TimeAgo
i18nService.getTimeAgoFromTimestamp(1444227494000 /* millis */)
i18nService.getTimeAgoFromDateTime(dateToFormat);
```

## Usage Browser
``` javascript
var config = {
    referenceTimezone: 'Europe/Paris',
    timezone: 'Europe/Paris',
    locale: 'fr-FR',
    dateFormat: 'DMY',
    isMeridianTime: false
};

var i18nService = window.iadvize.i18nServiceFactory(config);
var dateToFormat = "1990-11-26T23:21:00"; // also accepts "1990-11-26 23:21:00" format

// Dates
i18nService.formatDate(dateToFormat);                            // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.SHORT); // 26/11/1990
i18nService.formatDate(dateToFormat, i18nService.formats.LONG);  // 26 novembre 1990

// Time
i18nService.formatTime(dateToFormat);                            // 23:21
i18nService.formatTime(dateToFormat, i18nService.formats.SHORT); // 23:21
i18nService.formatTime(dateToFormat, i18nService.formats.LONG);  // 23:21:00

// DateTime
i18nService.formatDateTime(dateToFormat);                            // 26/11/1990 23:21
i18nService.formatDateTime(dateToFormat, i18nService.formats.SHORT); // 26/11/1990 23:21
i18nService.formatDateTime(dateToFormat, i18nService.formats.LONG);  // 26 novembre 1990 23:21:00

// TimeAgo
i18nService.getTimeAgoFromTimestamp(1444227494000 /* millis */)
i18nService.getTimeAgoFromDateTime(dateToFormat);
```
