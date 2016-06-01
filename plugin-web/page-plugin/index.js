/* Copyright (c) 2010-2013 Richard Rodger, MIT License */
'use strict'


// use the connect module to deliver the static pages
var Connect = require('connect')
var ServeStatic = require('serve-static')


module.exports = function (options) {
  /* setup the options
   by default, place this content under the /page URL
   deepextend is a utility function that works like underscore.extend,
   but is careful to recuresively extend also the internal structure of
   properties that have objects as values.*/
  options = this.util.deepextend({
    prefix: '/page'
  }, options)


  // create a new connect app - this is separate from the main one in app.js
  var app = Connect()

  // just serve static content from the web folder
  app.use(ServeStatic(__dirname + '/web'))

  // you need a middleware function to trigger the local connect app
  this.act('role:web', {use: function (req, res, next) {
    // look for that URL prefix, by default /page
    if(0 === req.url.indexOf(options.prefix)) {
      // remove the prefix to avoid confusing the local connect app
      req.url = req.url.substring(options.prefix.length)
      // and delegate the work to the local connect app
      app(req, res, next)
    }
    // else this request is nothing to do with us!
    else next()
  }})
  // register this plugin with seneca
  return { name: 'page' }
}
