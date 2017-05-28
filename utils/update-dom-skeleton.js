'use strict'

var fs = require('fs')
var path = require('path')
var solutionsDirPath = path.join(__dirname, '../solutions')
var configDirPath = path.join(__dirname, '../config')
var util = require('util')
var utils = require('../utils')

/**
 * To be run after a new exercise is added to
 * update solution dom skeleton
 */

module.exports = function () {
  var solutionFiles = fs.readdirSync(solutionsDirPath)
  var result = {}
  Object.keys(solutionFiles).forEach(function (key) {
    var file = solutionFiles[key]
    var content = fs.readFileSync(path.join(solutionsDirPath, file), 'utf-8')
    content = content.replace(/(< (pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, '$1$3')
    utils.getRawDOM(content.trim(), function (dom) {
      file = file.replace(/\.[^/.]+$/, '')
      result[file] = utils.getDOMSkeleton(dom)
    })
  })
  var domSkeleton = {
    'data': result
  }
  fs.writeFileSync(path.join(configDirPath, 'dom-skeleton.json'), JSON.stringify(domSkeleton))
  console.log('Dom skeleton created successfully')
}
