<template>
  <div>
    Page d'une personne en particulier
  </div>
</template>

<script>
import { getPersons } from '../../lib/helpers.js'

export default {
  computed: {
    persons: () => getPersons()
  }
}
</script>
