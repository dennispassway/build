/*
  This loader turns a request for a template into something that returns an object containing
  both the template and the renderer.
*/

const loaderUtils = require('loader-utils')
const { relative } = require('path')

module.exports = TemplateLoader

function TemplateLoader(source, map) {
}

TemplateLoader.pitch = function TemplateLoaderPitch(remainingRequest, precedingRequest, data) {
  const { renderer: rendererPath } = loaderUtils.getOptions(this)
  return `|export { default as template } from '-!${precedingRequest}!${remainingRequest}?template-source'
          |export { default as renderer } from '${rendererPath}'
          |`.split(/^[ \t]*\|/m).join('')
}
