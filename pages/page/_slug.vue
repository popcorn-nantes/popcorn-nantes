<template>
  <div class="container section">
    <Page :page="page"/>
  </div>
</template>

<script>
import pages from '@/static/api/pages.json'
import Page from '@/components/Page'

export default {
  components: {
    Page
  },
  computed: {
    page: function page() {
      return pages.find(page => page.slug === this.$route.params.slug)
    }
  }
}
</script>
