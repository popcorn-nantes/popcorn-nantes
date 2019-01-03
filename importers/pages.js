const { parseMarkdownDirectory } = require('nuxt-gustave/lib/markdown')
const { saveToJsonDirectory } = require('nuxt-gustave/lib/helpers')

exports.importer = () => {
  const resources = parseMarkdownDirectory('content/pages')
  saveToJsonDirectory('pages.json', resources)
  return resources.map(resource => `/page/${resource.$slug}`)
}
