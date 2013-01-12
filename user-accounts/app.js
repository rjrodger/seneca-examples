/* Copyright (c) 2012 Richard Rodger, BSD License */

"use strict";

var http = require('http')

var express = require('express')
var argv    = require('optimist').argv
var seneca  = require('seneca')

var conf = {
  port: argv.p || 80
}

var si = seneca()
si.use('util')
si.use('user')
si.use('auth',{redirect:{login:{win:'/account',fail:'/login#failed'}}})


var app = express()
app.enable('trust proxy')

app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

app.use(express.static(__dirname + '/public'))


app.use( si.service() )

app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')


app.get('/login', function(req, res){
  res.render('login.ejs',{})
})

app.get('/',function(req,res){
  res.writeHead(200)
  res.end('hello')
})

app.get('/account', function(req, res){
  res.render('account.ejs',{locals:{user:req.seneca.user}})
})



var u = si.pin({role:'user',cmd:'*'})
u.register({nick:'u1',name:'nu1',email:'u1@example.com',password:'u1',active:true})
u.register({nick:'u2',name:'nu2',email:'u2@example.com',password:'u2',active:true})
u.register({nick:'a1',name:'na1',email:'a1@example.com',password:'a1',active:true,admin:true})



var server = http.createServer(app)
server.listen(conf.port)

si.use('admin',{server:server})
