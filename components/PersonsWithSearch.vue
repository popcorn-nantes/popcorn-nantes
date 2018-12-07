<template>
  <div class="section">
    <div style="padding-bottom:3em">
      <PersonsSearchForm :value="$store.getters.currentSearch" @input="onInput"/>
    </div>
    <Persons :persons="personsFiltered"/>
  </div>
</template>

<script>
import Persons from './Persons'
import PersonsSearchForm from './PersonsSearchForm'

export default {
  components: {
    Persons,
    PersonsSearchForm
  },
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      personsFiltered: [...this.persons]
    }
  },
  methods: {
    onInput(value) {
      this.$store.commit('setCurrentSearch', {
        currentSearch: value,
        router: this.$router
      })
      this.personsFiltered = this.search(value)
    },
    search(text) {
      return this.persons.filter(person => {
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
    this.personsFiltered = this.search(this.$store.getters.currentSearch)
  }
}
</script>