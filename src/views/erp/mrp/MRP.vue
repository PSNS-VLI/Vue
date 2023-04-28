<template>
  <div class="table-wrapper">
    <ErpTable
      title="PA26-50 的MPS"
      :mainColumns="mainColumns"
      :sideColumns="sideColumns"
      v-model="mainData"/>
  </div>
</template>

<script>
import ErpTable from '../components/ErpTable.vue'

// eslint-disable-next-line
const mainColumns = [{
  title: '时段',
  dataIndex: 'name'
}, {
  title: '当期',
  dataIndex: 'current_zone'
}, {
  title: '1',
  dataIndex: 'zone_1'
}, {
  title: '2',
  dataIndex: 'zone_2'
}, {
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
}, {
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
// eslint-disable-next-line
const sideColumns = [{
  title: '计划接收量'
}, {
  title: '80'
}, {
  title: '提前期'
}, {
  title: '1'
}, {
  title: '底层码'
}, {
  title: '1'
}, {
  title: '当期PAB'
}, {
  title: '20'
}, {
  title: '安全库存'
}, {
  title: '20'
}, {
  title: '批量'
}, {
  title: '100'
}]
const mainData = [{
  key: '1',
  name: '{}计划投入量',
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
  key: '3',
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
  key: '4',
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
  key: '5',
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
  key: '6',
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
  key: '7',
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
  name: '计划投入量',
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
    return {
      mainColumns,
      sideColumns,
      mainData
    }
  },
  method: {
  }
}
</script>

<style>
</style>
