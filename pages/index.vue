<template>
  <div>
    <Score style="padding-top:1em" :persons="persons" />
    <div style="margin-top:2rem" class="container  has-text-centered">
      <h2 class="title">Trouvez un·e développeur·e freelance à Nantes</h2>
      <h3 class="subtitle"><em>Popcorn : La plateforme avec ( vraiment ) 0% de commission pour tout le monde</em></h3>
    </div>
    <div class="container">
      <PersonsWithSearch :persons="persons" />
    </div>
  </div>
</template>

<script>
import { getPersons } from '../lib/helpers.js'
import PersonsWithSearch from '../components/PersonsWithSearch'
import Score from '../components/Score'

export default {
  components: {
    PersonsWithSearch,
    Score
  },
  computed: {
    persons: () => getPersons()
  }
}
</script>

