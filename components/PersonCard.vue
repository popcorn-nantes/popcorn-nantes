<template>
  <div class="person" :id="`person-${person.slug}`">
    <nuxt-link
      :to="{path: `/person/${person.$slug_from_filename}`, query: { search: $store.getters.currentSearch }}"
    >
      <div class="card">
        <PersonCardPhoto :person="person"/>

        <div class="card-content">
          <h2 style="font-size:20px;" class="has-text-centered">{{person.titre}}</h2>
          <h3
            v-show="person.sous_titre"
            style="font-size:15px;font-style:italic"
            class="has-text-centered"
          >{{person.sous_titre}}</h3>
          <div class="has-text-centered" style="padding-top: 1em">
            <Tags class="domaines-metiers" :tags="person.domaines_metiers"/>
          </div>

          <div class="has-text-centered" style="padding-top: 1em">
            <Tags class="technologies" :tags="person.technologies"/>
          </div>
          <div class="content">
            <div class="has-text-centered">
              <br>
              <nuxt-link
                :to="{path: `/person/${person.$slug_from_filename}`,query: { search: $store.getters.currentSearch}}"
                class="button is-primary"
              >Voir le profil</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
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
