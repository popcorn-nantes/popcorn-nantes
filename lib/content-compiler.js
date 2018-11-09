var fs = require('fs')
var yamlFront = require('yaml-front-matter')
var md = require('markdown-it')()

fs.readdir('content/persons', (err, files) => {
  const json = []
  files.forEach(file => {
    const fileContent = fs.readFileSync(`content/persons/${file}`, 'utf8')
    const parsed = yamlFront.loadFront(fileContent)
    parsed.__html = md.render(parsed.__content)
    json.push(parsed)
  })
  fs.writeFile('static/api/persons.json', JSON.stringify(json), function(err) {
    if (err) throw err
    console.log('static/api/persons.json created.')
  })
})
