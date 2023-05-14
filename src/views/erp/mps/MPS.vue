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
      console.log(mainData)
      this.mainData = this.inflateMainData(
        mainData,
        calMPS(
        this.extractMainData(mainData),
        [2, 2, 3],
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
</style>
