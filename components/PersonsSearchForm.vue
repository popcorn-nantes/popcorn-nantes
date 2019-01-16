<template>
  <div class="field has-text-centered">
    <div class="control has-text-centered">
      <label
        for="search"
        class="label"
      >Cherchez par domaine (site web, application mobile, boutique...) ou technologie (React, WordPress, Java, PHP ... )</label>
      <input
        id="search"
        class="input is-large"
        :value="value"
        @input="$emit('input', $event.target.value)"
        type="text"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
input {
  max-width: 400px;
}
</style>