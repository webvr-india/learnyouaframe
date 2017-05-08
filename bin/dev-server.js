'use strict'

const webpack = require('webpack')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const config = require('../config/dev.json')
const webpackConfig = require('../webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const app = express()
const projectRoot = webpackConfig.context

webpackConfig.devtool = '#cheap-module-eval-source-map'

/**
 * Development plugins to be used for hot code reloading.
 */
webpackConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }),
  new FriendlyErrorsPlugin()
]

/**
 * Entry files.
 */
webpackConfig.entry = {
  app: ['webpack-hot-middleware/client', path.join(projectRoot, config.entry)]
}

/**
 * The output directory and file name/path for the
 * final build
 */
webpackConfig.output = {
  path: path.join(projectRoot, config.publicPath),
  publicPath: config.publicPath,
  filename: config.output
}

const compiler = webpack(webpackConfig)

/**
 * Using the dev middleware
 */
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

/**
 * Using the hot code reloading middleware
 */
app.use(require('webpack-hot-middleware')(compiler))

/**
 * Serving index.html file from in-memory file-system
 * of webpack-dev-middleware.
 */
app.get('/', function (req, res, next) {
  var filename = path.join(compiler.outputPath,'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

module.exports = app.listen(config.port, function (error) {
  if (error) {
    console.log(error)
    return
  }
})
