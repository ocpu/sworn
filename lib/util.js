module.exports.objAdd = function (original, obj) {
    for (var args = [], i = 1, l = arguments.length; i < l; i++)
        args[i-1] = arguments[i]
    return args.reduce(function (all, now) {
        var name
        for (name in now) if (now.hasOwnProperty(name))
            Object.defineProperty(all, name, Object.getOwnPropertyDescriptor(now, name))
        return all
    }, original)
}