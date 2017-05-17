# ng-cordova-pushwoosh

[![NPM Version][npm-image]][npm-url]

> Angular 1.x module for the Pushwoosh Cordova plugin

## Installation

```sh
$ npm i -S ng-cordova-pushwoosh
```

## Usage
```js
var module = angular.module('MyModule', ['$cordovaPushwoosh']);
module.value('$cordovaPushwooshAppId', 'PUSHWOOSH_APP_ID');
module.value('$cordovaPushwooshProjectId', 'PUSHWOOSH_PROJECT_ID');

module.run(function ($cordovaPushwoosh) {
    $cordovaPushwoosh.register()
});
```

## TODO

* Plugin API documentation

## LICENSE

[MIT](LICENSE)

[npm-image]: https://badge.fury.io/js/ng-cordova-pushwoosh.svg
[npm-url]: https://npmjs.org/package/ng-cordova-pushwoosh
