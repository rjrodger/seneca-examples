/* Copyright (c) 2013-2015 Richard Rodger, MIT License */
"use strict";


var http = require('http')

var express        = require('express')
var bodyParser     = require('body-parser')
var cookieParser   = require('cookie-parser')
var methodOverride = require('method-override')
var session        = require('express-session')
var serveStatic    = require('serve-static')
var argv    = require('optimist').argv


var conf = {
  port: argv.p || 3000
}


// create a seneca instance
var seneca  = require('seneca')()


// enable the /mem-store/dump HTTP end point
// this lets you see the entire contents of the database as a JSON object
// in the browser - very useful for debugging!
// Go to http://localhost:3000/mem-store/dump to debug db contents
seneca.use('mem-store',{web:{dump:true}})

// use the engage plugin to store extended user sessions
// these are known as "engagements"
// this means that user's shopping carts will be saved and still active if they
// return the next day
seneca.use('engage')

// the shopping cart plugin provides standard web shopping cart business logic
// and also a HTTP JSON api
seneca.use('cart')

// set up express
var app = express()
app.enable('trust proxy')

app.use(cookieParser())
app.use(express.query())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(bodyParser.json())

app.use(serveStatic(__dirname + '/public'))

// expose the shopping cart api
// the seneca.export('web') method returns a single function with the signature
// function(req,res,next) that can be used with connect or express
// this service method wraps up all the plugin HTTP endpoints
// seneca includes the connect utility plugin by default, which
// sets the special arguments req$ and res$ on all seneca calls, allowing
// seneca actions to access the current HTTP req and res objects 
app.use( seneca.export('web') )

// express views for the cart pages
app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')

// a utility method
function formatprice(price) {
  return '$' + (void 0 == price ? '0.00' : price.toFixed(2))
}

app.get('/', function(req,res,next) {
  req.seneca.act('role:cart,cmd:get',function(err,out) {
    if( err ) return next(err);
    res.render('index.ejs',{locals:{cart:out.cart,formatprice:formatprice}})
  })
})

app.get('/cart', function(req,res,next){
  req.seneca.act('role:cart,cmd:get',function(err,out) {
    if( err ) return next(err);
    res.render('cart.ejs',{locals:{cart:out.cart,formatprice:formatprice}})
  })
})

app.get('/checkout', function(req,res,next){
  req.seneca.act('role:cart,cmd:get',function(err,out) {
    if( err ) return next(err);
    res.render('checkout.ejs',{locals:{cart:out.cart,formatprice:formatprice}})
  })
})

// Use seneca.ready to ensure all plugins fully ready
// before we extend action patterns
seneca.ready(function(){

  // ensure that cart actions get the cart from the engagement
  seneca.wrap({role:'cart',cmd:'*'},function(args,done){
    var seneca = this
    var prior  = this.prior

    if( !args.req$ ) return this.prior( args, done );

    this.act('role:engage,cmd:get,key:cart',function(err,out) {
      if( err ) return done(err);

      args.cart = out.value
      prior( args, function(err,out) {
        if( err ) return done(err);

        this.act('role:engage,cmd:set,key:cart',{value:out.cart.id},function(err){
          if( err ) return done(err);

          done(null,out)
        })
      })
    })
  })
})


// use the node.js http api to create a HTTP server
// this allows the admin plugin to use websockets
var server = http.createServer(app)
server.listen(conf.port)

// unlike the user-accounts example, the local:true
// setting means anybody can access the admin panel from localhost
seneca.use('data-editor',{admin:{local:true}})
seneca.use('admin',{server:server,local:true})

// set up some test products for the store
// create a product entity object
var product_ent = seneca.make$('shop','product')

// create new product entities and save them
// (the $ suffix avoids namespace collisions with your own properties)
product_ent.make$({name:'apple',price:1,code:'app01'}).save$()
product_ent.make$({name:'orange',price:2,code:'ora02'}).save$()



