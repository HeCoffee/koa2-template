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
npm run dev  # 开发环境

npm start    # 正式环境

npm run test # 运行单元测试

npm run lint # 代码风格检测

npm run fix  # 修复有误代码风格
```

### app.js
注册koa2应用，引入相关中间件，路由，启动http服务

### app
app文件夹主要用来放置业务相关的代码，采用MVC设计模式目录如下
``` bash
app
 ├── controller # 控制层
 ├── middleware # app中间件
 ├── model      # 模型层 数据库相关模型
 ├── router      # 路由
 ├── service    # 服务层
 └── view       # 视图层
```

#### controller 控制层

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
** [joi](https://github.com/hapijs/joi)提供了强大的校验参数功能 **

#### middleware
根据业务编写中间件，例如：封装上下文，校验token，封装response，输出请求日志

#### model
数据库模型，用的比较多是 [MySQL](https://www.mysql.com/) 和 [MongoDB](https://www.mongodb.com/), npm上有相关包提供，功能完善且稳定。

MySQL 推荐 [sequelize](https://github.com/sequelize/sequelize#readme)

MongoDB 推荐 [mongoose](https://www.npmjs.com/package/mongoose)

#### router
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

#### service
实现主要业务，以及与数据库交互

#### view
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

### 代码风格
- [eslint](https://github.com/eslint/eslint) | [中文](https://cn.eslint.org/)
- [standard](https://github.com/feross/standard) | [中文](https://standardjs.com/readme-zhcn.html)

### 日志输出

### 技术栈
- mocha
- joi
- eslint
- tracer
- moment

### Koa2 相关
- [Koa2 中文官网](https://koa.bootcss.com)
- [洋葱模型](https://segmentfault.com/a/1190000013981513)
- [浅谈express、koa和koa2](https://www.jianshu.com/p/3806417a1991?from=timeline)
