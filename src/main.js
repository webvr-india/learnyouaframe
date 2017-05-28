
/**
 * Importing scss styles as a js module
 * which is recognized by webpack
 */

import './../styles/index.scss'
import preview from './services/preview.js'
import axios from 'axios'
import events from './events'

const pathName = window.location.pathname

class App {
  init () {
    if (!/\/$/.test(pathName)) {
      axios
        .get(`/api/v1/exercise-details${pathName}`)
        .then((resp) => preview.populateExerciseDetails(resp.data.data))
        .catch(() => {
          // handle error
        })

      events.bindClick(document.getElementById('preview__button'), () => {
        axios
          .get(`/api/v1/preview${pathName}`)
          .then((resp) => preview.previewAframe(resp.data.data))
          .catch(() => {
            // handle error
          })
      })

      events.bindClick(document.getElementById('verify__button'), () => {
        axios
          .get(`/api/v1/verify${pathName}`)
          .then((resp) => {
            if (resp.data.success && resp.data.data.isVerified) {
              // Show success notification and return
            }
          })
          .catch(() => {
            // handle error
          })
      })

      events.bindClick(document.getElementById('open-dir__button'), () => {
        axios
          .get(`/api/v1/open-dir`)
          .then((resp) => {
            if (resp.data.success && resp.data.data.isVerified) {
              // do something
            }
          })
          .catch(() => {
            // handle error
          })
      })
    }
  }
}

const app = new App()
app.init()
