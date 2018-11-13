<template>
  <div class="container section">
    <div class="content" v-html="page.__html"></div>
  </div>
</template>

<script>
import { getPages } from '../../lib/helpers.js'

export default {
  computed: {
    page: function page() {
      const page = getPages().find(page => {
        return page.slug === this.$route.params.slug
      })
      return page
    }
  }
}
</script>
