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
import cloneDeep from 'lodash.clonedeep'
import {
  calGR
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
      isEdit: false
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler (val) {
        this.mainData = cloneDeep(val)
      }
    },
    mainData (val, oldVal) {
      if (oldVal.length !== 0) this.$emit('change', val)
    }
  },
  method: {
    /**
     * calculate master production schedule
     * @param {number[][]} matrix mps data matrix
     * @param {number[]} TFL timeFenceList an array for mps time fence
     * @returns an matrix which is calculated correctly
     */
    calMPS (matrix, TFL) {
      for (let r = 3; r < matrix.length; r++) {
        switch (r) {
          case 3:// GR
            calGR(matrix[0], matrix[1], TFL)
            break
          case 4:
        }
      }
      return null
    }
  }
}
</script>

<style scoped>
.table-operation {
  margin-bottom: 20px;
}
</style>
