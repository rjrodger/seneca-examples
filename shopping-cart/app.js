/* Copyright (c) 2013 Richard Rodger, MIT License */
"use strict";


var http = require('http')

var express = require('express')
var argv    = require('optimist').argv


var conf = {
  port: argv.p || 80
}

var seneca  = require('seneca')()
seneca.use('engage')
seneca.use('cart')


var product_ent = seneca.make$('shop','product')
var apple  = product_ent.make$({name:'apple',price:1,code:'app01'}).save$(function(e,o){apple=o})
var orange = product_ent.make$({name:'orange',price:2,code:'ora02'}).save$(function(e,o){orange=o})


var app = express()
app.enable('trust proxy')

app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

app.use(express.static(__dirname + '/public'))


app.use( seneca.service() )

app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')


app.get('/', function(req, res){
  res.render('index.ejs',{locals:{}})
})

app.get('/cart', function(req, res){
  res.render('cart.ejs',{locals:{}})
})


var server = http.createServer(app)
server.listen(conf.port)

seneca.use('admin',{server:server})
