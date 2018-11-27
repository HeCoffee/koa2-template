const Joi = require('../../../utils/Joi')
const ApiError = require('../../../utils/ApiError')
const detail = require('../../service/user/detail')

module.exports.get = function (ctx, next) {
  // 检验参数
  const schema = {
    userId: Joi.string().required().error(new ApiError('必须用户Id'))
  }
  const options = Joi.validate(ctx.params, schema)
  // 调用服务
  const result = detail.get(options)
  // 返回结果
  ctx.body = result
}

module.exports.list = function (ctx, next) {
  ctx.body = 'this is a user list'
}

module.exports.post = function (ctx, next) {
  ctx.body = 'this is a post response'
}
