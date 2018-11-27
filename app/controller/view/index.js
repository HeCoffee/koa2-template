module.exports.get = async (ctx, next) => {
  await ctx.render('index/index', {
    title: 'Koa 2 Template!'
  })
}

module.exports.error = async (ctx, next) => {
  await ctx.render('error/index', {
    message: '服务器出小差',
    error: new Error(500)
  })
}
