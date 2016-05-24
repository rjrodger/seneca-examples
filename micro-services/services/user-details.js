
require('seneca')()
  .use('user')
  .listen(10201)
  .ready(function(){
    this.act({role:'user',cmd:'register',nick:'user', name:'user1',password:'user'})
  })



