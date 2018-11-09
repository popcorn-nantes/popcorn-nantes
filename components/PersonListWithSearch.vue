<template>
  <div class="section">
    <div style="padding-bottom:3em">
      <PersonListSearchForm :value="value" @input="onInput" />
    </div>
    <PersonList :persons="results" />
  </div>
</template>

<script>
import PersonList from './PersonList'
import PersonListSearchForm from './PersonListSearchForm'
import { shuffle } from '../lib/helpers.js'

export default {
  components: {
    PersonList,
    PersonListSearchForm
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
        // remplacer les virgules par des espaces
        let textLowerCased = text.toLowerCase().trim()
        let match = false
        person.tags.forEach(tag => {
          if (tag.toLowerCase().indexOf(textLowerCased) > -1) {
            match = true
          }
        })
        return match
      })
    }
  }
}
</script>