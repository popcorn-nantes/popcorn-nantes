<template>
  <div>
    <span 
    style="margin-right:1em;" 
    v-for="tag in tags" :key="tag" class="tag">
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
    }
  }
}
</script>
