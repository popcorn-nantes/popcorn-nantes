<template>
  <div class="section">
    <div style="padding-bottom:3em">
      <PersonsSearchForm :value="value" @input="onInput" />
    </div>
    <Persons :persons="results" />
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
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: '',
      // ordonner de manière aléatoire les personnes
      results: shuffle([...this.persons])
    }
  },
  methods: {
    onInput(value) {
      this.value = value
      this.results = this.search(value)
    },
    search(text) {
      return this.persons.filter(person => {
        let match = false
        console.log('person', person)
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
  }
}
</script>