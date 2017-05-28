'use strict'

var fs = require('fs')
var path = require('path')
var exerciseDetails = require('../config/exercise-details')
var dirPath = path.join(process.cwd(), 'exercises')
var ora = require('ora')
var spinner = ora()

module.exports = function (callback) {
  fs.mkdir(dirPath, function(err) {
    /**
     * Return only if there is an error other
     * than 'file(directory in this case) already exists',
     * otherwise continue
     */

    if(err && !(err.code = 'EEXIST')) {
      spinner.fail('Error in creating exercises directory')
      callback(err)
      return
    }

    var fileKeys = Object.keys(exerciseDetails)
    var index = -1

    function createFile () {
      index++;
      /**
       * Base condition for recursion
       */

      if(index >= fileKeys.length) {
        spinner.succeed('Successfully created exercises directory')
        callback(null)
        return
      }
      /**
       * Check if file exists
       */
      var filePath = path.join(dirPath, fileKeys[index] + '.html')
      fs.stat(filePath, function (err, stat) {
        if(err === null) {
          /**
           * Return recursive call to function when file exists
           * as it won't be re-written
           */

          return createFile()
        } else if (err.code === 'ENOENT') {
          /**
           * Write file to disk when it doesn't exist
           */

          fs.writeFile(filePath, '', function (err) {
            if(err) {
              throw new Error('Error in writing files')
              return
            }
            createFile()
          })
        } else {
          spinner.fail('Error in creating file: ', filePath)
          createFile()
        }
      })
    }
    /**
     * Initiate call to Recursive method
     */
    spinner.start('Creating exercises dir')
    createFile()
  })
}
