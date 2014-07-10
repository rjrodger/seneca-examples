/* Copyright (c) 2010-2013 Richard Rodger, MIT License */
"use strict";



module.exports = function( options, register ) {

  // register this plugin with seneca
  register( null, {
    name:'api',

    // you need a middleware function to look for a matching URL
    // export('web/httprouter') returns a router with Express-like capabilities
    service: this.export('web/httprouter')(function(app){
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
