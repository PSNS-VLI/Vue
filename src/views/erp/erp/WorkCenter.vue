<template>
  <div>
    <a-card :bordered="false">
      <ErpTable
        operation="edit, delete, add"
        title="工作中心和工作中心的可用能力"
        :hasSide="false"
        :mainColumns="wccColumns"
        :mainData="wccMainData"
        @change="handleChange($event, 'wcc')"/>
    </a-card>
    <a-card :bordered="false">
      <ErpTable
        operation="edit, add"
        title="工作中心的等待、移动、排队时间"
        :frozenList="frozenList"
        :hasSide="false"
        :mainColumns="wctColumns"
        :mainData="wctMainData"
        @change="handleChange($event, 'wct')"/>
    </a-card>
  </div>
</template>

<script>
import {
  workCenterCapacityColumns,
  workCenterTimeColumns
} from '@/config/erp.config.js'

import ErpTable from '../components/ErpTable.vue'

export default {
  components: {
    ErpTable
  },
  data () {
    this.frozenList = ['name']
    return {
      wccColumns: [...workCenterCapacityColumns],
      wctColumns: [...workCenterTimeColumns],
      wccMainData: [],
      wctMainData: []
    }
  },
  methods: {
    handleChange (data, tag) {
      console.log(data, tag)
      if (tag === 'wcc') {
        this.wccMainData = data
      } else {
        this.wctMainData = data
      }
    }
  }
}
</script>

<style scoped>

</style>
