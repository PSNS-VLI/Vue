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
        title="PA26-50 的CRP"
        :hasSide="false"
        :isEdit="isEdit"
        :frozenList="frozenList"
        :mainColumns="mainColumns"
        v-model="mainData"/>
    </div>
  </a-card>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

import ErpTable from '../components/ErpTable.vue'

export default {
  components: {
    ErpTable
  },
  props: {
    mainColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    frozenList: {
      type: Array,
      default: () => ['name']
    }
  },
  data () {
    return {
      mainData: [],
      isEdit: false
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler (val) {
        this.mainData = cloneDeep(val)
      }
    }
  },
  method: {
  }
}
</script>

<style scoped>
@import url('../style/common.css');
</style>
