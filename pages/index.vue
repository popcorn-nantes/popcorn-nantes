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
      return getPersons().filter(person => {
        let match = false
        let textLowerCased = text.toLowerCase().trim()
        if (
          person.$search_keywords
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
  created() {
    this.persons = this.filterPersons(this.$store.state.currentSearch)
  }
}
</script>

