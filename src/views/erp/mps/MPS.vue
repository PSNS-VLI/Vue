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
import { createNamespacedHelpers } from 'vuex'

import ErpTable from '../components/ErpTable.vue'

const { mapMutations } = createNamespacedHelpers('erp/mps')
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
    ...mapMutations(['setPORele']),
    calMainData (mainData) {
      const matrix = extractTableData(mainData)
      this.mainData = inflateTableData(
        mainData,
        calMPS(
        matrix,
        [2, 4, 4],
        20,
        160,
        1)
      )
      this.setPORele({ data: matrix[8] })
    }
  }
}
</script>

<style scoped>
</style>
