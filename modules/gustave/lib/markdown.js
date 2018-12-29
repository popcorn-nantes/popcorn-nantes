const fs = require('fs')
const yamlFront = require('yaml-front-matter')
const path = require('path')
const slug = require('slug')

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
      const data = parseMarkdownFile(
        `${inputDirectory}/${filename}`,
        markdownIt
      )
      data.$slug = slug(filename.substring(0, filename.length - 2))
      return {
        meta: {
          filename
        },
        data
      }
    })
  return {
    meta: {
      directory: inputDirectory,
      count: data.length,
      updated: new Date().toISOString()
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
  } catch (e) {
    console.log(`${filepath} : compilation of front-matter failed for file 😱`)
    throw e
  }
  try {
    entity.__html = markdownIt.render(entity.__content)
    delete entity.__content
  } catch (e) {
    console.log(`${filepath} : rendering of markdown failed for file 😱`)
    throw e
  }
  return entity
}
