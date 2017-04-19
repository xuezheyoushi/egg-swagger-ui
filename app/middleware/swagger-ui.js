const mount = require('koa-mount')
const serve = require('koa-static')
const render = require('koa-ejs')
const pify = require('pify')
const fs = require('fs')
const path = require('path')

const readFile = pify(fs.readFile)

module.exports = (options, app) => {
  const {
    mountPath,
    swaggerFile
  } = options

  const viewPath = path.join(__dirname, '../../assets/view')
  const swaggerUIPath = path.join(__dirname, '../../assets/swagger-ui')

  const swaggerFileBasename = path.basename(swaggerFile)
  const swaggerFilePath = path.join(mountPath, swaggerFileBasename)

  render(app, {
    root: viewPath,
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
  })

  const staticMiddleware = mount(mountPath, serve(swaggerUIPath))

  const middleware = async function (ctx, next) {
    const { path, method } = ctx.request

    if (path === mountPath && method === 'GET') {
      const { origin, path } = ctx.request
      const baseUrl = `${origin}${path}`
      ctx.state.baseUrl = baseUrl
      ctx.state.swaggerFileUrl = `${baseUrl}/${swaggerFileBasename}`
      await ctx.render('index')
    } else if (path === swaggerFilePath && method === 'GET') {
      const def = await readFile(swaggerFile, 'utf8')
      ctx.type = 'text/plain; charset=utf-8'
      ctx.body = def
    } else if (path.startsWith(mountPath) && method === 'GET') {
      await staticMiddleware(ctx, next)
    } else {
      await next()
    }
  }

  return middleware
}
