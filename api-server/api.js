// PUBLIC DOMAIN
"use strict";

module.exports = function api( options ) {
  var seneca = this

  seneca.add('role:api,info:hello', hello)

  seneca.add('role:api,product:star', get_star)
  seneca.add('role:api,product:handle_star', handle_star)


  seneca.add('init:api',function(args,done){

    // Order is significant here!

    seneca.act('role:web',{use:{
      prefix:'/',
      pin:'role:api,info:*',
      map:{
        hello:true
      }
    }})

    seneca.use(
      {name:'jsonrest-api',tag:'product'},
      {
        prefix: '/',
        list:   {embed:'list'},
        pin:    { name:'product' },
        startware: verify_token,
        allow_id: true
      })

    seneca.act('role:web',{use:{
      prefix:'/product',
      pin:'role:api,product:*',
      startware: verify_token,
      map:{
        star: { 
          alias:'/:id/star' 
        },
        handle_star:{
          PUT:true,
          DELETE:true,
          alias:'/:id/star'
        }
      }
    }})

    done()
  })


  var internal_err = {
    http$: {status:500},
    why:   'Internal error.'
  }

  var bad_input = {
    http$: {status:400},
    why:   'Bad input.'
  }


  function verify_token(req,res,next) {
    var token = req.headers['api-access-token']

    // Hard coded token for this example!!!
    if( '1234' == token ) return next();

    res.writeHead(401,"Access denied.")
    res.end()
  }


  function hello( args, done ) {
    done(null,{msg:'hello!'})
  }

  function get_star( args, done ) {
    this.make$('product').load$(args.id,function(err,res){
      if(err) return done(null,internal_err);
      if(!res) return done(null,bad_input);

      return done(null,{
        product: res.id,
        star:    res.star
      })
    })
  }

  function handle_star( args, done ) {
    this.act(
      'role:product,cmd:star',
      {
        // product id
        id:args.id,

        // PUT means star, DELETE means unstar
        star:('PUT'===args.req$.method)
      },

      function(err,res){
        if(err) return done(null,internal_err);
        if(!res.ok) return done(null,bad_input)

        return done(null,{
          product: res.id,
          star:    res.star
        })
      }
    )
  }

}
