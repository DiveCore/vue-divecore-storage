/**
 * webpack 配置文件
 */

const path = require('path')
// 构建时清除 dist 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 构建无压缩的文件
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-storage.min.js',
    library: 'VueStorage',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    // Workaround to fix umd build, restore webpack v3 behaviour
    // https://github.com/webpack/webpack/issues/6642
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new UnminifiedWebpackPlugin()]
}
