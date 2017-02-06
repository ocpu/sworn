var Promise = module.exports = require('./core')

require('./lib/flow')(Promise)
require('./lib/iterate')(Promise)
require('./lib/async')(Promise)