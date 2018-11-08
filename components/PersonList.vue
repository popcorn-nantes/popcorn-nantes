<template>
  <div>
    <BulmaGrid :items="persons" itemsByRow="4">
      <template slot-scope="props">
        <PersonCard :person="props.item" />
      </template>
    </BulmaGrid>
  </div>
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