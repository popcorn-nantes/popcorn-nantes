const fs = require('fs')
const yamlFront = require('yaml-front-matter')
const path = require('path')

module.exports = {
  parseMarkdownDirectory,
  parseMarkdownFile
}

function parseMarkdownDirectory(inputDirectory, markdownItOptions = {}) {
  const files = fs.readdirSync(inputDirectory)
  var markdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    ...markdownItOptions
  })
  const data = files
    .filter(file => path.extname(file) === '.md')
    .map(filename => {
      return {
        meta: {
          filename
        },
        data: parseMarkdownFile(`${inputDirectory}/${filename}`, markdownIt)
      }
    })
  return {
    meta: {
      count: data.length
    },
    data
  }
}

/**
 * Parse un fichier markdown en un object javascript contenant
 * la front matter et une propriété __html contenant le markdown rendu.
 * @param {*} filepath
 * @param {*} markdownItOptions
 */
function parseMarkdownFile(filepath, markdownIt) {
  const fileContent = fs.readFileSync(filepath, 'utf8')
  let entity = {}
  try {
    entity = yamlFront.loadFront(fileContent)
    entity.__html = markdownIt.render(entity.__content)
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
    process.exit()
  }
  return entity
}
