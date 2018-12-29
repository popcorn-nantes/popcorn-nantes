import persons from '../static/api/persons.json'
import pages from '../static/api/pages.json'

/**
<<<<<<< Updated upstream
=======
 * Utilisé pour mettre les profils dans un ordre aléatoire sur le site
 *
>>>>>>> Stashed changes
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateRoutes() {
  const routes = [
    ...persons.map(resource => `/person/${resource.slug}`),
    ...pages.map(resource => `/page/${resource.slug}`)
  ]
  return routes
}
