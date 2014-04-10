/* Copyright (c) 2012-2013 Richard Rodger, MIT License */
"use strict";


var http = require('http')

var express = require('express')
var argv    = require('optimist').argv


// create a seneca instance
var seneca  = require('seneca')()

// load configuration for plugins
// top level properties match plugin names
// copy template config.template.js to config.mine.js and customize
seneca.use('options','config.mine.js')


var conf = {
  port: argv.p || 3000
}

// use the user and auth plugins
// the user plugin gives you user account business logic
seneca.use('user')

// the auth plugin handles HTTP authentication
seneca.use('auth',{
  // redirects after login are needed for traditional multi-page web apps
  redirect:{
    login:{win:'/account',fail:'/login#failed'},
    register:{win:'/account',fail:'/#failed'},
  }
})


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


app.use( seneca.export('web') )


// some express views
app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')

app.get('/login', function(req, res){
  res.render('login.ejs',{})
})


// when rendering the account page, use the req.seneca.user object
// to get user details. This is automatically set up by the auth plugin
app.get('/account', function(req, res){
  res.render('account.ejs',{locals:{user:req.seneca.user}})
})





// create some test accounts
// the "pin" creates a more convenient api, avoiding the need for 
// a full action specification: seneca.act( {role:'user', cmd:'register', ... } )
var u = seneca.pin({role:'user',cmd:'*'})
u.register({nick:'u1',name:'nu1',email:'u1@example.com',password:'u1',active:true})
u.register({nick:'u2',name:'nu2',email:'u2@example.com',password:'u2',active:true})
u.register({nick:'a1',name:'na1',email:'a1@example.com',password:'a1',active:true,admin:true})


// create a HTTP server using the core Node API
// this lets the admin plugin use web sockets
var server = http.createServer(app)
server.listen(conf.port)

// visit http://localhost[:port]/admin to see the admin page
// you'll need to logged in as an admin - user 'a1' above
seneca.use('data-editor')
seneca.use('admin',{server:server})

