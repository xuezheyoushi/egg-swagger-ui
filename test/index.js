const Koa = require('koa')
const mw = require('../app/middleware/mw')
const path = require('path')

const app = new Koa()

app.use(mw({
  apiDefFile: path.join(__dirname, 'swagger.yaml')
}, app))

app.listen(3000)
console.log('listening on port 3000')
