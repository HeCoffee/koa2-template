const tracer = require('tracer')
const config = require('config')
const isProd = config.get('isProd')

/**
 * [logger 输出日志]
 */
const colorLogger = tracer.colorConsole({
  level: 'info', // 输出 info 及其以上等级
  dateformat: 'yyyy-mm-dd HH:MM:ss.L',
  inspectOpt: {
    showHidden: false, // 是否展示非枚举属性
    depth: 3 // 对象属性最多显示3层，超过3层显示 [Object]
  }
})

const dailyLogger = tracer.dailyfile({
  root: './logs',
  maxLogFiles: 10,
  allLogsFileName: `app-log`,
  level: 'info',
  dateformat: 'yyyy-mm-dd HH:MM:ss.L',
  inspectOpt: {
    showHidden: false,
    depth: 3
  },
  transport: function (data) {
    console.log(data.output)
  }
})

module.exports = isProd ? dailyLogger : colorLogger
