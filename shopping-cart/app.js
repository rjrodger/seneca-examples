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


var engagement = seneca.pin({role:'engage',cmd:'*'})

app.get('/foo/:bar', function(req, res){
  engagement.set({key:'foo',value:req.params.bar,req:req,res:res},function(err){
    if( err ) console.log(err);
    res.writeHead(200)
    res.end('done')
  })
})

app.get('/bar',function(req,res){
  engagement.get({key:'foo',req:req,res:res},function(err,bar){
    if( err ) console.log(err);
    res.writeHead(200)
    res.end('bar:'+bar)
  })
})


var server = http.createServer(app)
server.listen(conf.port)

seneca.use('admin',{server:server})
