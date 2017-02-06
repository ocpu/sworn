module.exports = function (Promise) {
    Promise.all = function (arr) {
        var l = arguments.length, args = new Array(l)
        while (l--) args[l] = arguments[l]

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([])
            var remaining = args.length
            function res(i, val) {
                if (val && (typeof val === 'object' || typeof val === 'function')) {
                    if (val instanceof Promise && val.then === Promise.prototype.then) {
                        if (val._state === 1) return res(i, val._value)
                        else reject(val._value)
                        return
                    } else {
                        var then = val.then
                        if (typeof then === 'function') {
                            var p = new Promise(then.bind(val))
                            p.then(function (val) {
                                res(i, val)
                            }, reject)
                            return
                        }
                    }
                }
                args[i] = val
                if (--remaining === 0) {
                    resolve(args)
                }
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i])
            }
        })
    }
}