'use strict'

var htmlparser = require('htmlparser2')
var deepEqual = require('deep-equal')

exports.getDOMSkeleton = function(dom) {
  var domSkeleton = [];
  var self = this;
  dom.forEach(function(currentNode) {
    const updatedNode = {
      name: currentNode.name,
      attribs: {},
      children: []
    };
    const keys = Object.keys(currentNode.attribs)
    keys.forEach(function(key) {
      updatedNode.attribs[key] = currentNode.attribs[key]
    });
    updatedNode.children = self.getDOMSkeleton(currentNode.children)
    domSkeleton.push(updatedNode)
  })
  return domSkeleton
}

exports.getRawDOM = function(exercise, callback) {
  var self = this;
  var handler = new htmlparser.DomHandler(function (err, dom) {
    if(err) {
      callback(null)
    } else {
      callback(dom)
    }
  })
  var parser = new htmlparser.Parser(handler);
  parser.write(exercise);
  parser.end();
}

exports.verifySolution = function(exercise, solution, callback) {
  var self = this;
  var handler = new htmlparser.DomHandler(function (err, dom) {
    if (err || !deepEqual(solution, self.getDOMSkeleton(dom))) {
      callback(false)
    } else {
      callback(true)
    }
  });
  var parser = new htmlparser.Parser(handler);
  parser.write(exercise)
  parser.end()
  return parser
}

module.exports = exports
