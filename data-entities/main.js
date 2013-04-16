/* Copyright (c) 2013 Richard Rodger, MIT License */
"use strict";


var seneca = require('seneca')()

seneca.use('jsonfile-store',{ folder:'json-data', map:{'-/json/-':'*'}})
seneca.use('level-store',{ folder:'level-data', map:{'-/level/-':'*'}})

seneca.ready(function(err,seneca){

  ;seneca
    .make$('json','foo',{propA:'val1',propB:'val2'})
    .save$(function(err,json_foo){
      console.log(''+json_foo)

  ;seneca
    .make$('level','bar',{propA:'val3',propB:'val4'})
    .save$(function(err,level_bar){
      console.log(''+level_bar)

  }) })
})