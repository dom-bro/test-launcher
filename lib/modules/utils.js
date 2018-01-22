const path = require('path')
const colors = require('colors')

exports.resolve = file => path.join(process.cwd(), file)

exports.dependencies = module => path.join(__dirname, `../../node_modules/${module}`)

exports.logError = str => console.log(colors.red(str))
