<template>
  <div>
    <a-card :bordered="false">
      <ErpTable
        operation="edit, add"
        title="ZXCA-F2的工艺路线和额定工时"
        :hasSide="false"
        :mainColumns="mainColumns"
        :mainData="mainData"
        @change="handleChange($event, 'wct')"/>
    </a-card>
  </div>
</template>

<script>
import {
  processRouteColumns
} from '@/config/erp.config.js'

import ErpTable from '../components/ErpTable.vue'

export default {
  components: {
    ErpTable
  },
  data () {
    return {
      mainColumns: [...processRouteColumns],
      mainData: []
    }
  },
  methods: {
    handleChange (data, tag) {
      console.log(data, tag)
      this.mainData = data
    }
  }
}
</script>

<style scoped>

</style>
