<template>
  <div>
      <PersonListSearchForm :value="value" @input="onInput" />
      <PersonList :persons="result" />
  </div>
</template>

<script>
import PersonList from './PersonList'
import PersonListSearchForm from './PersonListSearchForm'

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
      result: [...this.persons]
    }
  },
  methods: {
    onInput(value) {
      this.value = value
      this.result = this.search(value)
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