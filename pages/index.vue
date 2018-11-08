<template>
  <div>
    <div class="container has-text-centered">
      <h1 class="title is-1">
        Titre
      </h1>
      <h2 class="title is-2">
        {{persons.length}} personnes
      </h2>
    </div>
    <PersonListWithSearch :persons="persons" />
  </div>
</template>

<script>
import persons from '../content/persons.json'
import PersonListWithSearch from '../components/PersonListWithSearch'

export default {
  components: {
    PersonListWithSearch
  },
  computed: {
    persons: () => persons
  }
}
</script>
