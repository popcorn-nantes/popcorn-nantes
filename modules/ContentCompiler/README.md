# ContentCompiler

Compile les fichiers markdowns en fichier JSON en éxécutant les scripts du dossier "compilersDirectory" (à passer en option de ce module)

Un "compiler" est simplement un fichier node.js qui exporte une méthode `compile`, de manière à pouvoir être appelée par la méthode `runCompilers()`.

Exemple d'un compiler qui transforme tous les fichiers markdown d'un dossier `content/pages` en un unique fichier `static/api/pages.json`

```js
/**
 * Parse les fichiers markdown des répertoires du dossier *content*
 * et les transforment en un fichier JSON.
 */
const fs = require('fs')
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
  // transformer les fichiers markdown en un objet javascript
  files.forEach(filename => {
    const entity = parseMarkdownFile(`${inputDirectory}/${filename}`)
    entities.push(entity)
  })
  // enregistrer ce tableaux d'objet sous format JSON:
  fs.writeFile(outputFile, JSON.stringify(entities), err => {
    if (err) throw err
    console.log(`${outputFile} created.`)
  })
}
```
