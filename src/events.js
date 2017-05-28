
class Events {
  bindClick (elm, callback, useCapture = false) {
    elm.addEventListener('click', callback, useCapture)
  }
}

export default new Events()
