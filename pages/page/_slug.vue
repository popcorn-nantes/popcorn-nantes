<template>
  <div class="container section">
    <div class="content" v-html="page.$html"></div>
  </div>
</template>

<script>
import Page from '@/components/Page'
import { getPageBySlug } from '@/services/content'

export default {
  components: {
    Page
  },
  computed: {
    page() {
      return getPageBySlug(this.$route.params.slug)
    }
  }
}
</script>
