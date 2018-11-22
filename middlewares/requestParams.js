/**
 * [requestParams 封装请求参数]
 * @param  {Context}   ctx
 * @param  {Function}  next
 * @return {Promise}
 */
const requestParams = async (ctx, next) => {
  ctx.params = Object.assign({}, ctx.request.body, ctx.query)
  await next()
}

module.exports = requestParams
