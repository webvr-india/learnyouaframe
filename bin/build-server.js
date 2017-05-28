'use strict'

var webpack = require('webpack')
var path = require('path')
var _ = require('lodash')
var config = require('../config/production.json')
var webpackConfig = require('../webpack.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var projectRoot = webpackConfig.context
var ora = require('ora')

/**
 * Development plugins to be used for hot code reloading.
 */
webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': config.env
  }),
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
]

/**
 * Entry files.
 */
webpackConfig.entry = {
  app: [path.join(projectRoot, config.entry)]
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
var spinner = ora('Building files for distribution').start()

compiler.run(function (error, stats) {
  if (error) {
    spinner.fail('Error in build process')
    throw new Error(error.toString())
    return
  }
  spinner.succeed('Build created successfully')
})
