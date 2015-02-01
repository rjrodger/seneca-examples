// PUBLIC DOMAIN
"use strict";

module.exports = function product_catalog( options ) {
  var seneca = this

  seneca.add('role:product,cmd:star', cmd_star)


  function cmd_star( args, done ) {
    var seneca = this

    seneca
      .make$('product')
      .load$(args.id,function( err, product ) {
        if(err) return done(err);

        if( product ) {
          product.star = Math.max(0,(
            (product.star||0) +
              ((args.star||true) ? +1 : -1 )))

          product.save$(function(err,product){
            if(err) return done(err);

            return done(null,{
              ok:   true,
              id:   product.id,
              star: product.star
            })
          })
        }
        else return done(null,{ok:false})
      })
  }

}
