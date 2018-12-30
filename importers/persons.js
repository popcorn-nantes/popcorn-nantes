const { parseMarkdownDirectory } = require('nuxt-gustave/lib/markdown')
const { saveToJsonDir } = require('nuxt-gustave/lib/helpers')

exports.importer = () => {
  const result = parseMarkdownDirectory('content/persons')
  result.data.forEach(node => {
    // des mots clefs qui pourront être utilisé par le moteur de recherche du site
    node.data.$search_keywords = [
      ...node.data.domaines_metiers,
      ...node.data.technologies,
      node.data.titre
    ]
  })
  saveToJsonDir('persons.json', result)
  return {
    routes: result.data.map(node => `/person/${node.data.$slug}`)
  }
}
