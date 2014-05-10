
module.exports = function( options ) {
  var seneca = this
  var plugin = 'offers'




  seneca.add( {role:plugin, cmd:'provide'}, cmd_provide)
  

  function cmd_provide( args, done ) {
    var offers = [
      {a:1}
    ]
    done(null,offers)
  }



  return {name:plugin};
}
