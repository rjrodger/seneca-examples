$(function(){

  $('#login').submit(function(){
    var data = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    $.post('/auth/login',data,showAccount)
    return false
  })

  $('#logout').click(function(){
    $.post('/auth/logout',{},showLogin)
  })


  $.get('/auth/user',showAccount)
})


function showAccount(instance) {
  if( !instance.ok ) return console.log(instance.why);

  if( instance.user ) {
    $('#user_name').text(instance.user.name)
    $('#user_email').text(instance.user.email)

    $('#content_login').slideUp()
    $('#content_account').slideDown()
  }
}

function showLogin(data) {
  if( !data.ok ) return console.log(data.why);

  $('#content_login').slideDown()
  $('#content_account').slideUp()
}