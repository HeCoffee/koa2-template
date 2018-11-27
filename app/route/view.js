const router = require('koa-router')()
const view = require('../controller/view')

router.get('/', view.get)
router.get('/error', view.error)

module.exports = router
