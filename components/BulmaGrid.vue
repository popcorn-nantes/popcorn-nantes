<!--
Create automatically a Bulma css Grid from :items 
Example :
  <BulmaGrid :items="persons" itemsByRow="3">
    <template slot-scope="props">
      <PersonCard :person="props.item" />
    </template>
  </BulmaGrid>
-->

<template>
  <div>
    <div class="columns" v-for="(column, rowIndex) in columns" :key="rowIndex">
      <div v-for="(item, index) in column" :key="itemKey(item)" :class="columnClasses">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemsByRow: {
      type: String,
      default: '4'
    },
    itemKey: {
      type: Function,
      default: (key, index) => index
    },
    items: {
      type: Array,
      default: []
    }
  },
  computed: {
    columnClasses() {
      return 'column is-' + 12 / this.itemsByRow
    },
    columns() {
      let columnIndex = 0
      let columns = {}
      for (const itemIndex in this.items) {
        if (itemIndex % this.itemsByRow === 0) {
          columns[++columnIndex] = []
        }
        columns[columnIndex].push(this.items[itemIndex])
      }
      return columns
    }
  }
}
</script>