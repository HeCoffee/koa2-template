const router = require('koa-router')()
const ApiError = require('../utils/ApiError')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  throw new ApiError(500)
})

router.post('/bar/:id', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
