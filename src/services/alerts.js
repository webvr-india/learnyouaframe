import Noty from 'noty'

class Alerts {
  success ({ message }) {
    return new Noty({
      type: 'success',
      theme: 'relax',
      layout: 'topRight',
      text: message,
      timeout: 6000000,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    })
  }

  warning ({ message }) {
    return new Noty({
      type: 'warning',
      layout: 'topRight',
      theme: 'relax',
      text: message,
      timeout: 3000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    })
  }

  error ({ message }) {
    return new Noty({
      type: 'warning',
      layout: 'error',
      theme: 'relax',
      text: message,
      timeout: 3000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    })
  }

  info ({ message }) {
    return new Noty({
      type: 'info',
      layout: 'topRight',
      theme: 'relax',
      text: message,
      timeout: 3000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    })
  }
}

export default new Alerts()
