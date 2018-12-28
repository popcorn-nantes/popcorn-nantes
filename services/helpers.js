import persons from '../static/api/persons.json'
import pages from '../static/api/pages.json'

/**
 * Utilisé par nuxt-generate : on doit indiquer manuellement les routes à générer
 * pour les routes dynamiques.
 */
export function generateRoutes() {
  const routes = [
    ...persons.map(entity => `/person/${entity.slug}`),
    ...pages.map(entity => `/page/${entity.slug}`)
  ]
  return routes
}

/**
 * Utilisé pour mettre les profils dans un ordre aléatoire sur le site
 *
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(array) {
  const a = [...array]
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
