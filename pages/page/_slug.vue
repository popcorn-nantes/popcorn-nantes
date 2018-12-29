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
  async asyncData({store, params}) {
    const page = pages.data.find(node => node.data.slug === params.slug)
    return {
      page: page.data
    }
  }
}
</script>
