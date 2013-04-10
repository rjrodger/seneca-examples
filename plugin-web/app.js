/* Copyright (c) 2013 Richard Rodger, MIT License */
"use strict";


var http = require('http')

var express = require('express')
var argv    = require('optimist').argv


var conf = {
  port: argv.p || 3000
}


// create a seneca instance
var seneca  = require('seneca')()

seneca.use('./page-plugin')


// set up express
var app = express()

app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use( seneca.service() )


// express views for the cart pags
app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')


app.listen(conf.port)



