$(function(){

  $('#login').submit(function(){
    var data = {
      username: $('#username').val(),
      password: $('#password').val()
    }

    $.ajax({
      type:        'POST',
      url:         '/auth/login',
      data:        JSON.stringify(data),
      dataType:    'json',
      contentType: 'application/json',
      success:     showAccount
    })
    console.log('DATA:', data)
    return false
  })

  $('#logout').click(function(){
    $.ajax({
      type:        'POST',
      url:         '/auth/logout',
      data:        '{}',
      dataType:    'json',
      contentType: 'application/json',
      success:     showLogin
    })
  })


  $.ajax({type:'GET',url:'/auth/instance',success:showLogin})
  $.ajax({type:'GET',url:'/api/offer',success:showOffer})
})

function print(err, user){
  if(err){
    console.log('IN PRINT BUT ERROR:', err)
  }
  console.log('AT SHOW ACCOUNT WITH USER:', user)
}

function showAccount(instance) {
  if( instance.user ) {
    $('#user_nick').text(instance.user.nick)
    $('#user_name').text(instance.user.name)

    $('#content_login').slideUp()
    $('#content_account').slideDown()
    $.ajax({type:'GET',url:'/api/offer',success:showOffer})
  }
}

function showLogin(instance) {
  if( instance.user ) return showAccount(instance)

  $('#content_login').slideDown()
  $('#content_account').slideUp()

  $.ajax({type:'GET',url:'/api/offer',success:showOffer})
}


function showOffer(offer) {
  $('#offer').text(offer.product)
}
