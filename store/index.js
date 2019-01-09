import Vuex from 'vuex'
import { getPersons } from '../services/content'
import { shuffle } from '../services/helpers.js'

export default () =>
  new Vuex.Store({
    state: {
      // liste de toutes les personnes du site
      shuffledPersons: [],
      // le texte de la recherche en cours
      currentSearch: ''
    },
    mutations: {
      setShuffledPersons(state, shuffledPersons) {
        state.shuffledPersons = shuffledPersons
      },
      setCurrentSearch(state, currentSearch) {
        state.currentSearch = currentSearch
      }
    },
    actions: {
      async getShuffledPersons({ state, commit }) {
        // au premier appel de cette fonction, on range les profils dans un ordre aléatoire.
        if (state.shuffledPersons.length === 0) {
          const persons = await getPersons()
          commit('setShuffledPersons', shuffle(persons))
        }
        return state.shuffledPersons
      }
    }
  })
