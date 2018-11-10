<template>
  <div>
    <div class="container has-text-centered">
      <h1 class="title">POPCORN  : Trouvez un développeur freelance à Nantes</h1>
      <h2 class="subtitle">La plateforme avec ( vraiment ) 0% de commission pour tout le monde</h2>
    </div>
    <div class="">
      <PersonListWithSearch :persons="persons" />
    </div>
  </div>
</template>

<script>
import { getPersons } from '../lib/helpers.js'
import PersonListWithSearch from '../components/PersonListWithSearch'

export default {
  components: {
    PersonListWithSearch
  },
  computed: {
    persons: () => getPersons()
  }
}
</script>

