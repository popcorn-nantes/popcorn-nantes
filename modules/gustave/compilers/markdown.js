const slug = require('slug')
const { parseMarkdownDirectory } = require('../lib/markdown')
const { saveToJsonDir } = require('../lib/helpers')

module.exports.compile = ({ directory, outputFile, generateRoutes }) => {
  const result = parseMarkdownDirectory(directory)
  saveToJsonDir(outputFile, result)
  return { routes: generateRoutes(result) }
}
