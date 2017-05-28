'use strict'

var webpack = require('webpack')
var path = require('path')
var express = require('express')
var _ = require('lodash')
var config = require('../config/dev.json')
var webpackConfig = require('../webpack.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var app = express()
var bodyParser = require('body-parser')
var projectRoot = webpackConfig.context
var opn = require('opn')
var inquirer = require('inquirer')
var utils = require('../utils')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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
  new HtmlWebpackPlugin({
    filename: 'exercise.html',
    template: 'exercise.html',
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

var compiler = webpack(webpackConfig)

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
 * Serving static assets
 */
config.staticDirectories.forEach(function (dir) {
  app.use(`/${dir}`, express.static(path.join(projectRoot, dir)))
})

/**
 * Using apiRouter for serving api requests
 */
app.use('/api/v1/', require('../app/router/api.js')())

/**
 * Using fileRouter for serving static files
 */
app.use('/', require('../app/router/file.js')(compiler))

module.exports = app.listen(config.port, function (error) {
  if (error) {
    console.log(error)
    return
  }
})
