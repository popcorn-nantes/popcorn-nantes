<template>
  <div class="container section">
    <div class="columns">
      <div class="column">
        <PersonCardPhoto :person="person" />
      </div>
      <div class="column is-two-thirds">
        <div class="columns">
          <div class="column is-two-thirds">
           <h1 style="text-transform:uppercase" class="title">{{person.prenom}} {{person.nom}} </h1>
            <h2 class="subtitle">{{person.titre}} </h2>
            <h2 class="subtitle"><Tags :tags="person.domaines_metiers" /></h2>
            <h2 class="subtitle"><Tags :tags="person.technologies" /></h2>
          </div>
          <div class="column">
            <button class="button is-primary" @click="showModal = true">
              <span class="icon is-medium"><i class="fas fa-envelope"></i></span>  
              <span>Proposer un projet</span>
            </button>
          </div>
        </div>

        <div class="content" v-html="person.__html"></div>
      </div>
    </div>

    <!-- "v-if" removes this contacts informations from the DOM -->
    <div v-if="showModal" class="modal" :class="{'is-active': showModal}">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content has-text-centered">
        <div class="box">
          <h1 class="title">Contacter {{person.nom}} {{person.prenom}}</h1>
          <h2 class="subtitle">{{person.titre}} </h2>
          <p style="margin-top:1rem" class="is-size-5"> 
            {{person.mail}}
          </p>
          <p v-show="person.telephone" style="margin-top:1rem" class="is-size-5"> 
            {{person.telephone}}
          </p>
          <p style="margin-top:2rem" ><em>Indiquez-lui que vous l'avez trouvé·e sur Popcorn :) <br />
          <img style="position:relative;top:6px;" width="40px" src="/favicon.ico"/></em></p>
        </div>
        <!-- Any other Bulma elements you want -->
      </div>
      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
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
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>
