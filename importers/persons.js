const { parseMarkdownDirectory } = require('nuxt-gustave/lib/markdown')
const { saveToJsonDir } = require('nuxt-gustave/lib/helpers')

exports.importer = () => {
  const resources = parseMarkdownDirectory('content/persons')
  resources.forEach(resource => {
    // des mots clefs qui pourront être utilisé par le moteur de recherche du site
    resource.$search_keywords = [
      ...resource.domaines_metiers,
      ...resource.technologies,
      resource.titre
    ]
  })
  saveToJsonDir('persons.json', resources)
  return {
    routes: resources.map(resource => `/person/${resource.$slug_from_filename}`)
  }
}
