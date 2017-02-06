var Promise = require('../')

module.exports = {
    deferred: Promise.defer,
    resolved: Promise.resolve,
    rejected: Promise.reject
}