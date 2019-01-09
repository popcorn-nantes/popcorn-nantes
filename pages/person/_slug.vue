<template>
  <div class="container section">
    <Person :person="person"/>
  </div>
</template>

<script>
import Person from '@/components/Person'
import { getPersonBySlug } from '@/services/content'
import { getSocialShareHeadersMeta } from '@/services/helpers'

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
    const title = `Profil de ${this.person.prenom} ${
      this.person.nom
    }, freelance ${this.person.technologies.join(', ')}`
    const description = `Popcorn : trouvez un développeur freelance à Nantes avec (vraiment) 0% de commission pour tout le monde`
    const image = `${process.env.POPCORN_BASE_URL}${this.person.photo}`
    const url = `${process.env.POPCORN_BASE_URL}${this.$route.path}`
    return {
      meta: [...getSocialShareHeadersMeta({ title, description, image, url })]
    }
  }
}
</script>
