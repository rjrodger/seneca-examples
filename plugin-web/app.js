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

// use the example plugin
// they are all sub folders
seneca.use('./page-plugin')


// set up express
var app = express()
app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

// this is the top level static content
app.use(express.static(__dirname + '/public'))

// add in the sencea middleware
// this is how the seneca plugins can respond to HTTP requests
app.use( seneca.service() )


// express views for the dynamic pages
app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')


// start the app!
app.listen(conf.port)



