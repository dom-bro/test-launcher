const launcher = require('./lib/main')

module.exports = launcher({
  entry: './test/add.js',
  devServer: {
    port: 9527
  }
})
