require('dotenv').config()
import { getSocialShareHeadersMeta } from './services/helpers.js'

// les informations par défaut pour les metatags à destination des réseaux sociaux
const ogTitle = 'Popcorn : trouvez un·e développeur·e freelance à Nantes'
const ogDescription =
  'La plateforme avec (vraiment) 0% de commission pour tout le monde'
const ogUrl = process.env.POPCORN_BASE_URL
const ogImage = `${process.env.POPCORN_BASE_URL}/images/popcorn-500.jpg`

module.exports = {
  env: {
    POPCORN_BASE_URL: process.env.POPCORN_BASE_URL,
    POPCORN_SLACK_WEBHOOK: process.env.POPCORN_SLACK_WEBHOOK
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Popcorn',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: ogDescription
      },
      ...getSocialShareHeadersMeta({
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        url: ogUrl
      })
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bulma.min.css' }
    ]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vue-lazyload'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dotenv', 'nuxt-gustave'],
  gustave: {
    highlight: true,
    importers: ['importers/persons.js', 'importers/pages.js']
  }
}
