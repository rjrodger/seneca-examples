/* Copyright (c) 2010-2013 Richard Rodger, MIT License */
"use strict";


var connect  = require('connect')



module.exports = function( options, register ) {

  options = this.util.deepextend({
    prefix:'/page'
  },options)

  var app = connect()

  app.use(connect.static(__dirname+'/web'))

  register( null, {
    name:'page',
    service: function(req,res,next) {
      if( 0 == req.url.indexOf(options.prefix) ) {
        req.url = req.url.substring(options.prefix.length)
        app( req, res, next )
      }
      else next()
    }
  })
}
