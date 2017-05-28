'use strict'

var express = require('express')
var path = require('path')
var fs = require('fs')
var utils = require('../../utils')
var util = require('util')
var opn = require('opn')
var exerciseDetails = require('./../../config/exercise-details')
var contentPath = path.join(__dirname, '../../content')

module.exports = function() {
  var router = express.Router()

  router.get('/verify/:filename', function(req, res, next) {
    var exercise = fs.readFileSync(path.join(__dirname, '../../exercises/' + req.params.filename + '.html'), 'utf8')
    var solution = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/dom-skeleton.json'), 'utf-8'))
    exercise = exercise.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, '$1$3')
    utils.verifySolution(exercise.trim(), solution.data[req.params.filename], function (isVerified) {
      if (isVerified) {
        return res.json({
          success: true,
          data: {
            isVerified: isVerified
          }
        })
      } else {
        return res.json({
          success: true,
          data: {
            isVerified: isVerified
          }
        })
      }
    })
  })

  router.get('/preview/:filename', function(req, res, next) {
    var exercise = fs.readFileSync(path.join(__dirname, '../../exercises/' + req.params.filename + '.html'), 'utf8')
    exercise = exercise.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, '$1$3')
    return res.json({
      success: true,
      data: exercise.trim()
    })
  })

  router.get('/exercise-details/:filename', function(req, res, next) {
    fs.readFile(path.join(contentPath, req.params.filename + '.html' ), { encoding: 'utf-8' }, function (error, content) {
      if (error) {
        return res.json({
          success: false,
          data: null
        })
      }
      return res.json({
        success: true,
        data: {
          meta: exerciseDetails[req.params.filename]['meta-data'],
          content: content
        }
      })
    })
  })

  router.get('/open-dir', function(req, res, next) {
    opn(path.join(__dirname, '../../exercises'))
    return res.json({
      success: true
    })
  })
  return router
}
