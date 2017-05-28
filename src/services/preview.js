'use strict'

import config from '../config/index'

class Preview {
  constructor () {
    this.previewContainerId = config.previewContainerId || ''
    this.aframeScriptUrl = config.aframeScriptUrl || ''
    this.iframe = null
  }

  _createIframe () {
    const iframe = document.createElement('iframe')
    iframe.id = 'learnyouaframe-preview'
    iframe.style.border = 'none'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    return iframe
  }

  _createScript (url) {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    return script
  }

  _getPreviewContainer () {
    return document.getElementById(this.previewContainerId)
  }

  previewAframe (code) {
    const script = this._createScript(this.aframeScriptUrl)
    this.iframe = this._createIframe()
    this._getPreviewContainer().replaceChild(this.iframe, document.getElementById('preview__container').firstChild)
    this.iframe.contentWindow.document.open()
    this.iframe.contentWindow.document.write('<!DOCTYPE html>')
    this.iframe.contentWindow.document.write('<html>')
    this.iframe.contentWindow.document.write('<head></head>')
    this.iframe.contentWindow.document.write('</html>')
    this.iframe.contentWindow.document.head.appendChild(script)
    this.iframe.contentWindow.document.body.innerHTML = code
    this.iframe.contentWindow.document.close()
  }

  populateExerciseDetails (res) {
    const heading = res.meta.heading
    const content = res.content

    document.getElementById('sidebar__heading').innerHTML = heading
    document.getElementById('sidebar__content').innerHTML = content
  }
}

export default new Preview()
