'use strict'

var asap = require('asap/raw')

var ERROR = {value:undefined}

function getThen(obj) {
    try {
        return obj.then
    } catch (e) {
        ERROR.value = e
        return ERROR
    }
}

function tryCall1(fn, arg) {
    try {
        return fn(arg)
    } catch (e) {
        ERROR.value = e
        return ERROR
    }
}

function tryCall2(fn, arg1, arg2) {
    try {
        return fn(arg1, arg2)
    } catch (e) {
        ERROR.value = e
        return ERROR
    }
}

module.exports = Promise

/**
 * @param {function} resolver
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
Promise.prototype.then = function(onFulfilled, onRejected) {
    var res = new Promise
    handle(this, new Handler(onFulfilled, onRejected, res))
    return res
}

function handle(self, deferred) {
    if (self._state === 0)
        return void (self._deferred.push(deferred))
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
        if (ret === ERROR)
            reject(deferred.promise, ERROR.value)
        else resolve(deferred.promise, ret)
    })
}

function resolve(self, newValue) {
    if (newValue === self)
        return void reject(self, new TypeError('A promise cannot resolve itself.'))
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = getThen(newValue)
        if (then === ERROR)
            return void reject(self, ERROR.value)
        /*if (then === self.then && newValue instanceof Promise)
            newValue = newValue._value*/
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
    /* istanbul ignore else */
    if (self._deferred) {
        self._deferred.forEach(handle.bind(void 0, self))
        self._deferred = null
    }
}

function Handler(onFulfilled, onRejected, promise){
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : void 0
    this.onRejected = typeof onRejected === 'function' ? onRejected : void 0
    this.promise = promise
}

function execute(promise, fn) {
    var done = false, res = tryCall2(fn, function (value) {
        return!done?done=!resolve(promise,value):void 0
    }, function (reason) {
        return!done?done=!reject(promise,reason):void 0
    })
    !done&&res===ERROR?done=!reject(promise,ERROR.value):void 0
}

/*
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
*/
//Promise.wrap(require('fs').readFile)('.\\server\\start.js', 'utf-8').then(console.log, console.error)
//
/*new Promise(function (resolve) {
 resolve(new Promise(function (resolve) {
 resolve('some value')
 }))
 }).then(console.log, console.error)*/
