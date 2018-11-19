<template>
  <div class="field has-text-centered">
    <div class="control has-text-centered">
      <label class="label">Cherchez un domaine métier (Site web, application mobile, boutique ...) ou une technologie (PHP, WordPress, JavaScript fullstack ... )</label>
        <input
        class="input is-large" 
        @value="value" 
        @input="$emit('input', $event.target.value)" 
        type="text" 
        />
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