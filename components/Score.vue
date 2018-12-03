<template>
  <div class="container">
    <p has-text-centered>
      <em>🚀 Inscriptions ouvertes ! Objectif en cours : 10 premier·e·s freelance inscrit·e·s</em>
    </p>
    <progress class="progress is-primary" :value="persons.length" max="10"></progress>
  </div>
</template>

<script>
export default {
  props: {
    persons: {
      type: Array,
      required: true
    }
  }
}
</script>
