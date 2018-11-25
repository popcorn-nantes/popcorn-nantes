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
    const title = `profil de ${this.person.prenom} ${
      this.person.nom
    }, freelance ${this.person.technologies.join(', ')}`
    const description = `Popcorn : trouvez un développeur freelance à Nantes avec (vraiment) 0% de commission pour tout le monde`
    const image = `${process.env.popcornBaseUrl}/images/popcorn-500.jpg`
    return {
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: image
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description
        },
        // twitter card:
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image
        }
      ]
    }
  }
}
</script>
