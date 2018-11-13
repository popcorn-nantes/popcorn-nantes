<template>
  <div>
    <!--<span v-for="technologie in technologies" :key="technologie" class="tag">{{technologie}}</span>-->
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
