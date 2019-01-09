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
  async asyncData({ store, params }) {
    const page = await getPageBySlug(params.slug)
    return {
      page
    }
  }
}
</script>
