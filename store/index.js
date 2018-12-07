import Vuex from 'vuex'
import persons from '../static/api/persons.json'
import { shuffle } from '../services/helpers.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      // la liste de tous les personnes existantes sur le site
      allPersons: [],
      // les personnes actuellement affichées en fonction du shuffle et
      // et de la recherche en cours.
      personsDisplayed: [],
      personsDisplayedAreShuffled: false,
      // les mots clef tapés par l'utilisateur dans le moteur de recherche
      currentSearch: ''
    },
    mutations: {
      setAllPersons(state, allPersons) {
        state.allPersons = allPersons
      },
      setPersonsDisplayedAreShuffled(state, personsAreShuffled) {
        state.personsDisplayedAreShuffled = personsAreShuffled
      },
      setPersonsDisplayed(state, personsDisplayed) {
        state.personsDisplayed = personsDisplayed
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
        if (state.allPersons.length === 0) {
          commit('setAllPersons', persons)
          commit('setPersonsDisplayed', persons)
          return persons
        } else {
          return state.persons
        }
      },
      // mettre les personnes dans un ordre aléatoire, mais seulement une fois
      // pour éviter que l'ordre change à chaque fois que l'on revient sur la page d'accueil
      shufflePersonsDiplayed({ state, commit }) {
        if (!state.personsDisplayedAreShuffled) {
          const personsShuffled = shuffle(state.allPersons)
          commit('setPersonsDisplayed', personsShuffled)
          commit('setPersonsDisplayedAreShuffled', true)
        }
        return state.personsDisplayed
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
