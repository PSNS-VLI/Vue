<template>
  <div class="table-wrapper">
    <a-table
      bordered
      :columns="sideColumns"
      :locale="locale">
      <div slot="title" class="table-title">
        PA26-50 的MPS
      </div>
    </a-table>

    <a-table
      bordered
      :columns="mainColumns"
      :data-source="mainData"
      :pagination="false">
    </a-table>
  </div>
</template>

<script>
import {
  calGR
} from '@/utils/erp.js'

import EmptyNone from '../components/EmptyNone.vue'

const mainColumns = [{
  title: '时区',
  children: [{
    title: '时段',
    dataIndex: 'title'
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
  title: '预测量',
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
  key: '2',
  title: '订单量',
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
  title: '计划接收量',
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
  title: '毛需求量',
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
  title: 'PAB初值',
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
  title: '净需求量',
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
  title: '计划产出量',
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
  title: 'PAB',
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
  title: '计划投入',
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
  title: 'ATP',
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
  data () {
    this.locale = { emptyText: <EmptyNone /> }
    return {
      mainColumns,
      sideColumns,
      mainData
    }
  },
  created () {
    console.log(mainColumns)
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

<style>
.table-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.ant-table-wrapper:first-child .ant-table-placeholder {
  padding: unset;
}

.ant-table-wrapper:first-child .ant-table-thead > tr > th {
  border-bottom: none;
}
</style>
