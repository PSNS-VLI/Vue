<template>
  <a-card :bordered="false">
    <div class="table-wrapper">
      <ErpTable
        title="PA26-50 的MRP"
        operation="edit"
        :frozenList="frozenList"
        :mainColumns="mainColumns"
        :sideColumns="sideColumns"
        v-model="mainData"/>
    </div>
  </a-card>
</template>

<script>
import {
  calMRP
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
      console.log(mainData)
      this.mainData = this.inflateMainData(
        mainData,
        calMRP(
        this.extractMainData(mainData),
        160,
        1)
      )
      console.log(this.mainData)
    },
    extractMainData (mainData) {
      return mainData.reduce((pre, cur) => {
        pre.push(Object.values(cur).slice(3))
        return pre
      }, [])
    },
    inflateMainData (mainData, matrix) {
      return mainData.reduce((pre, cur, index) => {
        pre.push(Object.assign(
          {},
          cur,
          matrix[index].reduce((pre, cur, index) => {
            pre[index === 0 ? 'current_zone' : `zone_${index}`] = cur
            return pre
          }, {})
          ))
          return pre
      }, [])
    }
  }
}
</script>

<style scoped>
@import url('../style/common.css');
</style>
