#!/usr/bin/env node

const path = require('path')
const shell = require('shelljs')
const ROOT = require('../ROOT')

shell.env['cli_args'] = require('./cli-args')

const devServer = path.join(ROOT, 'node_modules/.bin/webpack-dev-server')

console.log(JSON.stringify(require(`${ROOT}/lib/devServer.config.js`)))

shell.exec(`${devServer} --config ${ROOT}/lib/devServer.config.js`)
