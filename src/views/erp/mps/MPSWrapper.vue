<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <a-card :bordered="false">
      <component
        :sideColumns="sideColumns"
        :mainColumns="mainColumns"
        :tableData="tableData"
        :is="tabActiveKey">
      </component>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {
  getTableColumnsTem,
  getTableDataTem
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
    }]
    return {
      tabActiveKey: 'MPS',
      mainColumns: [],
      tableData: []
    }
  },
  created () {
    this.mainColumns = getTableColumnsTem('mps', [2, 2, 3])
    this.tableData = getTableDataTem('mps', [2, 2, 3])
  }
}
</script>

<style>

</style>
