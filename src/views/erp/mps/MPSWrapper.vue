<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <a-card :bordered="false">
      <keep-alive>
        <component
          :sideColumns="sideColumns"
          :mainColumns="mainColumns"
          :tableData="tableData"
          :is="tabActiveKey">
        </component>
      </keep-alive>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {
  getTableColumnsTem,
  getTableDataTem,
  extractTableData,
  inflateTableData
} from '@/utils/erp'

import MPS from './MPS.vue'
import RCCP from './RCCP.vue'

export default {
  components: {
    MPS,
    RCCP
  },
  data () {
    this.tabList = [
      { key: 'MPS', tab: '主生产计划表' },
      { key: 'RCCP', tab: '粗能力计划' }
    ]
    this.sideColumns = [{
      title: '编制日期'
    }, {
      title: '2023/10/2'
    }, {
      title: '安全库存'
    }, {
      title: '20'
    }, {
      title: '生产批量'
    }, {
      title: '160'
    }, {
      title: '提前期'
    }, {
      title: '1'
    }]
    return {
      tabActiveKey: 'MPS',
      mainColumns: [],
      tableData: []
    }
  },
  created () {
    this.mainColumns = getTableColumnsTem('mps', [2, 4, 4])
    const tableData = getTableDataTem('mps', [2, 4, 4])
    const matrix = extractTableData(tableData)
    matrix[0] = [0, 70, 70, 70, 70,	70,	80,	80,	80,	80,	80]
    matrix[1] = [0, 100,	90,	80,	60,	70,	90,	50,	100,	90,	70]
    matrix[4][0] = 120
    this.tableData = inflateTableData(tableData, matrix)
  }
}
</script>

<style>

</style>
