require('marko/node-require')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const markoExpress = require('marko/express')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackConfig = require('./modules/getWebpackConfig')

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

app.use(middleware(webpack(webpackConfig)))
app.use(express.static(path.join(__dirname, '..')))

app.listen('9527')
console.log('Listening on port 9527 ...')
