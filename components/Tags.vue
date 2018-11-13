<template>
  <div>
    <span style="margin-right: 5px" v-for="tag in tags" :key="tag" class="tag is-light">{{tag}}</span>
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
