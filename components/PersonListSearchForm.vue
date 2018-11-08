<template>
  <div class="field">
    <input 
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