<template>
  <div class="container section">
    <Page :page="page" />
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
      const page = pages.find(page => {
        return page.slug === this.$route.params.slug
      })
      return page
    }
  }
}
</script>
