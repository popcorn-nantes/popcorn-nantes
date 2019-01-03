const { parseMarkdownDirectory } = require('nuxt-gustave/lib/markdown')
const { saveToJsonDirectory } = require('nuxt-gustave/lib/helpers')

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
  saveToJsonDirectory('persons.json', resources)
  return resources.map(resource => `/person/${resource.$slug}`)
}
