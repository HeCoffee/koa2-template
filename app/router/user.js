const router = require('koa-router')()
const { prefix } = require('../../utils/Constant')
const user = require('../controller/user')

router.prefix(`${prefix}/users`)

router.get('/:userId', user.get)

router.get('/', user.list)

router.post('/', user.post)

module.exports = router
