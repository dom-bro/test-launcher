require('marko/node-require')
const fs = require('fs')
const path = require('path')
const markoExpress = require('marko/express')
const webpackConfig = require('./webpack.config')
const ROOT = require("../root")

// https://doc.webpack-china.org/configuration/dev-server/
webpackConfig.devServer = {
  host: '0.0.0.0',
  open: true,
  useLocalIp: true,
  port: 8080,
  contentBase: ROOT,
  before (app) {
    app.use(markoExpress())
    app.get('/', (req, res) => {
      res.marko(require('../html/index.marko'))

      Object.keys(require.cache).forEach(item => {
        if (/marko(\.js)?$/.test(item)) {
          delete require.cache[item]
          fs.unlink(/js$/.test(item) ? item : `${item}.js`, err => {
            err && console.error(err)
          })
        }
      })
    })
  },
}

module.exports = webpackConfig
