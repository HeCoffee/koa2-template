const Base = require('../base')

class Detail extends Base {
  get ({ userId }) {
    //  模拟数据
    const users = [
      {
        userId: 'asd',
        name: 'a'
      }
    ]
    let user = users.find(item => item.userId === userId)
    if (!user) this.throwError('无此用户')
    return user
  }
}

module.exports = new Detail()
