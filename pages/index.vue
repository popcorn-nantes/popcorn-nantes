<template>
  <div>
    <div v-if="errorMessage" class="is-danger">{{errorMessage}}</div>
    <div style="margin-top:2rem" class="container has-text-centered">
      <h1 class="title">Trouvez un·e développeur·e freelance à Nantes</h1>
      <h2 class="subtitle">
        <em>Popcorn : La plateforme avec ( vraiment ) 0% de commission pour tout le monde</em>
      </h2>
    </div>
    <div class="container">
      <PersonsWithSearch :persons="persons"/>
    </div>
  </div>
</template>

<script>
import PersonsWithSearch from '../components/PersonsWithSearch'

export default {
  scrollToTop: false,
  components: {
    PersonsWithSearch
  },
  data() {
    return {
      persons: [],
      errorMessage: null
    }
  },
  asyncData({ store }) {
    return store
      .dispatch('getPersons')
      .then(persons => {
        return { persons }
      })
      .catch(e => {
        return {
          errorMessage: `échec de la récupération des personnes ${e.message}`
        }
      })
  }
}
</script>

