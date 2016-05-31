/* Copyright (c) 2013-2016 Richard Rodger, MIT License */
'use strict'

var Fs = require('fs')
var Util = require('util')
var seneca = require('seneca')()

/* Use two separate instances of jsonfile-store, each looking after a
 different set of data entities */
seneca.use('jsonfile-store$foo', {folder: 'foo-data', map: {'-/foo/-': '*'}})
seneca.use('jsonfile-store$bar', {folder: 'bar-data', map: {'-/bar/-': '*'}})
if (seneca.version >= '2.0.0') {
  seneca.use('entity')
}
// Use a different data store for another set of data entities
seneca.use('level-store', {folder: 'zed-data', map: {'-/zed/-': '*'}})

// Everything else goes into the default mem-store

seneca
.make$('foo/red', {a: 1})
.save$(function (err, foo_red) {
  if(err) return console.error('foo_red', err)
  var fc = Fs.readFileSync(__dirname + '/foo-data/foo_red/' + foo_red.id + '.json')
  console.log('entity:' + foo_red + ', file contents:' + fc)
  do_bar_green(this)
})

function do_bar_green (seneca) {
  seneca
  .make$('bar/green', {b: 2})
  .save$(function (err, bar_green) {
    if(err) return console.error('bar_green', err)
    var fc = Fs.readFileSync(__dirname + '/bar-data/bar_green/' +
    bar_green.id + '.json')
    console.log('entity:' + bar_green + ', file contents:' + fc)
    do_zed_blue(seneca)
  })
}

function do_zed_blue (seneca) {
  seneca
  .make$('zed/blue', {c: 3})
  .save$(function (err, zed_blue) {
    if(err) return console.error('zed_blue', err)
    zed_blue.native$(function (err, level) {
      if(err) return console.error('zed_blue.native$', err)
      level.get(zed_blue.id, function (err, data) {
        if(err) return console.error('zed_blue.id', err)
        console.log('entity:' + zed_blue + ' level data:' + Util.inspect(data))
        do_qaz_yellow(seneca)
      })
    })
  })
}

function do_qaz_yellow (seneca) {
  seneca
  .make$('qaz/yellow', {d: 4})
  .save$(function (err, qaz_yellow) {
    if(err) return console.error('qaz_yellow', err)
    qaz_yellow.native$(function (err, entmap) {
      if(err) return console.error('qaz_yellow.native$', err)
      var dc = entmap.qaz.yellow[qaz_yellow.id]
      console.log('entity:' + qaz_yellow + ', data contents:' + Util.inspect(dc))
    })
  })
}
