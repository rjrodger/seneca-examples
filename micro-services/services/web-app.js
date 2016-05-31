
var Express = require('express')
var BodyParser = require('body-parser')
var seneca = require('seneca')()

seneca
  .use('user')
  .use('auth')
  .use('../lib/api.js')
  .client({port: 10202, pin: {role: 'offer', cmd: '*'}})
  .client({port: 10201, pin: {role: 'user', cmd: '*'}})

var app = Express()

app.use(BodyParser.json())
app.use(seneca.export('web'))
app.use(Express.static('./public'))
app.listen(3000)
