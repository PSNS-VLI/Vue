<template>
  <a-card :bordered="false">
    <div class="table-wrapper">
      <ErpTable
        @change="e => calMainData(e)"
        title="PA26-50 的MPS"
        operation="edit"
        :frozenList="frozenList"
        :mainColumns="mainColumns"
        :sideColumns="sideColumns"
        :mainData="mainData"/>
    </div>
  </a-card>
</template>

<script>
import {
  extractTableData,
  inflateTableData,
  calMPS
} from '@/utils/erp.js'

import ErpTable from '../components/ErpTable.vue'

export default {
  components: {
    ErpTable
  },
  props: {
    sideColumns: {
      type: Array,
      default: () => []
    },
    mainColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.frozenList = ['name']
    return {
      mainData: []
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler (val) {
        this.calMainData(val)
      }
    }
  },
  methods: {
    calMainData (mainData) {
      this.mainData = inflateTableData(
        mainData,
        calMPS(
        extractTableData(mainData),
        [2, 2, 3],
        20,
        160,
        1)
      )
    }
  }
}
</script>

<style scoped>
</style>
