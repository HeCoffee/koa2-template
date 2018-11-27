const ApiError = require('../../utils/ApiError')
const logger = require('../../utils/Logger')

class Base {
  throwError (msg, code) {
    throw new ApiError(msg, code)
  }

  get logger () {
    return logger
  }
}

module.exports = Base
