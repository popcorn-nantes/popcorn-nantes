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
  asyncData({ store, params }) {
    const page = pages.find(page => page.$slug === params.slug)
    return {
      page
    }
  }
}
</script>
