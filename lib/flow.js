var assign = require('./util').objAdd

module.exports = function (Promise) {
    assign(Promise, {
        resolve: function (value) {
            return new Promise(function (resolve) {
                resolve(value)
            })
        },
        reject: function (reason) {
            return new Promise(function (_, reject) {
                reject(reason)
            })
        },
        defer: function () {
            return new Deferred
        }
    })

    assign(Promise.prototype, {
        'catch': function (onRejected) {
            return this.then(void 0, onRejected)
        },
        fail: function (onRejected) {
            return this.then(void 0, onRejected)
        },
        tap: function (handler) {
            return this.then(function (value) {
                handler(value)
                return value
            })
        }
    })

    function Deferred() {
        var self = this
        this.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve
            self.reject = reject
        })
    }
}