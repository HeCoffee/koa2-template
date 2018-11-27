/**
 * [requestParams 将所有请求参数(query、body)封装成params]
 * @param  {Context}   ctx
 * @param  {Function}  next
 * @return {Promise}
 */
const requestParams = async (ctx, next) => {
  ctx.params = Object.assign({}, ctx.request.body, ctx.query)
  await next()
}

module.exports = requestParams
