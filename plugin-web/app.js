/* Copyright (c) 2013 Richard Rodger, MIT License */
"use strict";


// use the http://expressjs.com web framework
var express = require('express')

// use https://github.com/substack/node-optimist for parsing the command line
var argv    = require('optimist').argv


// setup the configuration
var conf = {
  port: argv.p || 3000
}


// create a seneca instance
var seneca  = require('seneca')()

// use the example plugins
// they are all sub folders
seneca.use('./page-plugin')
seneca.use('./api-plugin')
seneca.use('./quick-plugin')





// set up express
var app = express()
app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

// this is the top level static content
app.use(express.static(__dirname + '/public'))

// add in the seneca middleware
// this is how the seneca plugins can respond to HTTP requests
app.use( seneca.export('web') )


// start the app!
app.listen(conf.port)



