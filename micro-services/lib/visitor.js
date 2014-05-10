
module.exports = function( options ) {
  var seneca = this
  var plugin = 'visitor'


  var visitorent = seneca.make$('visitor')
  var userent    = seneca.make$('sys/user')


  seneca.add( {role:plugin, cmd:'resolve'}, cmd_resolve)
  

  function cmd_resolve( args, done ) {
    visitorent.load$( args.id, function( err, visitor ) {
      if(err) return done(err);

      if( visitor ) {
        userent.load$( visitor.user, function( err, user ) {
          if(err) return done(err);

          return done( null, {visitor:visitor, user:user}) 
        })
      }
      else return visitorent.make$().save$(function(err,visitor){
        return done( err, {visitor:visitor, user:null}) 
      })
    })
  }


  return {name:plugin};
}
