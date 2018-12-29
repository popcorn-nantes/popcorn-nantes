/**
 * Parse les fichiers markdown des répertoires du dossier *content*
 * et les transforment en un fichier JSON.
 */
const { parseMarkdownDirectory } = require('../modules/gustave/lib/markdown')
const { saveToJsonDir } = require('../modules/gustave/lib/helpers')

module.exports.compile = () => {
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
