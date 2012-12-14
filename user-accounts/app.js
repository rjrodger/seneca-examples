/* Copyright (c) 2012 Richard Rodger, BSD License */

"use strict";

var express = require('express')
var argv    = require('optimist').argv
var seneca  = require('seneca')

var conf = {
  port: argv.p || 80
}


var si = seneca({log:'print'})
si.use('util')
si.use('user')
si.use('auth',{xredirect:{win:'/account',fail:'/login#failed'}})


var app = express()
app.enable('trust proxy')

app.use(express.logger())
app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())


app.use( si.service() )

app.use(express.static(__dirname + '/public'))

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


var u = si.pin({role:'user',cmd:'*'})
u.register({nick:'u1',name:'nu1',password:'u1',active:true})


app.listen(conf.port)

