/* Copyright (c) 2013-2014 Richard Rodger, MIT License */
"use strict";


var seneca = require('seneca')()

seneca.use( 'jsonfile-store', { folder:'json-data',  map:{'-/json/-':'*'}})
seneca.use( 'level-store',    { folder:'level-data', map:{'-/level/-':'*'}})

seneca.ready(function(err){
  if(err) return console.error(err);

  var seneca = this

  ;seneca
    .make$('json','foo',{propA:'val1',propB:'val2'})
    .save$(function(err,json_foo){
      if(err) return console.error(err);
      console.log(''+json_foo)

  ;seneca
    .make$('level','bar',{propA:'val3',propB:'val4'})
    .save$(function(err,level_bar){
      if(err) return console.error(err);
      console.log(''+level_bar)

  }) })
})
