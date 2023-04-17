<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <a-table bordered :columns="sideColumns" :locale="locale">
        <div slot="title" class="table-title">
          zxca-f 的 MRP
        </div>
      </a-table>

      <a-table bordered :columns="mainColumns" :data-source="mainData" :pagination="false">
      </a-table>
    </div>
  </div>
</template>

<script>
import EmptyNone from '../components/EmptyNone.vue'

// eslint-disable-next-line
const mainColumns = [{
  title: '时段',
  dataIndex: 'title'
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
  title: '{}计划投入量',
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
  key: '3',
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
  key: '4',
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
  key: '5',
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
  key: '6',
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
  key: '7',
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
  title: '计划投入量',
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
  method: {
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

.ant-table-wrapper:first-child .ant-table-thead>tr>th {
  border-bottom: none;
}
</style>
