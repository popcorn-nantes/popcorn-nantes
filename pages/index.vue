<template>
  <div>
    <div class="container has-text-centered">
      <h1 class="title">Trouvez un développeur Freelance à Nantes</h1>
      <h2 class="subtitle">La plateforme avec (vraiment) 0% de comission pour tout le monde</h2>
    </div>
    <div class="container">
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

