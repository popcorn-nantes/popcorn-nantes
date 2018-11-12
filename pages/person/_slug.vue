<template>
  <div class="container section">
    <div class="columns">
      <div class="column">
        <PersonCardPhoto :url="person.photo" />
      </div>
      <div class="column is-two-thirds">
        <div class="columns">
          <div class="column is-two-thirds">
           <h1 style="text-transform:uppercase" class="title">{{person.nom}} {{person.prenom}} </h1>
            <h2 class="subtitle">{{person.titre}} </h2>
            <h2 class="subtitle"><Domaines tagClass="is-warning" :tags="person.domaines" /></h2>
            <h2 class="subtitle"><Technologies :tags="person.technologies" /></h2>
          </div>
          <div class="column">
            <button class="button is-primary is-medium" @click="showModal = true">
              <span class="icon is-medium"><i class="fas fa-envelope"></i></span>  
              <span>Proposer un projet</span>
            </button>
          </div>
        </div>

        <div class="content" v-html="person.__html"></div>
      </div>
    </div>

    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content has-text-centered">
        <div class="box">
          <h1 class="title">{{person.nom}} {{person.prenom}}</h1>
          <h2 class="subtitle">{{person.titre}} </h2>
          <p style="margin-top:1rem" class="is-size-5"> 
            {{person.mail}}
          </p>
        </div>
        <!-- Any other Bulma elements you want -->
      </div>
      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import { getPersons } from '../../lib/helpers.js'
import Technologies from '../../components/Technologies'
import Domaines from '../../components/Domaines'
import PersonCardPhoto from '../../components/PersonCardPhoto'

export default {
  components: {
    Technologies,
    Domaines,
    PersonCardPhoto
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    person: function person() {
      const person = getPersons().find(person => {
        return person.slug === this.$route.params.slug
      })
      return person
    }
  }
}
</script>
