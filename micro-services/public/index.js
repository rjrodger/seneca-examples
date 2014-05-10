$(function(){

  $('#login').submit(function(){
    var data = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    $.ajax({type:'POST',url:'/auth/login',data:JSON.stringify(data),dataType:'json',contentType:'application/json',success:showAccount})
    return false
  })

  $('#logout').click(function(){
    $.ajax({type:'POST',url:'/auth/logout',data:'{}',dataType:'json',contentType:'application/json',success:showLogin})
  })


  $.ajax({type:'GET',url:'/auth/instance',success:showLogin})
})


function showAccount(instance) {
  if( instance.user ) {
    $('#user_name').text(instance.user.name)
    $('#user_email').text(instance.user.email)

    $('#content_login').slideUp()
    $('#content_account').slideDown()
  }
}

function showLogin(err) {
  $('#content_login').slideDown()
  $('#content_account').slideUp()
}
