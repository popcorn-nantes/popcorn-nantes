import Vuex from 'vuex'
import persons from '../static/api/persons.json'
import { shuffle } from '../services/helpers.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      // la liste de tous les personnes existantes sur le site
      persons: [],
      // les mots clef tapés par l'utilisateur dans le moteur de recherche
      currentSearch: ''
    },
    mutations: {
      setPersons(state, persons) {
        state.persons = persons
      },
      setCurrentSearch(state, { currentSearch, router }) {
        if (currentSearch.length > 0) {
          router.replace({ path: '/', query: { search: currentSearch } })
        } else {
          router.replace({ path: '/' })
        }
        state.currentSearch = currentSearch
      }
    },
    actions: {
      // récupérer l'intégralité des personnes existantes sur le site.
      getPersons({ state, commit }) {
        // On met les personnes dans un ordre aléatoire. Pour conserver l'ordre
        // durant toute la navigation sur le site, on n'appelle le shuffle
        // seulement une fois, ensuite on retourne ce qui est stocké dans le state.
        if (state.persons.length === 0) {
          commit('setPersons', persons)
          return shuffle(persons)
        }
        return state.persons
      }
    },
    getters: {
      currentSearch: state => {
        if (state.currentSearch.length > 0) {
          return state.currentSearch
        }
        if (state.route.query && state.route.query.search) {
          return state.route.query.search
        }
        return ''
      }
    }
  })
}

export default createStore
