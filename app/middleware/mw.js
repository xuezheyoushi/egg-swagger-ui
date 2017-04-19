const mount = require('koa-mount')
const serve = require('koa-static')
const render = require('koa-ejs')
const pify = require('pify')
const fs = require('fs')
const path = require('path')

const readFile = pify(fs.readFile)

module.exports = (options, app) => {
  const {
    routePath: routePath = '/docs',
    apiDefFile
  } = options

  const viewPath = path.join(__dirname, '../../assets/view')
  const swaggerUIPath = path.join(__dirname, '../../assets/swagger-ui')

  const apiDefBasename = path.basename(apiDefFile)
  const apiDefPath = path.join(routePath, apiDefBasename)

  render(app, {
    root: viewPath,
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
  })

  const staticMiddleware = mount(routePath, serve(swaggerUIPath))

  const middleware = async function (ctx, next) {
    const { path, method } = ctx.request

    if (path === routePath && method === 'GET') {
      const { origin, path } = ctx.request
      const baseUrl = `${origin}${path}`
      ctx.state.baseUrl = baseUrl
      ctx.state.apiDefUrl = `${baseUrl}/${apiDefBasename}`
      await ctx.render('index')
    } else if (path === apiDefPath && method === 'GET') {
      const def = await readFile(apiDefFile, 'utf8')
      ctx.type = 'text/plain; charset=utf-8'
      ctx.body = def
    } else if (path.startsWith(routePath) && method === 'GET') {
      await staticMiddleware(ctx, next)
    } else {
      await next()
    }
  }

  return middleware
}
