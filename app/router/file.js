'use strict'

var express = require('express')
var path = require('path')
var fs = require('fs')

module.exports = function(compiler) {
  var router = express.Router()
  var outputPath = compiler ? compiler.outputPath : path.join(__dirname, '../../dist')
  var fileSystem = compiler ? compiler.outputFileSystem : fs
  /**
   * Serving 'filename'.html from in-memory file-system
   * of webpack-dev-middleware
   */
  router.get('/:filename', function (req, res, next) {
    var filename = path.join(outputPath, 'exercise.html')
    fileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err)
      }
      res.set('content-type','text/html')
      res.send(result)
      return res.end()
    })
  })

  /**
   * Serving index.html from in-memory file-system
   * of webpack-dev-middleware
   */
  router.get('/', function (req, res, next) {
    var filename = path.join(outputPath,'index.html')
    fileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err)
      }
      res.set('content-type','text/html')
      res.send(result)
      return res.end()
    })
  })
  return router
}
