var Promise = module.exports = require('./core')

require('./lib/es6')(Promise)
require('./lib/flow')(Promise)
require('./lib/async')(Promise)