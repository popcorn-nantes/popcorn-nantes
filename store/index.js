import Vuex from 'vuex'
import persons from '../static/api/persons.json'
import { shuffle } from '../services/helpers.js'

export default () =>
  new Vuex.Store({
    state: {
      // liste de toutes les personnes du site
      persons: [],
      // le texte de la recherche en cours
      currentSearch: ''
    },
    mutations: {
      setPersons(state, persons) {
        state.persons = persons
      },
      setCurrentSearch(state, currentSearch) {
        state.currentSearch = currentSearch
      }
    },
    actions: {
      getPersons({ state, commit }) {
        // au premier appel de cette fonction, on range les profils dans un ordre aléatoire.
        if (state.persons.length === 0) {
          commit('setPersons', shuffle(persons))
        }
        return state.persons
      }
    }
  })
