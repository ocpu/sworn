var assign = require('./util').objAdd

module.exports = function (Promise) {
    Promise.defer = function () {
        return new Deferred
    }



    Promise.prototype.tap = function (handler) {
        return this.then(function (value) {
            handler(value)
            return value
        })
    }

    function Deferred() {
        var self = this
        this.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve
            self.reject = reject
        })
    }
}