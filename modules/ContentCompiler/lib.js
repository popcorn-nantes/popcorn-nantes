const fs = require('fs')
const yamlFront = require('yaml-front-matter')
const path = require('path')

module.exports = {
  parseMarkdownFile,
  runCompilers
}

/**
 * Exécute tous les compilateurs du dossiers "compilers".
 * Un compilateur est un script qui prend des fichiers du dossier "content"
 * pour créer des fichiers JSON qui iront dans "/static/api"
 */
function runCompilers(compilersDirectory) {
  const files = fs.readdirSync(compilersDirectory)
  files.forEach(filename => {
    require(path.resolve(`${compilersDirectory}/${filename}`)).compile()
  })
}

/**
 * Parse un fichier markdown en un object javascript contenant
 * la front matter et une propriété __html contenant le markdown rendu.
 * @param {*} filepath
 * @param {*} markdownItOptions
 */
function parseMarkdownFile(filepath, markdownItOptions = {}) {
  const fileContent = fs.readFileSync(filepath, 'utf8')
  var md = require('markdown-it')({
    html: true,
    linkify: true,
    ...markdownItOptions
  })
  let entity = {}
  try {
    entity = yamlFront.loadFront(fileContent)
    entity.__html = md.render(entity.__content)
  } catch (e) {
    console.log(fileContent)
    console.log('❌ ERREUR')
    console.log(
      `😱 Merde ! La compilation du fichier ${filepath} a lamentablement échouée !`
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
  return entity
}
