<template>
  <div class="container">
    <h1 style="text-transform:uppercase" class="title">{{person.nom}} {{person.prenom}}</h1>
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="content" v-html="person.__html"></div>
      </div>
      <div class="column">
        <div v-if="person.photo"><img :src="person.photo" /></div>
      </div>
    </div>
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
      return person
    }
  }
}
</script>
