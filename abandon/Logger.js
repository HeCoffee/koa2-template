
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, splat } = format
const moment = require('moment')
// const path = require('path')
const fs = require('fs')

const path = 'logs/'
require('winston-daily-rotate-file')

if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}

let errorTransport = new (transports.DailyRotateFile)({
  level: 'error',
  filename: '%DATE%-error.log',
  datePattern: 'YYYY-MM-DD',
  dirname: 'logs/',
  maxSize: '20m'
})

let infoTransport = new (transports.DailyRotateFile)({
  level: 'info',
  filename: '%DATE%-info.log',
  datePattern: 'YYYY-MM-DD',
  dirname: 'logs/',
  maxSize: '20m'
})

const myFormat = printf(info => {
  info.meta = info.meta || []
  return `${moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${info.level}]: ${info.message} ${typeof info.meta === 'string' ? info.meta : info.meta.join(' ')}`
})

const levels = {
  error: 0,
  warn: 1,
  info: 2
}

const logger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    myFormat
  ),
  levels,
  transports: [
    infoTransport,
    errorTransport,
    new transports.Console()
  ]
})

module.exports = logger
