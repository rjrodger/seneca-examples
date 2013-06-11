/* Copyright (c) 2012-2013 Richard Rodger, MIT License */
"use strict";


var http = require('http')

var uuid      = require('node-uuid');
var express = require('express');
var argv    = require('optimist').argv;


// create a seneca instance
var seneca  = require('seneca')({
  log:'print'
})

// load configuration for plugins
// top level properties match plugin names
// copy template config.template.js to config.mine.js and customize
seneca.use('config',{file:'./config.mine.js'})


var conf = {
  port: argv.p || 3000
}

/*
seneca.use('mongo-store',{
  name:'seneca-pay',
  host:'127.0.0.1',
  port:27017
})
*/

seneca.use('seneca-pay')
seneca.use('seneca-stripe-pay')


// use the express module in the normal way
var app = express()
app.enable('trust proxy')

app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

app.use(express.session({secret:'seneca'}))

app.use(express.static(__dirname + '/public'))


// add any middleware provided by seneca plugins
app.use( seneca.service() )


// some express views
app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')

app.get('/buy', function(req, res){
  res.render('buy.ejs',{
    currencyCode: 'USD',
    amount: 399,
    description: 'One marry Christmas',
    refno: new Buffer(uuid.v1(null, [])).toString('hex')
  })
})

app.get('/completed', function(req, res){
  var refno = req.query['refno'];
  seneca.act({role:'transaction', cmd:'find', q:{'refno':refno}}, function(err, out) {
    if (err) {
      res.render('completed.ejs', {output:'Transaction not available'})
    }
    else {
      res.render('completed.ejs', { output:JSON.stringify(out.transaction) })
    }
  })
})

app.get('/cancelled', function(req, res){
  res.render('cancelled.ejs',{})
})


// when rendering the account page, use the req.seneca.user object
// to get user details. This is automatically set up by the auth plugin
app.get('/account', function(req, res){
  res.render('account.ejs',{locals:{user:req.seneca.user}})
})


// create a HTTP server using the core Node API
// this lets the admin plugin use web sockets
var server = http.createServer(app)
server.listen(conf.port)


// visit http://localhost[:port]/admin to see the admin page
// you'll need to logged in as an admin - user 'a1' above
seneca.use('admin',{server:server})

