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
  calGR
} from '@/utils/erp.js'

import ErpTable from '../components/ErpTable.vue'

const mainColumns = [{
  title: '时区',
  children: [{
    title: '时段',
    dataIndex: 'name'
  }]
}, {
  title: '当期',
  dataIndex: 'current_zone'
}, {
  title: '需求时区',
  children: [{
    title: '1',
    dataIndex: 'zone_1'
  }, {
    title: '2',
    dataIndex: 'zone_2'
  }]
}, {
  title: '计划时区',
  children: [{
    title: '3',
    dataIndex: 'zone_3'
  }, {
    title: '4',
    dataIndex: 'zone_4'
  }, {
    title: '5',
    dataIndex: 'zone_5'
  }, {
    title: '6',
    dataIndex: 'zone_6'
  }]
}, {
  title: '预测时区',
  children: [{
    title: '7',
    dataIndex: 'zone_7'
  }, {
    title: '8',
    dataIndex: 'zone_8'
  }, {
    title: '9',
    dataIndex: 'zone_9'
  }, {
    title: '10',
    dataIndex: 'zone_10'
  }]
}]
const sideColumns = [{
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
const mainData = [{
  key: '1',
  editable: true,
  name: '预测量',
  current_zone: '',
  zone_1: '1',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '2',
  name: '订单量',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '3',
  name: '计划接收量',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '4',
  name: '毛需求量',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '5',
  name: 'PAB初值',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '6',
  name: '净需求量',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '7',
  name: '计划产出量',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '8',
  name: 'PAB',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '9',
  name: '计划投入',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}, {
  key: '10',
  name: 'ATP',
  current_zone: '',
  zone_1: '',
  zone_2: '',
  zone_3: '',
  zone_4: '',
  zone_5: '',
  zone_6: '',
  zone_7: '',
  zone_8: '',
  zone_9: '',
  zone_10: ''
}]
export default {
  components: {
    ErpTable
  },
  data () {
    this.frozenList = ['name']
    return {
      mainColumns,
      sideColumns,
      mainData,
      isEdit: false
    }
  },
  created () {
  },
  watch: {
    mainData (n, o) {
      console.log('旧', o)
      console.log(n)
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
