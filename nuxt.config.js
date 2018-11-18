const pkg = require('./package')
import { generateRoutes } from './lib/helpers'

module.exports = {
  mode: 'universal',
  generate: {
    routes: generateRoutes()
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      // twitter card:
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:title',
        content: 'Popcorn : trouvez un·e développeur·e freelance à Nantes'
      },
      {
        name: 'twitter:description',
        content:
          'La plateforme avec ( vraiment ) 0% de commission pour tout le monde'
      },
      {
        name: 'twitter:image',
        content: 'https://popcorn-nantes.github.io/images/popcorn-500'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bulma.min.css' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
