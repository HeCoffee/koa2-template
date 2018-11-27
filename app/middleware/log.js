const logger = require('../../utils/Logger')

const log = async (ctx, next) => {
  ctx.logger = ctx.logger || logger
  ctx.logger.info('receive', ctx.url, ctx.params)
  await next()
  ctx.logger.info('response', ctx.body)
}

module.exports = log
