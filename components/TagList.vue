<template>
  <div>
    <span
    style="margin:0.2em;text-transform:uppercase"
    v-for="tag in tags" :key="tag" :class="`tag ${tagClass}`">
    {{tag}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true
    },
    tagClass: {
      type: String,
      default: 'is-light'
    }
  }
}
</script>
