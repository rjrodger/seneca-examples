$(function(){

  var prodbox = {
    app01:$('#app01'),
    ora02:$('#ora02'),
  }

  var prod_form  = $('#prod_form')
  var code_input = $('#code_input')

  for( var code in prodbox ) {
    prodbox[code].click(function(){
      var box = $(this)
      code_input.val(box.attr('id'))
      prod_form.submit()
    })
  }
})