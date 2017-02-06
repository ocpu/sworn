# Sworn
A promise library based of Promises/A+ specification and more

[![Build Status][img-travis]][url-travis]
[![NPM version][img-npm]][url-npm]
[![NPM Downloads][img-downloads]][url-downloads]
[![License][img-license]][url-license]
[![codecov][img-cc]][url-cc]


If you do not know anything about promises I recommend you check out the [MDN][url-mdn-promises] article about promises.


## Quick access

1. [A beginning example](#an-example)
2. [Getting installed](#getting-installed)

## An example

```js
var Sworn = require("sworn");

Sworn.resolve("Supports")
    .then(function (text) {
        return text + " es5"
    })
    .then(text => `${text} and above`)
    .then(console.log) // output: Supports es5 and above
```
## Getting installed
- Install with NPM: `npm install sworn`

[url-wiki]: https://github.com/ocpu/Sworn/wiki "Sworn wiki"
[url-mdn-promises]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
[url-PA+]: https://promisesaplus.com/
[url-travis]: https://travis-ci.org/ocpu/Sworn
[url-npm]: https://npmjs.org/package/sworn
[url-license]: LICENSE.md
[url-downloads]: https://npmjs.org/package/sworn
[url-cc]: https://codecov.io/gh/ocpu/Sworn

[img-PA+]: https://promisesaplus.com/assets/logo-small.png "Promises/A+ 1.0 compliant"
[img-travis]: https://img.shields.io/travis/ocpu/Sworn.svg?style=flat-square
[img-npm]: https://img.shields.io/npm/v/sworn.svg?style=flat-square
[img-license]: https://img.shields.io/npm/l/sworn.svg?style=flat-square
[img-downloads]: https://img.shields.io/npm/dm/sworn.svg?style=flat-square
[img-meme]: https://i.imgflip.com/1f2lkm.jpg "Wow so original"
[img-cc]: https://img.shields.io/codecov/c/github/ocpu/Sworn/master.svg?style=flat-square
