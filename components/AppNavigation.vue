<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item">
          <strong>
            <nuxt-link to="/">
              POPCORN <span class="tag is-warning">version alpha</span>
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
            <a class="navbar-item" href="https://join.slack.com/t/popcorn-nantes/shared_invite/enQtNDc2MzY5MDg5NjM2LTYwOTg4ZGI5NTQ5MTk2NTAyOWNkZDJjODc5NTAwMDhmOWVhZTQ2NmFmMzZlMWM4ZDNiMTY4N2E5ZDNkOGJhN2Q">
              <span class="button">
                <span style="padding-right:10px"><img style="position:relative;top:3px" src="/images/slack-logo.svg"/></span>
                <span>Poser une question</span>
              </span>
            </a>
          <div class="navbar-item">
            <p class="control">
              <nuxt-link to="/page/inscription" class="button"><strong>Freelance ? Inscrivez-vous</strong> </nuxt-link>
            </p>
           </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
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