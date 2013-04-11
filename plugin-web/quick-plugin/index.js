/* Copyright (c) 2010-2013 Richard Rodger, MIT License */
"use strict";



module.exports = function( options, register ) {

  // register this plugin with seneca
  register( null, {
    name:'quick',

    // you need a middleware function to look for a matching URL
    service: function(req,res,next) {

      // look for a URL
      if( 0 == req.url.indexOf('/quick') ) {

        // respond manually
        res.writeHead(200,{
          'Content-Type': 'application/json'
        })
        res.end('{"data":"quick response!"}')
      }

      // else this request is nothing to do with us!
      else next()
    }
  })
}
