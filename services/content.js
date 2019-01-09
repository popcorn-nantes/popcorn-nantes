import axios from 'axios'

export function getPersons() {
  return axios
    .get(process.env.POPCORN_BASE_URL + '/api/persons.json')
    .then(response => {
      return response.data
    })
}

export function getPersonBySlug(slug) {
  return axios
    .get(process.env.POPCORN_BASE_URL + '/api/persons.json')
    .then(response => {
      const persons = response.data
      return persons.find(person => person.$slug === slug)
    })
}

export function getPageBySlug(slug) {
  return axios
    .get(process.env.POPCORN_BASE_URL + '/api/pages.json')
    .then(response => {
      const pages = response.data
      return pages.find(page => page.$slug === slug)
    })
}
