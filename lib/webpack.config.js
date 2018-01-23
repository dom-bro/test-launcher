const userConfig = require('./user.config')
const Util = require('./utils')

let config = {
  entry: Util.resolve(userConfig.file),
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
}

module.exports = config
