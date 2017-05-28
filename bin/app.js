'use strict'

var path = require('path')
var express = require('express')
var _ = require('lodash')
var config = require('../config/production.json')
var webpackCon
var app = express()
var bodyParser = require('body-parser')
var inquirer = require('inquirer')
var projectRoot = path.join(__dirname, '../')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * Serving static assets
 */
config.staticDirectories.forEach(function (dir) {
  console.log(path.join(projectRoot, dir))
  app.use(`/${dir}`, express.static(path.join(projectRoot, dir)))
})

/**
 * Using apiRouter for serving api requests
 */
app.use('/api/v1/', require('../app/router/api.js')())

/**
 * Using fileRouter for serving static files
 */
app.use('/', require('../app/router/file.js')())

module.exports = app
