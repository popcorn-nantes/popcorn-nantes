import Vuex from 'vuex'
import persons from '../static/api/persons.json'
import { shuffle } from '../services/helpers.js'

export default () =>
  new Vuex.Store({
    state: {
      persons: [],
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
        if (state.persons.length === 0) {
          commit('setPersons', shuffle(persons))
        }
        return state.persons
      }
    }
  })
