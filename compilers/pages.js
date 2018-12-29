const slug = require('slug')
const { parseMarkdownDirectory } = require('../modules/gustave/lib/markdown')
const { saveToJsonDir } = require('../modules/gustave/lib/helpers')

module.exports.compile = () => {
  const result = parseMarkdownDirectory('content/pages')
  result.data.forEach(node => {
    node.data.slug = slug(
      node.meta.filename.substring(0, node.meta.filename.length - 2)
    )
  })
  saveToJsonDir('pages.json', result)
  return { routes: result.data.map(node => `/page/${node.data.slug}`) }
}
