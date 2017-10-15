<a href="https://promisesaplus.com/"><img src="https://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo" title="Promises/A+ 1.1 compliant" align="right"></a>

[![Build Status][img-travis]][url-travis]
[![NPM version][img-npm]][url-npm]
[![NPM Downloads][img-downloads]][url-downloads]
[![License][img-license]][url-license]
[![codecov][img-cc]][url-cc]

Sworn is a promise library based on Promises/A+ specification and other features.

The Promises/A+ specification includes a object `Promise` with a function `then` with the signature 
`promise.then(onFulfilled, onRejected)`. Read more about it on [MDN][mdn-promise-then] and [Promises/A+](https://promisesaplus.com/).
- onFullfilled: `(value) -> void`
- onRejected: `(reason) -> void`

Other than the specification there are there are `catch` and `fail` (`promise.[catch|fail](onRejected)`) which are just a shorthand 
for `promise.then(onFulfilled, onRejected)`.

`Promise.all(array)` that takes a array of promises (can be mixed with regular values). And resolves all of them in parallel and 
resolves the array to the next then call.

`Promise.race(array)` that takes a array of promises (can be mixed with regular values). And resolves the first one to be done.

## License
MIT License

Copyright (c) 2017 Martin Hövre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Other
This library was a product of a school project about JavaScript optimization. As I am not great at writing it is kind of short but.
[(It is in swedish)](https://drive.google.com/open?id=0Bzjhs6Omp_jrZzBpNEtOWFlFNzg)


[url-travis]: https://travis-ci.org/ocpu/sworn
[url-npm]: https://npmjs.org/package/sworn
[url-license]: license.md
[url-downloads]: https://npmjs.org/package/sworn
[url-cc]: https://codecov.io/gh/ocpu/sworn

[img-travis]: https://img.shields.io/travis/ocpu/sworn.svg?style=flat-square
[img-npm]: https://img.shields.io/npm/v/sworn.svg?style=flat-square
[img-license]: https://img.shields.io/npm/l/sworn.svg?style=flat-square
[img-downloads]: https://img.shields.io/npm/dm/sworn.svg?style=flat-square
[img-cc]: https://img.shields.io/codecov/c/github/ocpu/sworn/master.svg?style=flat-square

[mdn-promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then