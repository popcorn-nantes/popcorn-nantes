<template>
  <div class="card-image" :style="style(person.photo)">
    <div class="name name-overlay"></div>
      <p class="name">{{person.prenom}} {{person.nom}}
      <span v-show="person.disponible" class="disponible tag is-success">
        {{person.disponible ? "disponible": ""}}
      </span>
      </p>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  methods: {
    style: url => {
      const imageUrl = url ? url : '/images/placeholder-peluche.png'
      return {
        height: '300px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${imageUrl})`,
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
.disponible {
  float: right;
}
.name-overlay {
  background: black;
  opacity: 0.6;
}
</style>