'use strict'

var Assert = require('assert')
var Seneca = require('seneca')

describe('simple', function () {
  it('happy', function (fin) {
    Seneca({log: 'silent', errhandler: fin})
    .use('..')
    .act('role:simple,cmd:foo,text:red',
    function (err, out) {
      if(err) return fin(err)
      Assert.equal(out.text, 'foo-red-zed')
      fin()
    })
  })
})
