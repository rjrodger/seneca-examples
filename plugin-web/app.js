/* Copyright (c) 2013-2014 Richard Rodger, MIT License */
"use strict";


// use the http://expressjs.com web framework
var express        = require('express')
var bodyParser     = require('body-parser')
var cookieParser   = require('cookie-parser')
var methodOverride = require('method-override')

// use https://github.com/substack/node-optimist for parsing the command line
var argv = require('optimist').argv


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
app.use(cookieParser())
app.use(express.query())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(bodyParser.json())

// this is the top level static content
app.use(express.static(__dirname + '/public'))

// add in the seneca middleware
// this is how the seneca plugins can respond to HTTP requests
app.use( seneca.export('web') )


// start the app!
app.listen(conf.port)



