const args = require('../../bin/cli-args')
const Util = require('./utils')

const config = {
  mocha: {},
  webpack: {},
  file: '',
}

let userConfig
try {
  userConfig = require(Util.resolve(args.config || 'launcher.config.js'))
} catch (e) {
  Util.logError('未找到 launcher 需要的配置文件，请使用 --config 选项指定配置文件路径，或者直接在项目根目录创建 launcher.config.js！')
  process.exit()
}

if (userConfig) {
  Object.assign(config, userConfig)
} else {
  Util.logError('配置文件为空或不可用！')
  process.exit()
}

if (typeof config.file !== 'string') {
  Util.logError('配置文件的 file 字段必须是字符串类型！')
  process.exit()
}

module.exports = config
