
var express    = require('express')
var bodyParser = require('body-parser')
var seneca     = require('seneca')()


seneca
  .use('user')
  .use('auth')
  .use('../lib/api.js')
  .client({port:10202,pin:{role:'offer',cmd:'*'}})
  .client({port:10201,pin:{role:'user',cmd:'*'}})

var app = express()

app.use( bodyParser.json() )
app.use( seneca.export('web') )
app.use( express.static('./public') )

app.listen(3000)

