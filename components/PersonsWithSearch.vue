<template>
  <div class="section">
    <div style="padding-bottom:3em">
      <PersonsSearchForm :value="$store.state.currentSearch" @input="onInput"/>
    </div>
    <Persons :persons="filteredPersons"/>
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
      filteredPersons: [...this.persons]
    }
  },
  methods: {
    onInput(value) {
      this.$store.commit('setCurrentSearch', value)
      this.filteredPersons = this.filterPersons(value)
    },
    filterPersons(text) {
      return this.persons.filter(person => {
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
  mounted() {
    this.filteredPersons = this.filterPersons(this.$store.state.currentSearch)
  }
}
</script>