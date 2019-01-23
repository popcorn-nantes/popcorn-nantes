<template>
  <div>
    <div style="margin-top:2rem" class="container has-text-centered">
      <h1 class="title">Trouvez un·e développeur·e freelance à Nantes</h1>
      <h2 class="subtitle">
        <em>Popcorn : La plateforme avec ( vraiment ) 0% de commission pour tout le monde</em>
      </h2>
    </div>
    <div class="container">
      <div class="section">
        <div style="padding-bottom:3em">
          <PersonsSearchForm :value="$store.state.currentSearch" @input="onInput"/>
        </div>
        <Persons :persons="persons"/>
      </div>
    </div>
  </div>
</template>

<script>
import Persons from '@/components/Persons'
import PersonsSearchForm from '@/components/PersonsSearchForm'
import { getPersons } from '@/services/content'

export default {
  scrollToTop: false,
  data() {
    return {
      persons: [...getPersons()]
    }
  },
  components: {
    Persons,
    PersonsSearchForm
  },
  methods: {
    onInput(value) {
      this.$store.commit('setCurrentSearch', value)
      this.persons = this.filterPersons(value)
    },
    filterPersons(text) {
      let persons = getPersons()
        .filter(person => {
          let match = false
          let textLowerCased = text.toLowerCase().trim()
          person.$search_keywords.forEach(keyword => {
            keyword = keyword.toLowerCase()
            person._exactMatch = false
            if (keyword.indexOf(textLowerCased) > -1) {
              match = true
              if (textLowerCased.length === keyword.length) {
                person._exactMatch = true
              }
            }
          })
          return match
        })
        .sort((a, b) => {
          return a._exactMatch ? -1 : 1
        })
      return persons
    }
  },
  created() {
    this.persons = this.filterPersons(this.$store.state.currentSearch)
  }
}
</script>

