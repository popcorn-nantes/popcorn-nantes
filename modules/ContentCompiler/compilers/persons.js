/**
 * Parse les fichiers markdown des répertoires du dossier *content*
 * et les transforment en un fichier JSON.
 */
const fs = require('fs')
const slug = require('slug')
const { parseMarkdownFile } = require('../lib')

const inputDirectory = 'content/persons'
const outputFile = 'static/api/persons.json'

module.exports = {
  compile
}

/**
 * Création d'un fichier persons.json depuis les fichiers content/persons/*.md
 */
function compile() {
  const files = fs.readdirSync(inputDirectory)
  const entities = []
  files.forEach(filename => {
    // ne pas inclure les fichiers qui commencent par un underscore
    if (filename.indexOf('_') != 0) {
      const entity = parseMarkdownFile(`${inputDirectory}/${filename}`)
      // le slug permettra de construire une jolie url unique par personne.
      entity.slug = slug(filename.substring(0, filename.length - 2))
      // des mots clefs qui pourront être utilisé par le moteur de recherche du site
      entity.search_keywords = [
        ...entity.domaines_metiers,
        ...entity.technologies,
        entity.titre
      ]
      entities.push(entity)
    }
  })

  fs.writeFile(outputFile, JSON.stringify(entities), err => {
    if (err) throw err
    console.log(`${outputFile} created.`)
  })
}
