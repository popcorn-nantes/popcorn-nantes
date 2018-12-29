const { runCompilers } = require('./lib/helpers')
const routes = require('../../static/api/routes.json')

module.exports = function Gustave(args) {
  if (routes) {
    this.options.generate.routes = [...this.options.generate.routes, ...routes]
  }
  this.nuxt.hook('build:compile', ({ name }) => {
    if (name == 'server') {
      runCompilers()
    }
  })
}
