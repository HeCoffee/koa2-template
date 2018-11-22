/**
 * [ApiError 封装错误对象]
 * @extends Error
 */
class ApiError extends Error {
  constructor (message, code = -1) {
    super(message)
    this.code = isNaN(message) ? code : message
  }
}

module.exports = ApiError
