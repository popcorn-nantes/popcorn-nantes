<template>
  <div class="container">
    <h1>{{person.name}}</h1>
    <div v-if="person.photo"><img :src="person.photo" /></div>
    <div v-html="person.__html"></div>
  </div>
</template>

<script>
import { getPersons } from '../../lib/helpers.js'

export default {
  computed: {
    person: function person() {
      const person = getPersons().find(person => {
        return person.slug === this.$route.params.slug
      })
      console.log('person', person)
      return person
    }
  }
}
</script>
