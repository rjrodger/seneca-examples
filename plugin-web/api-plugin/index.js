/* Copyright (c) 2010-2013 Richard Rodger, MIT License */
"use strict";



module.exports = function( options, register ) {

  // register this plugin with seneca
  register( null, {
    name:'quick',

    // you need a middleware function to look for a matching URL
    service: this.httprouter(function(app){
      app.get("/api/:action",function(req,res){

        // respond manually
        res.writeHead(200,{
          'Content-Type': 'application/json'
        })
        res.end( JSON.stringify({action:req.params.action}) )
      })
    })
  })
}
