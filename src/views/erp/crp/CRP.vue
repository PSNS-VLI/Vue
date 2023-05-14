<template>
  <a-card :bordered="false">
    <div class="table-wrapper">
      <ErpTable
        title="PA26-50 的CRP"
        operation="edit"
        :hasSide="false"
        :frozenList="frozenList"
        :mainColumns="mainColumns"
        v-model="mainData"/>
    </div>
  </a-card>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

import ErpTable from '../components/ErpTable.vue'

export default {
  components: {
    ErpTable
  },
  props: {
    mainColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    frozenList: {
      type: Array,
      default: () => ['name']
    }
  },
  data () {
    return {
      mainData: []
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler (val) {
        this.mainData = cloneDeep(val)
      }
    }
  },
  method: {
  }
}
</script>

<style scoped>
@import url('../style/common.css');
</style>
