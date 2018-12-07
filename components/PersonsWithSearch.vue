<template>
  <div class="section">
    <div style="padding-bottom:3em">
      <PersonsSearchForm :value="$store.getters.currentSearch" @input="onInput"/>
    </div>
    <Persons :persons="$store.state.personsDisplayed"/>
  </div>
</template>

<script>
import Persons from './Persons'
import PersonsSearchForm from './PersonsSearchForm'
import { shuffle } from '../services/helpers.js'

export default {
  components: {
    Persons,
    PersonsSearchForm
  },
  methods: {
    onInput(value) {
      this.$store.commit('setCurrentSearch', {
        currentSearch: value,
        router: this.$router
      })
      this.$store.commit('setPersonsDisplayed', this.filterPersons(value))
    },
    filterPersons(text) {
      return this.$store.state.allPersons.filter(person => {
        let match = false
        let textLowerCased = text.toLowerCase().trim()
        if (
          person.search_keywords
            .join(', ')
            .toLowerCase()
            .indexOf(textLowerCased) > -1
        ) {
          match = true
        }
        return match
      })
    }
  },
  mounted() {
    // Petit hack, côté client uniquement, pour mettre dans un
    // ordre aléatoire les profils au chargement de la page.
    // Sinon nous aurions toujours les profils dans l'ordre
    // où ils se trouvent dans le fichier html statique généré par nuxt-generate
    this.$store.dispatch('shufflePersonsDiplayed').then(r => {
      // Une fois que les profils sont ordonnées aléatoirement, on inspecte l'url
      // pour voir elle contient des mots clefs pour la recherche (example : "?search=fullstack").
      // Si oui, on affiche uniquement les profils qui correspondent aux mots clefs de l'url
      this.$store.commit(
        'setPersonsDisplayed',
        this.filterPersons(this.$store.getters.currentSearch)
      )
    })
  }
}
</script>