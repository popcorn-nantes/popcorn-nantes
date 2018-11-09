<template>
  <div class="container">
    <div class="content" v-html="page.__html"></div>
  </div>
</template>

<script>
import { getPages } from '../../lib/helpers.js'
import TagList from '../../components/TagList'

export default {
  components: {
    TagList
  },
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
