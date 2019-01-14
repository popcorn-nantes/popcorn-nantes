<template>
  <div class="container section">
    <div class="content" v-html="page.$html"></div>
  </div>
</template>

<script>
import { getPageBySlug } from '@/services/content'

export default {
  computed: {
    page() {
      return getPageBySlug(this.$route.params.slug)
    }
  }
}
</script>
