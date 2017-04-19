'use strict'

const Koa = require('koa')
const swaggerUi = require('../app/middleware/swagger-ui')
const path = require('path')

const app = new Koa()

app.use(swaggerUi({
  mountPath: '/docs-test',
  swaggerFile: path.join(__dirname, 'swagger.yaml')
}, app))

const port = 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
