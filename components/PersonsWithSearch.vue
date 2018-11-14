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
import { shuffle } from '../lib/helpers.js'

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
        let textLowerCased = text.toLowerCase().trim()
        let match = false
        person.search_keywords.forEach(search_keyword => {
          if (search_keyword.toLowerCase().indexOf(textLowerCased) > -1) {
            match = true
          }
        })
        return match
      })
    }
  }
}
</script>