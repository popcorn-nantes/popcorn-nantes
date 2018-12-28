# ContentCompiler

Compile les fichiers markdowns en fichier JSON en éxécutant les scripts du dossier "compilersDirectory" (à passer en option de ce module)

Compileur d'exemple :

```js
/**
 * Parse les fichiers markdown des répertoires du dossier *content*
 * et les transforment en un fichier JSON.
 */
const fs = require('fs')
const slug = require('slug')
const { parseMarkdownFile } = require('~/modules/ContentCompiler/lib')

const inputDirectory = 'content/pages'
const outputFile = 'static/api/pages.json'

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
    const entity = parseMarkdownFile(`${inputDirectory}/${filename}`)
    entity.slug = slug(filename.substring(0, filename.length - 2))
    entities.push(entity)
  })

  fs.writeFile(outputFile, JSON.stringify(entities), err => {
    if (err) throw err
    console.log(`${outputFile} created.`)
  })
}
```
