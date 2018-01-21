require('marko/node-require')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const markoExpress = require('marko/express')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const config = {
  mocha: {},
  webpack: {},
  files: [],
}
const args = require('../bin/cli-args')

function getAbsolutePath (file) {
  return path.join(process.cwd(), file)
}

const userConfig = args.config && require(args.config)

if (userConfig) {
  Object.assign(config, userConfig)
}

const webpackConfig = {
  entry: config.files.map(getAbsolutePath),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}

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
app.use(express.static('.'))

app.listen('9527')
console.log('Listening on port 9527 ...')
