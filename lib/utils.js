const path = require('path')
const colors = require('colors')
const ROOT = require('../ROOT')

exports.resolve = file => path.join(process.cwd(), file)

exports.dependencies = module => path.join(ROOT, `node_modules/${module}`)

exports.logError = str => console.log(colors.red(str))
