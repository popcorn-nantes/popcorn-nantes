var fs = require('fs')
var yamlFront = require('yaml-front-matter')
var md = require('markdown-it')()
var slug = require('slug')

fs.readdir('content/persons', (err, files) => {
  const json = []
  files.forEach(filename => {
    const fileContent = fs.readFileSync(`content/persons/${filename}`, 'utf8')
    const parsed = yamlFront.loadFront(fileContent)
    // le slug permettra de construire une url unique par profil
    parsed.slug = slug(filename.substring(0, filename.length - 2))
    parsed.__html = md.render(parsed.__content)
    json.push(parsed)
  })
  fs.writeFile('static/api/persons.json', JSON.stringify(json), function(err) {
    if (err) throw err
    console.log('static/api/persons.json created.')
  })
})
