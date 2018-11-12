<template>
  <div class="card">

    <PersonCardPhoto :url="person.photo">
      <div class="name name-overlay"></div>
      <p class="name">{{person.prenom}} {{person.nom}}</p>
    </PersonCardPhoto>

    <div class="card-content">
      <p style="font-size:20px;" class="has-text-centered">{{person.titre}}</p>
      <p v-if="person.sous_titre" style="font-size:15px;font-style:italic" class="has-text-centered">{{person.sous_titre}}</p>
      <div class="has-text-centered" style="padding-top: 1em">
        <TagList tagClass="is-warning" :tags="person.domaines" />
      </div>
      <div class="has-text-centered" style="padding-top: 1em">
        <TagList :tags="person.technologies" />
      </div>
      <div class="content">
        {{person.description}}
        <br />
        <div class="has-text-centered">
          <nuxt-link :to="`/person/${person.slug}`" class="button is-primary">Voir le profil</nuxt-link>
        </div>
        <!--<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>-->
      </div>
    </div>
  </div>
</template>

<script>
import TagList from './TagList'
import PersonCardPhoto from './PersonCardPhoto'

export default {
  components: {
    TagList,
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
.name-overlay {
  background: black;
  opacity: 0.6;
}
</style>