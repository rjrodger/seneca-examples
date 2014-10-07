"use strict";

var assert = require('assert')

var seneca = require('seneca')


describe('simple', function(){

  it('happy', function( fin){

    seneca({log:'silent',errhandler:fin})
      .use('..')
      .act('role:simple,cmd:foo,text:red', 
           function( err, out ) {
             if( err ) return fin(err);

             assert.equal( out.text, 'foo-red-zed' )
             fin()
           })
  })

})
