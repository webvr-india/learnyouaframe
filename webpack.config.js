'use strict'

const path = require('path')
const projectRoot = path.join(__dirname, './')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = {}

config.context = projectRoot

config.module = {}

config.module.rules = [{
  test: /\.(js)$/,
  loader: 'eslint-loader',
  include: projectRoot,
  exclude: /node_modules/,
  enforce: 'pre',
  options: {
    formatter: require('eslint-friendly-formatter')
  }
},
{
  test: /\.js$/,
  include: projectRoot,
  exclude: /node_modules/,
  loader: 'babel-loader'
},
{
  test: /\.scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader'
    }, {
      loader: 'sass-loader',
      options: {
        includePaths: [path.join(projectRoot, 'styles')]
      }
    }
  ]
},
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000
  }
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000
  }
}]

config.resolve = {
  extensions: ['.js']
}

module.exports = config
