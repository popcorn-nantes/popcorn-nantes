/**
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

export function getSocialShareHeadersMeta({ title, description, image, url }) {
  return [
    // open graph
    { hid: 'og:site_name', name: 'og:site_name', content: 'Popcorn' },
    {
      hid: 'og:url',
      property: 'og:url',
      content: url
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: process.env.POPCORN_BASE_URL
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: image
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description
    },
    // twitter card:
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: image
    }
  ]
}
