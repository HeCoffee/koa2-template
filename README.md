# Koa2 开发模板
> Koa2 开发模板，意在复用，可快速搭建一个web服务。

### 目录结构
``` bash
.
├── app           # 服务相关业务代码 MVC设计模式
├── bin           # 部署相关文件
├── config        # 环境配置
├── public        # 静态资源，如js,css,image等
├── test          # 单元测试
├── utils         # 工具类函数
├── app.js        # 入口文件
└── package.json
```

### npm script

``` bash
npm run dev   # 开发环境

npm start     # 正式环境

npm run test  # 运行单元测试

npm run lint  # 代码风格检测

npm run fix   # 修复有误代码风格
```

### app.js
注册koa2应用，引入相关中间件，路由，启动http服务

### app
app文件夹主要用来放置业务相关的代码，采用MVC设计模式目录如下
``` bash
app
 ├── controller  # 控制层
 ├── middleware  # app中间件
 ├── model       # 模型层 数据库相关模型
 ├── router      # 路由
 ├── service     # 服务层
 └── view        # 视图层
```

### controller

controller 主要负责校验，转发（重定向），或者渲染模板

``` js
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

module.exports.get = async (ctx, next) => {
  // 渲染 view/index/index.pug
  await ctx.render('index/index', {
    title: 'Koa 2 Template!'
  })
}
```
**[joi](https://github.com/hapijs/joi)提供了强大的校验参数功能**

### middleware
根据业务编写中间件，例如：封装上下文，校验token，封装response，输出请求日志

### model
数据库模型，用的比较多是 [MySQL](https://www.mysql.com/) 和 [MongoDB](https://www.mongodb.com/), npm上有相关包提供，功能完善且稳定。

**MySQL** 推荐 [sequelize](https://github.com/sequelize/sequelize#readme)

**MongoDB** 推荐 [mongoose](https://www.npmjs.com/package/mongoose)

### router
[koa-router](https://www.npmjs.com/package/koa-router) 配置http请求的路由
``` js
// router/user.js
// 路由前缀
router.prefix(`${prefix}/users`)
// 相关路由对应相关 controller
router.get('/:userId', user.get)
router.get('/', user.list)
router.post('/', user.post)

// app.js 引入路由
const routers = fs.readdirSync('./app/router')
routers.forEach(function (fileName, index) {
  let router = require(`./app/router/${fileName}`)
  app.use(router.routes(), router.allowedMethods())
})
```

### service
实现主要业务，以及与数据库交互

### view
视图层主要放置html相关模板

[koa-views](https://github.com/queckezz/koa-views) 引用[Consolidate](https://github.com/tj/consolidate.js)支持多种模板引擎

这里使用[pug（原称jade）](https://github.com/pugjs/pug) | [中文文档](https://pug.bootcss.com/api/getting-started.html)

``` js
// app.js
const views = require('koa-views')
app.use(views(`${__dirname}/app/view`, {
  extension: 'pug'
}))
```
也可以根据实际情况改用其他模板不过需要安装相关渲染引擎包


### ApiError
封装一个错误类，中间件可区别开业务错误以及系统错误，做出不同输出。
``` js
// ApiError.js
class ApiError extends Error {
  constructor (message, code = -1) {
    super(message)
    this.code = isNaN(message) ? code : message
  }
}

module.exports = ApiError

// app/middleware/responseFormat.js:22
// 业务级别错误 info 系统级别错误 error
const errType = err instanceof ApiError ? 'info' : 'error'
```


### 日志输出
使用 [tracer](https://www.npmjs.com/package/tracer) 进行日志输出
根据环境进行不同输出，本地环境在控制面板输出，生产环境会写入以日期命名的log文件，方便出现bug时可查阅日志。

具体实现，查看 /utils/Logger.js

log中间件，输出请求参数以及请求结果，以便追踪请求

``` js
// app/middleware/log.js
const logger = require('../../utils/Logger')

const log = async (ctx, next) => {
  ctx.logger = ctx.logger || logger
  ctx.logger.info('receive', ctx.url, ctx.params)
  await next()
  ctx.logger.info('response', ctx.body)
}

module.exports = log
```

经过中间件封装后，可直接从上下文(ctx)调用logger

相关service集成 base类后 可直接调用this.logger

### 封装请求结果 中间件
封装请求结果有两个目的
1.统一请求结果数据结构
2.捕捉错误，统一封装错误信息数据结构

系统运行难免会遇到各种错误，业务级别或者系统级别的，这些错误 若不统一数据结构，前端不好操作。为此，捕捉错误封装结果并且根据级别输出日志。

详细代码可看 app/middleware/responseFormat.js

### 参数校验 joi
用法简单，功能强大。不需要编写多个if去判断请求参数。

详细文档 [joi](https://github.com/hapijs/joi)

将校验函数（validate）再封装一层，使得校验失败时，抛出业务错误，以便中间件捕获，放回结果到前端。

``` js
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
```


### 常量
1.utils/Constant.js

2.[config](https://github.com/lorenwest/node-config)

#### 两者区别

Constant是业务常量，放置与业务相关的常量量。例如：错误信息，请求前缀，常用列表等。

config是环境常量，放置不同环境下同名的常量。例如：数据库连接，应用环境，各种id/secret/key等。可参考config文件夹


### 常用的库
- 日期处理函数 [moment](http://momentjs.cn/)
- 微信公众号相关 [co-wechat-api](https://github.com/node-webot/co-wechat-api)
- 微信网页授权 [co-wechat-oauth](https://github.com/node-webot/co-wechat-oauth)
- redis客户端 [ioredis](https://github.com/luin/ioredis#readme)


### 不常用的库
- 定时任务 [node-schedule](https://github.com/node-schedule/node-schedule#readme)
- JobScheduler（任务队列） [Agenda](https://github.com/agenda/agenda#readme)


### 代码风格
- [eslint](https://github.com/eslint/eslint) | [中文文档](https://cn.eslint.org/)
- [standard](https://github.com/feross/standard) | [中文文档](https://standardjs.com/readme-zhcn.html)


### Koa2 相关
- [Koa2](https://github.com/koajs/koa)
- [洋葱模型](https://segmentfault.com/a/1190000013981513)
- [浅谈express、koa和koa2](https://www.jianshu.com/p/3806417a1991?from=timeline)

----
> 积累项目经验，持续完善ing.....
