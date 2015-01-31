var seneca = require('seneca')()
      .use('./simple')
      .act('role:simple,cmd:foo,text:red', console.log)
