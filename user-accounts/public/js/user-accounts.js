$(function(){

  $('#xlogin').submit(function(){
    var data = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    http.post('/auth/login?redirect=true',data,printjson)
    return false
  })
})