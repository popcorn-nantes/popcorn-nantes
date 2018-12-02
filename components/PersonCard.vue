<template>
  <nuxt-link :to="`/person/${person.slug}`">
    <div class="card">
      <PersonCardPhoto :person="person"/>

      <div class="card-content">
        <p style="font-size:20px;" class="has-text-centered">{{person.titre}}</p>
        <p
          v-show="person.sous_titre"
          style="font-size:15px;font-style:italic"
          class="has-text-centered"
        >{{person.sous_titre}}</p>
        <div class="has-text-centered" style="padding-top: 1em">
          <Tags :tags="person.domaines_metiers"/>
        </div>

        <div class="has-text-centered" style="padding-top: 1em">
          <Tags :tags="person.technologies"/>
        </div>
        <div class="content">
          <div class="has-text-centered">
            <br>
            <nuxt-link :to="`/person/${person.slug}`" class="button is-primary">Voir le profil</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Tags from './Tags'
import PersonCardPhoto from './PersonCardPhoto'

export default {
  components: {
    Tags,
    PersonCardPhoto
  },
  props: {
    person: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card:hover {
  transition: all 0.2s ease-in-out;
  top: -5px;
  box-shadow: 0 2px 20px;
}
.card {
  height: 100%;
  position: relative;
  transition: all 0.3s ease-in-out;
  top: 0;
}
</style>
