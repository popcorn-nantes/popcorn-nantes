<template>
  <div>
      <section class="section">
        <PersonListSearchForm :value="value" @input="onInput" />
        <PersonList :persons="results" />
      </section>
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
    search(value) {
      return this.persons.filter(person => {
        const tags = person.tags.join(' ')
        const name = person.nom + ' ' + person.prenom
        let text = name + ' ' + tags
        return text.toLowerCase().indexOf(value.toLowerCase()) > -1
      })
    }
  }
}
</script>