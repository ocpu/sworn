'use strict'

var asap = require('asap/raw')

var ERROR = {value:null}

function tryCall(fn, ctx, args) {
    try {
        fn.apply(ctx, args)
    } catch (e) {
        ERROR.value = e
        return ERROR
    }
}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
//
// once the state is no longer pending (state = 0) it is immutable

module.exports = Promise

function Promise(fn) {
    if (typeof fn !== 'function')
        return
    this._state = 0
    this._value = void 0
    this._deferred = void 0
    doResolve(fn, this)
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    var res = new Promise
    handle(this, new Handler(onFulfilled, onRejected, res))
    return res
}

function handle(self, deferred) {
    if (self._state === 0)
        return void (self._deferred = deferred)
    handleResolved(self, deferred)
}

function handleResolved(self, deferred) {
    asap(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
        if (typeof cb !== 'function') {
            if (self._state === 1)
                resolve(deferred.promise, self._value)
            else reject(deferred.promise, self._value)
            return
        }
        var ret = tryCall(cb, void 0, [self._value])
        if (ret === ERROR)
            reject(deferred.promise, ERROR.value)
        else resolve(deferred.promise, ret)
    })
}

function resolve(self, newValue) {
    if (newValue === self)
        return reject(self, new TypeError('A promise cannot resolve itself.'))
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = tryCall(function (newValue) {
            return newValue.then
        }, void 0, [newValue])
        if (then === ERROR)
            return reject(self, ERROR.value)
        if (then === self.then && newValue instanceof Promise) {
            newValue = newValue._value
        } else if (typeof then === 'function') {
            doResolve(then.bind(newValue), self)
            return
        }
    }
    self._state = 1
    self._value = newValue
    end(self)
}

function reject(self, reason) {
    self._state = 2
    self._value = reason
    end(self)
}

function end(self) {
    if (self._deferred) {
        handle(self, self._deferred)
        self._deferred = null
    }
}

function Handler(onFulfilled, onRejected, promise){
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : void 0
    this.onRejected = typeof onRejected === 'function' ? onRejected : void 0
    this.promise = promise
}

/**
 * Makes sure onFulfilled and onRejected are only called once.
 */
function doResolve(fn, promise) {
    var done = false
    var res = tryCall(fn, void 0, [function (value) {
        if (done) return
        done = true
        resolve(promise, value)
    }, function (reason) {
        if (done) return
        done = true
        reject(promise, reason)
    }])
    if (!done && res === ERROR) {
        done = true
        reject(promise, ERROR.value)
    }
}

Promise.prototype.resolve = resolve
Promise.prototype.reject = reject

function apply(fn, self, args) {
    return new Promise(function (resolve, reject) {
        var ret = tryCall(fn, self, args)
        if (ret === ERROR)
            reject(ERROR.value)
        resolve(ret)
    })
}

Promise.wrap = function (fn) {
    return function() {
        var l = arguments.length, a = new Array(l)
        while (l--) a[l] = arguments[l]
        return apply(fn, this, a)
    }
}

//Promise.wrap(require('fs').readFile)('.\\server\\start.js', 'utf-8').then(console.log, console.error)

/*new Promise(function (resolve) {
 resolve(new Promise(function (resolve) {
 resolve('some value')
 }))
 }).then(console.log, console.error)*/
