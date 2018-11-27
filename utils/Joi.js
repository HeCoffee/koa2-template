const Joi = require('joi')
const validate = Joi.validate

Joi.validate = (value, schema, options = {
  convert: true, // 尝试安所需转换类型
  abortEarly: false, // 发现第一个错误是否停止继续检验
  stripUnknown: true, // 是否删除未定义属性
  allowUnknown: false // 是否允许包含未定义属性
}) => {
  const validateResult = validate.call(Joi, value, schema, options)
  if (validateResult && validateResult.error) {
    throw validateResult.error
  }
  // 返回处理过的参数
  return validateResult.value
}

module.exports = Joi
