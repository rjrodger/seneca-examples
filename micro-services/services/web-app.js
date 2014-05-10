
var express    = require('express')
var bodyParser = require('body-parser')
var seneca     = require('seneca')()


seneca
  .use('auth')
  .declare('user')
  //.client()
  //.client({type:'queue'})
  .client({type:'queue',pin:'role:user,cmd:*'})

var app = express()
app.use(bodyParser())

app.use(seneca.export('web'))

app.use( express.static('./public') )

app.listen(3000)

