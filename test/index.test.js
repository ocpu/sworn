var Promise = require('../')
var sinon = require('sinon')
var expect = require('expect.js')

function timeout(time, action, value) {
    return new Promise(function (resolve, reject) {
        setTimeout(action === 'res' ? resolve : action === 'rej' ? reject : function () {}, time, value)
    })
}

it('', function (done) {

})