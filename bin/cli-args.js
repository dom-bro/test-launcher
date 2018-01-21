const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version, '-v, --version')
  .option('-c, --config [file]', '使用自定义的配置文件, 默认使用 launcher.config.js')
  .parse(process.argv)

module.exports = program
