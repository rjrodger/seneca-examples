var util = require('util')

var request = require('request')
var _       = require('lodash')

var base = 'http://localhost:3000/'
var headers = {'api-access-token':'1234'}


;print('get',{url:base+'hello',headers:headers},function(){

;print('get',{url:base+'product',headers:headers},function(){
;print('get',{url:base+'product/0',headers:headers},function(){
;print('get',{url:base+'product/1',headers:headers},function(){
;print('get',{url:base+'product/2',headers:headers},function(){

;print('post',{url:base+'product',headers:headers,json:{
  id$:2, name:'Pear', price:299
}},function(){

;print('get',{url:base+'product/2',headers:headers},function(){

;print('put',{url:base+'product/2',headers:headers,json:{
  name:'Pear', price:Math.floor(300*Math.random())
}},function(){

;print('get',{url:base+'product/2',headers:headers},function(){

;print('del',{url:base+'product/1',headers:headers},function(){
;print('get',{url:base+'product/1',headers:headers},function(){

;print('get',{url:base+'product/0/star',headers:headers},function(){
;print('put',{url:base+'product/0/star',headers:headers},function(){
;print('get',{url:base+'product/0/star',headers:headers},function(){

})})})})})})})})})})})})})})



// utility function to pretty print request results
function print() {
  var a = Array.prototype.slice.call(arguments)
  var mstr = a[0]

  var n = _.isFunction( a[a.length-1] ) ? a.pop() : null

  request[mstr].apply(request, a.slice(1).concat(function(err,res,body){
    console.log(mstr,res.req.path,res.statusCode,err||body)
    !err && n && n()
  }))
}
