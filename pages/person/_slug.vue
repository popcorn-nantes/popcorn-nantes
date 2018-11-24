<template>
  <div class="container section">
    <Person :person="person" />
  </div>
</template>

<script>
import { getPersons } from '../../lib/helpers.js'
import Person from '../../components/Person'

export default {
  components: {
    Person
  },
  computed: {
    person: function person() {
      return getPersons().find(person => {
        return person.slug === this.$route.params.slug
      })
    }
  }
}
</script>
