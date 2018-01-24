require('marko/node-require')
const fs = require('fs')
const markoExpress = require('marko/express')
const ROOT = require('../root')
const Util = require('./utils')

module.exports = userConfig => {
  let config = {
    output: {
      filename: 'bundle.spec.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: Util.dependencies('babel-loader'),
            options: {
              presets: [Util.dependencies('@babel/preset-env')],
            },
          },
        },
      ],
    },
    // https://doc.webpack-china.org/configuration/dev-server/
    devServer: {
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
    },
  }

  Util.extend(true, config, userConfig)

  return config
}
