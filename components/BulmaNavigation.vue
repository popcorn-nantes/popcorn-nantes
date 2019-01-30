<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item">
          <strong>
            <nuxt-link style="color:black" to="/">POPCORN 🍿</nuxt-link>
          </strong>
        </span>
        <div
          @click="showOnMobile = !showOnMobile"
          :class="{'is-active': showOnMobile}"
          class="navbar-burger"
          data-target="app-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div id="app-menu" class="navbar-menu" :class="{'is-active': showOnMobile}">
        <div class="navbar-end">
          <nuxt-link @click.native="showOnMobile = false" to="/" class="navbar-item">Accueil</nuxt-link>
          <nuxt-link
            @click.native="showOnMobile = false"
            to="/page/a-propos"
            class="navbar-item"
          >En savoir plus</nuxt-link>
          <nuxt-link to="/page/kit-de-communication" class="navbar-item">Kit de communication</nuxt-link>
          <span class="navbar-item">
            <nuxt-link
              @click.native="showOnMobile = false"
              to="/page/inscription"
              class="button is-info"
              style="color:white"
            >Freelance ? Inscription</nuxt-link>
          </span>
          <div class="navbar-item">
            <div class="button" @click="showModal = true">Contact</div>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="showModal" class="modal" :class="{'is-active': showModal}">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content has-text-centered">
        <div class="box">
          <PopcornContact/>
        </div>
      </div>
      <button @click="showModal = false" class="modal-close is-large" aria-label="fermer"></button>
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
      showOnMobile: false
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
