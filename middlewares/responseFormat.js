const ApiError = require('../utils/ApiError')
const { ErrorMsg } = require('../utils/Constant')
/**
 * [responseFormat 封装response数据结构]
 * @param  {Context}   ctx
 * @param  {Function} next
 * @return {Promise}
 */
const responseFormat = async (ctx, next) => {
  try {
    await next()
    if (ctx.response.status !== 200) throw new ApiError(ErrorMsg[ctx.response.status], ctx.response.status)
    if (!ctx.response.header['content-type'].match('text/html')) {
      ctx.body = {
        code: 0,
        messages: 'success',
        data: ctx.body || {}
      }
    }
  } catch (err) {
    ctx.body = {
      code: err.code || -1,
      messages: ErrorMsg[err.code] || err.message
    }
    ctx.logger.error('err:', ctx.body, 'params:', ctx.params)
  }
}

module.exports = responseFormat
