/* Copyright (c) 2013 Richard Rodger, MIT License */
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
// Go to http://localhost:3333/mem-store/dump to debug db contents
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


// create somes "pins" for convenience
// the patterns generate objects with methods matching the wildcards
var cart_pin   = seneca.pin({role:'cart',cmd:'*'})
var engage_pin = seneca.pin({role:'engage',cmd:'*'})



// a utility method
function formatprice(price) {
  return '$' + (void 0 == price ? '0.00' : price.toFixed(2))
}


// gets cart from engagement, and sets it after changes
function handlecart(req,res,next,action) {
  req.seneca.act('role:engage,cmd:get,key:cart',function(err,out) {
    if( err ) return next(err);

    action(out.value, function(cart){
      req.seneca.act('role:engage,cmd:set,key:cart',{value:cart})
    })
  })
}


app.get('/', function(req,res,next) {
  handlecart( req,res,next, function( cart, end ) {
    req.seneca.act('role:cart,cmd:get',{cart:cart},function(err,out) {
      if( err ) return next(err);
      
      end(out.cart)
      res.render('index.ejs',{locals:{cart:out.cart,formatprice:formatprice}})
    })
  })
})


app.get('/cart', function(req,res,next){
  handlecart( req,res,next, function( cart, end ) {
    req.seneca.act('role:cart,cmd:get',{cart:cart},function(err,out) {
      if( err ) return next(err);
      
      end(out.cart)
      res.render('cart.ejs',{locals:{cart:out.cart,formatprice:formatprice}})
    })
  })
})


app.get('/checkout', function(req,res,next){
  handlecart( req,res,next, function( cart, end ) {
    req.seneca.act('role:cart,cmd:get',{cart:cart},function(err,out) {
      if( err ) return next(err);

      end(out.cart)
      res.render('checkout.ejs',{locals:{cart:out.cart,formatprice:formatprice}})
    })
  })
})


// ensure that cart actions get the cart from the engagement
seneca.wrap({role:'cart',cmd:'*'},function(args,done){
  var seneca = this

  // grab the cart from the engagement
  handlecart( args.req$, args.res$, done, function(cart,end){

    // set the cart parameter for the cart actions
    args.cart = cart
    seneca.prior(args,function(err,out){
      if(err) return done(err);

      // save the updated cart
      end(cart)
      done(null,out)
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



