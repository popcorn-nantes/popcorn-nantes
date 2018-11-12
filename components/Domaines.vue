<template>
  <div>
    {{domaines.join(', ')}}
  </div>
</template>

<script>
export default {
  props: {
    domaines: {
      type: Array,
      required: true
    }
  }
}
</script>
