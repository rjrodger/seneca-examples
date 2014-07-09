
require('seneca')()
  .use('user')
  .listen(10201)
  .ready(function(){
    this.act({role:'user',cmd:'register',nick:'u1',name:'U1',password:'u1'})
  })


