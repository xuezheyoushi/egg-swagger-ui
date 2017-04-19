'use strict'

const path = require('path')

const swaggerFileDefault = path.join(__dirname, '../assets/default-swagger.yaml')

module.exports = {
  swaggerUi: {
    mountPath: '/docs',
    swaggerFile: swaggerFileDefault
  }
}
