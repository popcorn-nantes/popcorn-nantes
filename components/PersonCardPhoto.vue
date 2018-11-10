<template>
  <div class="card-image" :style="style(url)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    style: url => {
      const imageUrl = url ? url : '/images/placeholder-peluche.png'
      return {
        height: '200px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center'
      }
    }
  }
}
</script>
