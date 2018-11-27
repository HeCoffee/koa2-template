const ApiError = require('../../utils/ApiError')
const { ErrorMsg } = require('../../utils/Constant')
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
        message: 'success',
        data: ctx.body
      }
    }
  } catch (err) {
    // 业务级别错误 info 系统级别错误 error
    const errType = err instanceof ApiError ? 'info' : 'error'
    ctx.body = {
      code: err.code || -1,
      message: errType === 'info' ? (ErrorMsg[err.code] || err.message) : '服务器出小差'
    }
    ctx.logger[errType]('err:', err)
  }
}

module.exports = responseFormat
