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
      if (!text.trim()) {
        return this.persons
      }
      return this.persons.filter(person => {
        let match = false
        person.tags.forEach(tag => {
          if (text.toLowerCase().indexOf(tag.toLowerCase()) > -1) {
            match = true
          }
        })
        return match
      })
    }
  }
}
</script>