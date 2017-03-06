module.exports = function (Promise) {
    Promise.prototype['catch'] = Promise.prototype.fail = function (onRejected) {
        return this.then(void 0, onRejected)
    }

    Promise.resolve = function (value) {
        return new Promise(function (resolve) {
            resolve(value)
        })
    }

    Promise.reject = function (reason) {
        return new Promise(function (_, reject) {
            reject(reason)
        })
    }

    Promise.all = function (arr) {
        var l = arguments.length, args = new Array(l)
        while (l--) args[l] = arguments[l]

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([])
            var remaining = args.length
            function res(i, val) {
                if (val && (typeof val === 'object' || typeof val === 'function')) {
                    var then = val.then
                    if (typeof then === 'function') {
                        new Promise(then.bind(val)).then(function (val) {
                            res(i, val)
                        }, reject)
                        return
                    }
                }
                args[i] = val
                if (--remaining === 0)
                    resolve(args)
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i])
            }
        })
    }
}