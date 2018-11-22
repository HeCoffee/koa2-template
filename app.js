const Koa = require('koa')
const app = new Koa()
const http = require('http')
const config = require('config')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const requestParams = require('./middlewares/requestParams')
const responseFormat = require('./middlewares/responseFormat')
const { loggerMiddleware } = require('./utils/Logger')
const fs = require('fs')
const port = config.get('port')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(`${__dirname}/public`))
app.use(views(`${__dirname}/views`, {
  extension: 'pug'
}))

// logger
app.use(loggerMiddleware)

// handle req  res
app.use(responseFormat)
app.use(requestParams)

// routes
const files = fs.readdirSync('./routes')
files.forEach(function (fileName, index) {
  let routes = require(`./routes/${fileName}`)
  app.use(routes.routes(), routes.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

let server = http.createServer(app.callback())

server.listen(port)

server.on('error', (err) => {
  console.error(err)
  process.exit(1)
})

server.on('listening', () => {
  console.log(`The ${process.env.NODE_ENV || 'development'} App listening on http://localhost:${port}`)
})

module.exports = server
