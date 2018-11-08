<template>
  <div>
    <div class="container has-text-centered">
      <h1 class="title is-1">
        Trouvez un développeur freelance à Nantes
      </h1>
      <h2 class="title is-2">

        {{persons.length}} personnes
      </h2>
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
