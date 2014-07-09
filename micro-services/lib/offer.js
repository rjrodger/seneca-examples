
module.exports = function( options ) {
  var seneca = this
  var plugin = 'offer'


  seneca.add( {role:plugin, cmd:'provide'}, cmd_provide)
  

  function cmd_provide( args, done ) {
    if( args.nick ) return done(null,{product:'Apple'});

    return done(null,{product:'Orange'});
  }


  return {name:plugin};
}
