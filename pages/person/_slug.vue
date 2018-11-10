<template>
  <div class="container section">
    <div class="columns">
      <div class="column is-two-thirds">
        <h1 style="text-transform:uppercase" class="title">{{person.nom}} {{person.prenom}}</h1>
        <h2 class="subtitle">{{person.titre}}</h2>
        <h2 class="subtitle"><TagList :tags="person.tags" /></h2>
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
import TagList from '../../components/TagList'

export default {
  components: {
    TagList
  },
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
