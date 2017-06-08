'use strict'

/* istanbul ignore next */
//var asap = typeof module !== 'undefined' && typeof module.exports !== 'undefined' ? require('asap/raw') : function (handler) { setTimeout(handler, 0) }
var asap = require('asap')

var errorObject = { value: undefined }

function getThen(obj) {
    try {
        return obj.then
    } catch (e) {
        errorObject.value = e
        return errorObject
    }
}

function tryCall1(fn, arg) {
    try {
        return fn(arg)
    } catch (e) {
        errorObject.value = e
        return errorObject
    }
}

function tryCall2(fn, arg1, arg2) {
    try {
        return fn(arg1, arg2)
    } catch (e) {
        errorObject.value = e
        return errorObject
    }
}

module.exports = Promise

/**
 * @param {function(resolve, reject)} resolver
 * @constructor
 */
function Promise(resolver) {
    /**@type {Number}
     * @private*/
    this._state = 0
    /**@type {*}
     * @private*/
    this._value = void 0
    /**@type {Array.<Handler>}
     * @private*/
    this._deferred = []
    if (typeof resolver !== 'function')
        return
    execute(this, resolver)
}

/**
 *
 * @param {function(result)} onFulfilled
 * @param {function(reason)} onRejected
 * @returns {Promise}
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
    var res = new Promise
    handle(this, new Handler(onFulfilled, onRejected, res))
    return res
}

function handle(self, deferred) {
    if (self._state === 0) {
        self._deferred.push(deferred)
        return
    }
    asyncHandle(self, deferred)
}

function asyncHandle(self, deferred) {
    asap(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
        if (typeof cb !== 'function') {
            if (self._state === 1)
                resolve(deferred.promise, self._value)
            else reject(deferred.promise, self._value)
            return
        }
        var ret = tryCall1(cb, self._value)
        if (ret === errorObject)
            reject(deferred.promise, errorObject.value)
        else resolve(deferred.promise, ret)
    })
}

function resolve(self, newValue) {
    if (newValue === self)
        return void reject(self, new TypeError('A promise cannot resolve itself.'))
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = getThen(newValue)
        if (then === errorObject)
            return void reject(self, errorObject.value)
        else if (typeof then === 'function')
            return void execute(self, then.bind(newValue))
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
    if (self._deferred.length !== 0)
        self._deferred.forEach(handle.bind(void 0, self))
    self._deferred = null
}

function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : void 0
    this.onRejected = typeof onRejected === 'function' ? onRejected : void 0
    this.promise = promise
}

function execute(promise, fn) {
    if (typeof fn !== 'function')
        return
    var done = false, res = tryCall2(fn, function (value) {
        return !done ? done = !resolve(promise, value) : void 0
    }, function (reason) {
        return !done ? done = !reject(promise, reason) : void 0
    })
    !done && res === errorObject ? done = !reject(promise, errorObject.value) : void 0
}
