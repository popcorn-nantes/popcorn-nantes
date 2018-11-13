<template>
  <div>
    <span v-for="tag in tags" :key="tag">{{tag}}</span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
