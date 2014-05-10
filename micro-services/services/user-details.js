
require('seneca')()
  .use('user')
  .use('../lib/visitor.js')
  //.listen()
  //.listen({type:'queue'})
  .listen({type:'queue',pin:'role:user,cmd:*'})
  .ready(function(){
    this.act({role:'user',cmd:'register',nick:'u1',name:'U1',password:'u1'})
  })


