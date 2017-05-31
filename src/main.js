
/**
 * Importing scss styles as a js module
 * which is recognized by webpack
 */

import './../styles/index.scss'
import 'noty/src/noty.scss'
import axios from 'axios'
import preview from './services/preview.js'
import alerts from './services/alerts'
import events from './events'

const pathName = window.location.pathname

class App {
  init () {
    if (!/\/$/.test(pathName)) {
      axios
        .get(`/api/v1/exercise-details${pathName}`)
        .then((resp) => preview.populateExerciseDetails(resp.data.data))
        .catch(() => {
          alerts.error({ message: 'Internal server error' }).show()
        })

      events.bindClick(document.getElementById('preview__button'), () => {
        axios
          .get(`/api/v1/preview${pathName}`)
          .then((resp) => {
            alerts.success({ message: 'Preview alert' }).show()
            preview.previewAframe(resp.data.data)
          })
          .catch(() => {
            alerts.error({ message: 'Internal server error' }).show()
          })
      })

      events.bindClick(document.getElementById('verify__button'), () => {
        axios
          .get(`/api/v1/verify${pathName}`)
          .then((resp) => {
            if (resp.data.success && resp.data.data.isVerified) {
              alerts.success({ message: 'Verification Successful' }).show()
              return
            }
            alerts.info({ message: 'Uh oh... Please try again!' }).show()
          })
          .catch(() => {
            alerts.error({ message: 'Internal server error' }).show()
          })
      })

      events.bindClick(document.getElementById('open-dir__button'), () => {
        axios
          .get(`/api/v1/open-dir`)
          .then((resp) => {})
          .catch(() => {
            alerts.error({ message: 'Internal server error' }).show()
          })
      })
    }
  }
}

const app = new App()
app.init()
