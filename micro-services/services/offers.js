
require('seneca')()
  .use('../lib/offers')
  .listen({type:'queue',pin:'role:offers,cmd:*'})


