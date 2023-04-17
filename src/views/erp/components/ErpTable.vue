<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <a-table
        bordered
        :columns="sideColumns"
        :locale="locale"
        v-if="hasSide"
      >
        <div slot="title" class="table-title" v-if="title">{{ title }}</div>
      </a-table>

      <a-table
        bordered
        :columns="mainColumnsCopy"
        :data-source="mainData"
        :pagination="false">
        <div slot="title" class="table-title" v-if="!hasSide && title">{{ title }}</div>
      </a-table>
    </div>
  </div>
</template>

<script>
import EmptyNone from './EmptyNone.vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    hasSide: {
      type: Boolean,
      default: true
    },
    sideColumns: {
      type: Array,
      default: () => []
    },
    mainColumns: {
      type: Array,
      default: () => []
    },
    mainData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.locale = { emptyText: <EmptyNone /> }
    return { }
  },
  computed: {
    mainColumnsCopy () {
      return this.mainColumns.map((item) => ({ ...item }))
    }
  }
}
</script>

<style scoped>
.table-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.ant-table-wrapper:first-child .ant-table-placeholder {
  padding: unset;
}

.ant-table-wrapper:first-child .ant-table-thead > tr > th {
  border-bottom: none;
}
</style>
