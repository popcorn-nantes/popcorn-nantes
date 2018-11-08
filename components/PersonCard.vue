<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="person.photo ? person.photo : 'https://bulma.io/images/placeholders/1280x960.png'" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4">{{person.nom}} {{person.prenom}}</p>
      <div class="content">
        {{person.description}}
        <div style="padding-top: 1em">
        <span style="margin-right:1em;" v-for="tag in person.tags" :key="tag" class="tag">{{tag}}</span>
        </div>
        <br />
        <!--<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  }
}
</script>