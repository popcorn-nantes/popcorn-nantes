<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item">
          <strong>
            <nuxt-link style="color:black" to="/">
              POPCORN 🍿
            </nuxt-link>
          </strong>
        </span>
  
        <div @click="mobileMenuIsOpen = !mobileMenuIsOpen" :class="{'is-active': mobileMenuIsOpen}" class="navbar-burger" data-target="app-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
  
      </div>
  
      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div id="app-menu" class="navbar-menu" :class="{'is-active': mobileMenuIsOpen}">
        <div class="navbar-end">
          <nuxt-link to="/" class="navbar-item"> Accueil </nuxt-link>
          <a href="https://github.com/popcorn-nantes/popcorn-nantes/blob/master/README.md" class="navbar-item"> Plus d'informations </a>
          <div class="navbar-item"><div class="button" @click="showModal = true"> Contact </div></div>
          <span class="navbar-item ">
            <a href="https://github.com/popcorn-nantes/popcorn-nantes#créer-son-profil" class="button is-info"> 
            <img style="padding:4px;" src="/images/github.svg"/> Freelance ?  Inscris-toi avec une PR !  
            </a>
          </span>
        </div>
      </div>
    </nav>

    <!-- "v-if" removes this contacts informations from the DOM -->
    <div v-if="showModal" class="modal" :class="{'is-active': showModal}">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content has-text-centered">
        <div class="box">
          <PopcornContact/>
        </div>
        <!-- Any other Bulma elements you want -->
      </div>
      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
    </div>

  </div>
</template>

<script>
import PopcornContact from '../components/PopcornContact'
export default {
  components: {
    PopcornContact
  },
  data() {
    return {
      showModal: false,
      mobileMenuIsOpen: false
    }
  },
  watch: {
    // close the mobile menu when route changed.
    $route: function() {
      this.mobileMenuIsOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  padding-left: '3rem';
}
/* Create slide animation on mobile */
@media screen and (max-width: 999px) {
  .navbar-end {
    padding: 0.5rem 1rem;
  }

  .navbar-menu {
    display: block;
    overflow: hidden;
    max-height: 0px;
    padding: 0rem 1rem;
    transition: max-height 0.2s;
  }

  .navbar-menu.is-active {
    max-height: 100vh;
    transition: max-height 0.5s;
  }
}

.nuxt-link-exact-active {
  color: #363636;
}
</style>
