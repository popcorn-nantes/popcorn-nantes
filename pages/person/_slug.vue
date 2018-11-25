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
  },
  head() {
    return {
      meta: [
        // twitter card:
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Popcorn : profil de ${this.person.prenom} ${
            this.person.nom
          }`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'La plateforme avec ( vraiment ) 0% de commission pour tout le monde'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `${process.env.popcornBaseUrl}${this.person.photo}`
        }
      ]
    }
  }
}
</script>
