<template>
  <div>
    <div class="container has-text-centered">
      <h1 class="title">Trouvez un développeur Freelance à Nantes</h1>
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

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3vw;
  color: #35495e;
  letter-spacing: 1px;
  padding-top: 1rem;
}

.subtitle {
  font-weight: 300;
  font-size: 4vw;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
