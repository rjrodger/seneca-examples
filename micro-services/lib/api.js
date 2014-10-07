
module.exports = function( options ) {
  var seneca = this
  var plugin = 'api'


  seneca.add( {role:plugin, end:'offer'}, end_offer)
  

  function end_offer( args, done ) {
    var user = args.req$.seneca.user || {}

    this.act('role:offer,cmd:provide',{nick:user.nick},done)
  }


  seneca.act({role:'web', use:{
    prefix:'/api/',
    pin:{role:plugin,end:'*'},
    map:{
      'offer': { GET:true },
    }
  }})


  return {name:plugin};
}
