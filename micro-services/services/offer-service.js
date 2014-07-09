require('seneca')()
  .use('../lib/offer')
  .listen(10202)
  .ready(function(){
    this.act({role:'offer',cmd:'provide'},console.log)
  })



