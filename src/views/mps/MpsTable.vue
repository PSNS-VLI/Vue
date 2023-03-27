<template>
  <div>
    <a-table
      bordered
      :columns="sideColumns"
      :data="sideData"
      :locale="locale">
      <div slot="title">
        ok
      </div>
    </a-table>

    <a-table
      bordered
      :columns="mainColumns"
      :data-source="mainData">
    </a-table>
  </div>
</template>

<script>
import EmptyNone from './components/EmptyNone.vue'
// eslint-disable-next-line
const mainColumns = [{
  title: 'zxca-f 的MPS',
  children: [{
    title: '时区',
    children: [{
      title: '时段',
      dataIndex: 'time_zone'
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
}]
// eslint-disable-next-line
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
export default {
  data () {
    return {
      mainColumns,
      sideColumns,
      mainData: [],
      sideData: [],
      locale: {
        emptyText: <EmptyNone />
      }
    }
  }
}
</script>

<style>
</style>
