<template>
  <div class="container section">
    <div class="content" v-html="page.__html"></div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
