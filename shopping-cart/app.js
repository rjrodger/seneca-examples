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

app.use(express.cookieParser())
app.use(express.query())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.json())

app.use(express.static(__dirname + '/public'))

// expose the shopping cart api
// the seneca.service method returns a single function with the signature
// function(req,res,next) that can be used with connect or express
// this service method wraps up all the plugin HTTP endpoints
// seneca includes the connect utility plugin by default, which
// sets the special arguments req$ and res$ on all seneca calls, allowing
// seneca actions to access the current HTTP req and res objects 
app.use( seneca.service() )


// express views for the cart pags
app.engine('ejs',require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine','ejs')


// create somes "pins" for convenience
// the patterns generate objects with methods matching the wildcards
var cart_pin   = seneca.pin({role:'cart',cmd:'*'})
var engage_pin = seneca.pin({role:'engage',cmd:'*'})


// the engage plugin can wrap calls to other actions
// any matching argument keys are given values from the engagement store
// in this case, the cart id (if it exists) for the current user is taken from
// the store and used to set the value of the cart argument key 
engage_pin.wrap( {pin:{role:'cart',cmd:'*'}, keys:['cart']} )


// a utility method
function formatprice(price) {
  return '$' + (void 0 == price ? '0.00' : price.toFixed(2))
}


app.get('/', function(req, res, next){
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


// use the node.js http api to create a HTTP server
// this allows the admin plugin to use websockets
var server = http.createServer(app)
server.listen(conf.port)

// unlike the user-accounts example, the local:true
// setting means anybody can access the admin panel from localhost
seneca.use('admin',{server:server,local:true})



// set up some test products for the store
// create a product entity object
var product_ent = seneca.make$('shop','product')

// create new product entities and save them
// (the $ suffix avoids namespace collisions with your own properties)
product_ent.make$({name:'apple',price:1,code:'app01'}).save$()
product_ent.make$({name:'orange',price:2,code:'ora02'}).save$()



