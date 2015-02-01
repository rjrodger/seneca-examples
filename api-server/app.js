
var seneca = require('seneca')()
      .use('./product_catalog')
      .use('./api')
      .ready(function(){
        this.make$('product')
          .make$({name:'Apple',price:99}).save$()
          .make$({name:'Orange',price:199}).save$()
      })

var app = require('express')()
      .use( require('body-parser').json() )
      .use( seneca.export('web') )
      .listen(3000)

