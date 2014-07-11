/* Copyright (c) 2010-2014 Richard Rodger, MIT License */
"use strict";



module.exports = function( options ) {

  // you need a middleware function to look for a matching URL
  this.act('role:web',{use:function(req,res,next) {

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
  }})


  // register this plugin with seneca
  return { name:'quick' }

}
