<template>
  <div class="container section">
    <Person :person="person"/>
  </div>
</template>

<script>
import Person from '@/components/Person'

export default {
  components: {
    Person
  },
  async asyncData({ store, params }) {
    const persons = await store.dispatch('getPersons')
    const person = persons.find(p => p.$slug === params.slug)
    return {
      person
    }
  },
  head() {
    const title = `Profil de ${this.person.prenom} ${
      this.person.nom
    }, freelance ${this.person.technologies.join(', ')}`
    const description = `Popcorn : trouvez un développeur freelance à Nantes avec (vraiment) 0% de commission pour tout le monde`
    const image = `${process.env.popcornBaseUrl}${this.person.photo}`
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image
        },
        {
          hid: 'og:description',
          property: 'og:description',
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
