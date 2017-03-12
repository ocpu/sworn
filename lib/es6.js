module.exports = function (Promise) {
    Promise.prototype['catch'] = Promise.prototype['fail'] = function (onRejected) {
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
        return new Promise(function (resolve, reject) {
            if (arr.length === 0) return resolve([])
            var remaining = arr.length
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
                arr[i] = val
                if (--remaining === 0)
                    resolve(arr)
            }
            for (var i = 0; i < arr.length; i++) {
                res(i, arr[i])
            }
        })
    }
}