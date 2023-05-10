const zoneList = ['需求时区', '计划时区', '预测时区']
const mpsTableColumns = [{
  title: '时区',
  children: [{
    title: '时段',
    dataIndex: 'name'
  }]
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
const mrpTableColumns = [{
  title: '时段',
  dataIndex: 'name'
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
const crpTableColumns = [{
  title: '物料',
  dataIndex: 'name'
}, {
  title: '工作中心',
  dataIndex: 'department_center'
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
const mpsTableData = [
  '预测量',
  '订单量',
  '计划接收量',
  '毛需求量',
  'PAB初值',
  '净需求量',
  '计划产出量',
  'PAB',
  '计划投入',
  'ATP'
]
const mrpTableData = [
  '{parent}计划投入量',
  '计划接收量',
  '毛需求量',
  'PAB初值',
  '净需求量',
  '计划产出量',
  'PAB',
  '计划投入量'
]

export {
  zoneList,
  mpsTableColumns,
  mrpTableColumns,
  crpTableColumns,
  mpsTableData,
  mrpTableData
}
