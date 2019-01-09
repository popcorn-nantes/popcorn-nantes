<template>
  <div class="container section">
    <Page :page="page"/>
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
