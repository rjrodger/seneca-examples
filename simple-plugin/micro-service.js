var seneca = require('seneca')()
      .use('./simple')
      .listen()

// node micro-service.js &
// curl "http://localhost:10101/act?role=simple&cmd=foo&text=red"


