<template>
  <div>
    {{technologies.join(', ')}}
  </div>
</template>

<script>
export default {
  props: {
    technologies: {
      type: Array,
      required: true
    }
  }
}
</script>
