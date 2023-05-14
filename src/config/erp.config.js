const zoneList = ['需求时区', '计划时区', '预测时区']
const workCenterCapacityColumns = [{
  type: 'text',
  title: '工作中心编码',
  dataIndex: 'name'
}, {
  title: '每天工作小时',
  dataIndex: 'H0'
}, {
  title: '利用率',
  dataIndex: 'Z'
}, {
  title: '效率',
  dataIndex: 'P'
}, {
  title: '可用能力（小时/天）',
  dataIndex: 'H'
}]
const workCenterTimeColumns = [{
  type: 'text',
  title: '工作中心编码',
  dataIndex: 'name'
}, {
  title: '等待时间',
  dataIndex: 'H5'
}, {
  title: '移动时间',
  dataIndex: 'H6'
}, {
  title: '排队时间',
  dataIndex: 'H7'
}]
const processRouteColumns = [{
  type: 'text',
  title: '物料编码',
  dataIndex: 'name'
}, {
  type: 'text',
  title: '工序编码',
  dataIndex: 'pCode'
}, {
  type: 'text',
  title: '工作中心编码',
  dataIndex: 'wcCode'
}, {
  title: '单件加工时间',
  dataIndex: 'spTime'
}, {
  title: '准备时间',
  dataIndex: 'pTime'
}]
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
  '计划投入量',
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
  workCenterCapacityColumns,
  workCenterTimeColumns,
  processRouteColumns,
  mpsTableColumns,
  mrpTableColumns,
  crpTableColumns,
  mpsTableData,
  mrpTableData
}
