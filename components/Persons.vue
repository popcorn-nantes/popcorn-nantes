<template>
  <BulmaGrid :items="persons" itemsByRow="3">
    <template slot-scope="{item}">
        <PersonCard :person="item" />
    </template>
  </BulmaGrid>
</template>

<script>
import PersonCard from './PersonCard'
import BulmaGrid from './BulmaGrid'
export default {
  components: {
    PersonCard,
    BulmaGrid
  },
  props: {
    persons: {
      type: Array,
      required: true
    }
  }
}
</script>