<template>
  <div class="container section">
    <Person :person="person" />
  </div>
</template>

<script>
import Person from '@/components/Person'
import persons from '@/static/api/persons'

export default {
  components: {
    Person
  },
  computed: {
    person: function person() {
      return persons.find(person => {
        return person.slug === this.$route.params.slug
      })
    }
  }
}
</script>
