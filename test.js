var Promise = require('./')

console.log('Static properties:', Object.getOwnPropertyNames(Promise).slice(3))
console.log('Instance properties:', Object.getOwnPropertyNames(Promise.prototype).slice(1))