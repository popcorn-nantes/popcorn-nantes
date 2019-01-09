import Vuex from 'vuex'

export default () =>
  new Vuex.Store({
    state: {
      // le texte de la recherche en cours
      currentSearch: ''
    },
    mutations: {
      setCurrentSearch(state, currentSearch) {
        state.currentSearch = currentSearch
      }
    }
  })
