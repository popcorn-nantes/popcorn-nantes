<template>
  <div class="field has-text-centered">
    <input 
    placeholder="Entrez la compétence recherchée"
    class="input" 
    @value="value" 
    @input="$emit('input', $event.target.value)" 
    type="text" 
    />
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