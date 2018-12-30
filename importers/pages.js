const { parseMarkdownDirectory } = require('nuxt-gustave/lib/markdown')
const { saveToJsonDir } = require('nuxt-gustave/lib/helpers')

exports.importer = () => {
  const result = parseMarkdownDirectory('content/pages')
  saveToJsonDir('pages.json', result)
  return {
    routes: result.data.map(node => `/page/${node.data.$slug}`)
  }
}
