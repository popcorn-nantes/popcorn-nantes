/**
 * Parse les fichiers markdown des répertoires du dossier *content*
 * et les transforment en un fichier JSON.
 */
var fs = require('fs')
var yamlFront = require('yaml-front-matter')
var md = require('markdown-it')()
var slug = require('slug')

module.exports.compile = compile

compile()

function compile() {
  renderPersonsAsJson()
  renderPagesAsJson()
}

/**
 * Création d'un fichier persons.json depuis les fichiers content/persons/*.md
 */
function renderPersonsAsJson() {
  fs.readdir('content/persons', (err, files) => {
    const json = []
    files.forEach(filename => {
      const fileContent = fs.readFileSync(`content/persons/${filename}`, 'utf8')
      const parsed = yamlFront.loadFront(fileContent)
      // le slug permettra de construire une url unique par personne
      parsed.slug = slug(filename.substring(0, filename.length - 2))
      parsed.__html = md.render(parsed.__content)
      json.push(parsed)
    })
    fs.writeFile('static/api/persons.json', JSON.stringify(json), function(
      err
    ) {
      if (err) throw err
      console.log('static/api/persons.json created.')
    })
  })
}

/**
 * Création d'un fichier pages.json depuis les fichiers content/pages/*.md
 */
function renderPagesAsJson() {
  fs.readdir('content/pages', (err, files) => {
    const json = []
    files.forEach(filename => {
      const fileContent = fs.readFileSync(`content/pages/${filename}`, 'utf8')
      let parsed = {}
      parsed.slug = slug(filename.substring(0, filename.length - 2))
      parsed.__html = md.render(fileContent)
      json.push(parsed)
    })
    fs.writeFile('static/api/pages.json', JSON.stringify(json), function(err) {
      if (err) throw err
      console.log('static/api/pages.json created.')
    })
  })
}
