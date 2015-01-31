"use strict";

module.exports = function simple() {
  var seneca = this

  var suffix = ''

  seneca.add('role:simple,cmd:foo', cmd_foo)

  seneca.add('init:simple', init)


  function cmd_foo( args, done ) {
    done( null, {text:'foo-'+args.text+suffix} )
  }


  function init( args, done ) {
    var seneca = this
    seneca.log.info("preparing something...")

    setTimeout( function() {
      suffix = '-zed'
      seneca.log.info("ready!")
      done()
    }, 111 )
  }

}
