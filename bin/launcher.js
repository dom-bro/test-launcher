#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const ROOT = require('../ROOT')

const devServer = path.join(ROOT, 'node_modules/.bin/webpack-dev-server')
// 由于需要开启子线程运行 webpack-dev-server，因此这里动态生成配置文件
const devServerConfig = require('../lib/devServer.config')
fs.writeFile(
  path.join(ROOT, 'generated.webpack-dev-server.config.js'),
  JSON.stringify(devServerConfig),
  err => {
    if (err) throw err
    else shell.exec(`${devServer} --config ${ROOT}/generated.webpack-dev-server.config.js`)
  }
)
