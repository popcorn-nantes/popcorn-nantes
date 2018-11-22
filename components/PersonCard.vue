<template>
  <div class="card">

    <PersonCardPhoto :url="person.photo">
      <div class="name name-overlay"></div>
      <p class="name">{{person.prenom}} {{person.nom}}
      <span v-if="person.disponible" class="disponible tag is-success">
        {{person.disponible ? "Disponible": ""}}
      </span>
      </p>
    </PersonCardPhoto>


    <div class="card-content">
      <p style="font-size:20px;" class="has-text-centered">{{person.titre}}</p>
      <p v-show="person.sous_titre" style="font-size:15px;font-style:italic" class="has-text-centered">{{person.sous_titre}}</p>
      <div class="has-text-centered" style="padding-top: 1em">
        <Tags :tags="person.domaines_metiers" />
      </div>

      <div class="has-text-centered" style="padding-top: 1em">
        <Tags :tags="person.technologies" />
      </div>
      <div class="content">
        <div class="has-text-centered">
          <br />
          <nuxt-link :to="`/person/${person.slug}`" class="button is-primary">Voir le profil</nuxt-link>
        </div>
      </div>

    </div>

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
.card-image {
  position: relative;
}
.name {
  text-align: center;
  height: 40px;
  padding: 8px;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
}
.disponible {
  float: right;
}
.name-overlay {
  background: black;
  opacity: 0.6;
}
</style>