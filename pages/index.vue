<template>
  <div>
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
import persons from '../static/api/persons.json'
import PersonsWithSearch from '../components/PersonsWithSearch'

export default {
  components: {
    PersonsWithSearch
  },
  computed: {
    persons: () => persons
  }
}
</script>

