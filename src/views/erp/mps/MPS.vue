<template>
  <a-card :bordered="false">
    <div class="table-operation">
      <a-row :gutter="48">
        <a-col :md="6" :sm="24">
          <a-button :type="isEdit ? 'default' : 'primary'" icon="edit" @click="isEdit = !isEdit">
            <template v-if="isEdit">取消编辑</template>
            <template v-else>编辑</template>
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="table-wrapper">
      <ErpTable
        title="PA26-50 的MPS"
        :isEdit="isEdit"
        :frozenList="frozenList"
        :mainColumns="mainColumns"
        :sideColumns="sideColumns"
        v-model="mainData"/>
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
      isEdit: false,
      mainData: []
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler (val) {
        this.calMainData(val)
      }
    },
    mainData (val) {
      this.calMainData(val)
    }
  },
  methods: {
    calMainData (mainData) {
      this.mainData = calMPS(
        this.extractMainData(mainData),
        [2, 2, 3],
        160,
        1)
    },
    extractMainData (mainData) {
      return mainData.reduce((pre, cur) => {
        pre.push(Object.values(cur).slice(3))
        return pre
      }, [])
    }
  }
}
</script>

<style scoped>
.table-operation {
  margin-bottom: 20px;
}
</style>
