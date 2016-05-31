/* Copyright (c) 2012-2015 Richard Rodger, MIT License */
'use strict'


var Http = require('http')

var Express = require('express')
var BodyParser = require('body-parser')
var CookieParser = require('cookie-parser')
var MethodOverride = require('method-override')
var Session = require('express-session')
var ServeStatic = require('serve-static')

// create a seneca instance
var seneca = require('seneca')()

// load configuration for plugins
// top level properties match plugin names
// copy template config.template.js to config.mine.js and customize
var options = seneca.options('config.mine.js')

// use the user and auth plugins
// the user plugin gives you user account business logic
seneca.use('user')

// the auth plugin handles HTTP authentication
seneca.use('auth', {
  // redirects after login are needed for traditional multi-page web apps
  redirect: {
    login: {
      win: '/account',
      fail: '/login#failed'
    },
    register: {
      win: '/account',
      fail: '/#failed'
    }
  }
})

// use the express module in the normal way
var app = Express()
app.enable('trust proxy')

app.use(CookieParser())
app.use(Express.query())
app.use(BodyParser.urlencoded({extended: true}))
app.use(MethodOverride())
app.use(BodyParser.json())

// Use in-memory sessions so OAuth will work
// In production, use redis or similar
app.use(Session({secret: 'seneca'}))
app.use(ServeStatic(__dirname + '/public'))

// add seneca middleware
app.use(seneca.export('web'))

// some express views
app.engine('ejs', require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/login', function (req, res) {
  res.render('login.ejs', {})
})


// when rendering the account page, use the req.seneca.user object
// to get user details. This is automatically set up by the auth plugin
app.get('/account', function (req, res) {
  res.render('account.ejs', {locals: {user: req.seneca.user}})
})

// create some test accounts
// the "pin" creates a more convenient api, avoiding the need for
// a full action specification: seneca.act( {role:'user', cmd:'register', ... } )
var u = seneca.pin({role: 'user', cmd: '*'})
u.register({nick: 'u1', name: 'nu1', email: 'u1@example.com', password: 'u1', active: true})
u.register({nick:'u2',name:'nu2',email:'u2@example.com',password:'u2',active:true})
u.register({nick: 'a1', name: 'na1', email: 'a1@example.com', password: 'a1', active: true, admin: true})

// create a HTTP server using the core Node API
// this lets the admin plugin use web sockets
var server = Http.createServer(app)
server.listen(options.main ? options.main.port : 3000)

// visit http://localhost[:port]/admin to see the admin page
// you'll need to logged in as an admin - user 'a1' above
seneca.use('data-editor')
seneca.use('admin', {server: server})
