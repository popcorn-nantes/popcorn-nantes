/**
 * Parse les fichiers markdown des répertoires du dossier *content*
 * et les transforment en un fichier JSON.
 */
const slug = require('slug')
const { parseMarkdownDirectory } = require('../modules/gustave/lib/markdown')
const { saveToJsonDir } = require('../modules/gustave/lib/helpers')

module.exports.compile = () => {
  const result = parseMarkdownDirectory('content/persons')
  result.data.forEach(node => {
    // le slug permettra de construire une jolie url unique par personne.
    node.data.slug = node.meta.slug_from_filename
    // des mots clefs qui pourront être utilisé par le moteur de recherche du site
    node.data.search_keywords = [
      ...node.data.domaines_metiers,
      ...node.data.technologies,
      node.data.titre
    ]
  })
  saveToJsonDir('persons.json', result)
  return { routes: result.data.map(node => `/person/${node.data.slug}`) }
}
