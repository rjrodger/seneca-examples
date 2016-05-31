/* Copyright (c) 2013-2015 Richard Rodger, MIT License */
'use strict'

// use the http://expressjs.com web framework
var Express = require('express')
var BodyParser = require('body-parser')
var CookieParser = require('cookie-parser')
var MethodOverride = require('method-override')

// use https://github.com/substack/node-optimist for parsing the command line
var argv = require('optimist').argv

// setup the configuration
var conf = {
  port: argv.p || 3000
}

// create a seneca instance
var seneca = require('seneca')()

// use the example plugins
// they are all sub folders
seneca.use('./page-plugin')
seneca.use('./api-plugin')
seneca.use('./quick-plugin')

// set up express
var app = Express()
app.use(CookieParser())
app.use(Express.query())
app.use(BodyParser.urlencoded({extended: true}))
app.use(MethodOverride())
app.use(BodyParser.json())

// this is the top level static content
app.use(Express.static(__dirname + '/public'))

// add in the seneca middleware
// this is how the seneca plugins can respond to HTTP requests
app.use(seneca.export('web'))

// start the app!
app.listen(conf.port)
