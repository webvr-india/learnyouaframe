'use strict'

var inquirer = require('inquirer')
var createExerciseDir = require('./../utils/create-exercise-dir')
var app = require('./app')
var config = require('../config/production.json')

inquirer.prompt([{
  type: 'confirm',
  name: 'CONFIRM',
  message: 'Would you like to create exercises directory? (If this directory already contains "exercises" ' +
  'directory then press n)',
  default: 'y',
  choices: ['y', new inquirer.Separator(), 'n']
}]).then(function (answer) {
  if (answer.CONFIRM === true) {
    createExerciseDir(function (err) {
      if(!err) {
        bootstrap()
      }
    })
  } else {
    bootstrap()
  }
})

function bootstrap () {
  app.listen(config.port, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Visit http://localhost:' + config.port)
  })
}
