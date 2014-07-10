/* Copyright (c) 2010-2014 Richard Rodger, MIT License */
"use strict";



module.exports = function( options ) {

  // you need a middleware function to look for a matching URL
  // export('web/httprouter') returns a router with Express-like capabilities
  var router = this.export('web/httprouter')

  this.act('role:web',{use:router(function(app){
    app.get("/api/:action",function(req,res){

      // respond manually
      res.writeHead(200,{
        'Content-Type': 'application/json'
      })
      res.end( JSON.stringify({action:req.params.action}) )
    })
  })})


  // register this plugin with seneca
  return { name:'api' }
}
