<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <CRP
        :frozenList="frozenList"
        :mainColumns="mainColumns"
        :tableData="tableData"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {
  getTableColumnsTem,
  getTableDataTem
} from '@/utils/erp'

import CRP from './CRP.vue'

export default {
  components: {
    CRP
  },
  data () {
    return {
      // mrp data
      frozenList: ['name', 'department_center'],
      mainColumns: [],
      tableData: []
    }
  },
  created () {
    const dataPiece = ['WC02', 'WC07', 'WC15', 'WC02', 'WC07', 'WC23', 'WC39']
    this.mainColumns = getTableColumnsTem('crp', [2, 2, 3])
    this.tableData = getTableDataTem('crp', [2, 2, 3], {
      tableData: ['ZXCA-F2', 'A1', 'A2', 'B', 'C1', 'C2', 'D'],
      keyFn (name, index) {
        return {
          department_center: dataPiece[index]
        }
      }
    })
  },
  methods: {
  }
}
</script>

<style></style>
