<template>
  <div class="card">
    <div class="card-image" :style="style(person.photo)">
      <div class="name name-overlay"></div>
      <p class="name">{{person.nom}} {{person.prenom}}</p>
    </div>

    <div class="card-content">
      <p style="font-size:20px;" class="has-text-centered">{{person.titre}}</p>
      <div class="has-text-centered" style="padding-top: 1em">
        <TagList :tags="person.tags" />
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
export default {
  components: {
    TagList
  },
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  methods: {
    style: imageUrl => {
      const url = imageUrl
        ? imageUrl
        : 'https://bulma.io/images/placeholders/1280x960.png'
      return {
        height: '200px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${url})`,
        backgroundPosition: 'center'
      }
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