
var assert = require('assert')

var seneca = require('seneca')()
      .use('../lib/offer.js')

seneca.act('role:offer,cmd:provide',function(err,out){
  assert.ok(null==err)
  assert.equal('Orange',out.product)
})

seneca.act('role:offer,cmd:provide,nick:foo',function(err,out){
  assert.ok(null==err)
  assert.equal('Apple',out.product)
})


/*
var foo = require('./foo.js')
seneca.add('mod:foo',foo)

seneca.act('mod:foo,bar:1',console.log)
*/
