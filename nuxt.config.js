const pkg = require('./package')

const popcornBaseUrl = 'https://popcorn-nantes.github.io'

// les informations par défaut pour les metatags à destination des réseaux sociaux
const ogTitle = 'Popcorn : trouvez un·e développeur·e freelance à Nantes'
const ogDescription =
  'La plateforme avec (vraiment) 0% de commission pour tout le monde'
const ogImage = `${popcornBaseUrl}/images/popcorn-500.jpg`

module.exports = {
  env: {
    popcornBaseUrl: popcornBaseUrl,
    popcornContactSlackWebhook:
      'https://hooks.slack.com/services/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'
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Trouvez un développeur freelance à Nantes, avec (vraiment) 0% de commission pour tout le monde'
      },
      // open graph
      { hid: 'og:site_name', name: 'og:site_name', content: 'Popcorn' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: ogTitle
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: popcornBaseUrl
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ogImage
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: ogDescription
      },
      // twitter card:
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: ogTitle
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: ogDescription
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: ogImage
      }
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
  modules: ['nuxt-gustave'],
  gustave: {
    highlight: true,
    importers: ['importers/persons.js', 'importers/pages.js']
  }
}
