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
      // ne pas inclure les fichiers qui commencent par un underscore
      if (filename.indexOf('_') != 0) {
        const fileContent = fs.readFileSync(
          `content/persons/${filename}`,
          'utf8'
        )
        const parsed = parseFileContent(filename, fileContent)

        // le slug permettra de construire une jolie url unique par personne.
        parsed.slug = slug(filename.substring(0, filename.length - 2))

        // créer le rendu html à partir du markdown du fichier
        parsed.__html = md.render(parsed.__content)

        // des mots clefs qui pourront être utilisé par le moteur de recherche du site
        parsed.search_keywords =
          parsed.domaines.join(' ') + ' ' + parsed.technologies.join(' ')

        json.push(parsed)
      }
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
      // ne pas inclure les fichiers qui commencent par un underscore
      if (filename.indexOf('_') != 0) {
        const fileContent = fs.readFileSync(`content/pages/${filename}`, 'utf8')
        let parsed = {}
        parsed.slug = slug(filename.substring(0, filename.length - 2))
        parsed.__html = md.render(fileContent)
        json.push(parsed)
      }
    })
    fs.writeFile('static/api/pages.json', JSON.stringify(json), function(err) {
      if (err) throw err
      console.log('static/api/pages.json created.')
    })
  })
}

function parseFileContent(filename, fileContent) {
  let parsed = {}
  try {
    parsed = yamlFront.loadFront(fileContent)
  } catch (e) {
    console.log(fileContent)
    console.log('❌ ERREUR')
    console.log(
      `😱 Merde ! La compilation du fichier "${filename}" a lamentablement échouée !`
    )
    console.log(
      '🧐  Regarde attentivement dans le fichier ci-dessus si tu vois pas une erreur de syntaxe ⬆️'
    )
    console.log(
      "💡 Voici le message remonté par le parseur de yaml-front-matter (sic). Attention, l'erreur se trouve peut être juste au-dessus de la ligne indiquée : "
    )
    console.log('===')
    console.log(e.message)
    console.log('===')
    // C'est foutu ! ABANDON ! ABANDON !
    process.exit()
  }
  return parsed
}
