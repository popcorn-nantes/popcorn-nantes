<template>
  <div class="container section">
    <Person v-if="person" :person="person"/>
    <div v-else>Désolé, cette page n'existe pas ou a été dépubliée. 😭</div>
  </div>
</template>

<script>
import Person from '@/components/Person'
import { getPersonBySlug } from '@/services/content'
import { generateSocialShareHeadersMeta } from '@/services/helpers'

export default {
  components: {
    Person
  },
  computed: {
    person() {
      return getPersonBySlug(this.$route.params.slug)
    }
  },
  head() {
    if (!this.person) {
      return {}
    }
    const title = `Profil de ${this.person.prenom} ${
      this.person.nom
    }, freelance ${this.person.technologies.join(', ')}`
    const description = `Popcorn : trouvez un développeur freelance à Nantes avec (vraiment) 0% de commission pour tout le monde`
    const image = `${process.env.POPCORN_BASE_URL}${this.person.photo}`
    const url = `${process.env.POPCORN_BASE_URL}${this.$route.path}`
    return {
      meta: [
        ...generateSocialShareHeadersMeta({ title, description, image, url })
      ]
    }
  }
}
</script>
