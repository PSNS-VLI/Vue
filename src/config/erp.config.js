export const bomColumns = [{
  title: '阶层',
  dataIndex: 'hierarchy'
}, {
  title: '父项编码',
  dataIndex: 'parentKey',
  type: 'text'
}, {
  title: '子项编码',
  dataIndex: 'childKey',
  type: 'text'
}, {
  title: '子项名称',
  dataIndex: 'childName',
  type: 'text'
}, {
  title: '计量单位',
  dataIndex: 'measuringUnit',
  type: 'text'
}, {
  title: '单位用量',
  dataIndex: 'quantityPer'
}]
export const zoneList = ['需求时区', '计划时区', '预测时区']
export const workCenterCapacityColumns = [{
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
export const workCenterTimeColumns = [{
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
export const processRouteColumns = [{
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
export const mpsTableColumns = [{
  title: '时区',
  children: [{
    title: '时段',
    dataIndex: 'name'
  }]
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
export const mrpTableColumns = [{
  title: '时段',
  dataIndex: 'name'
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
export const crpTableColumns = [{
  title: '物料',
  dataIndex: 'name'
}, {
  title: '工作中心',
  dataIndex: 'department_center'
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
export const mpsTableData = [
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
export const mrpTableData = [
  '{parent}计划投入量',
  '计划接收量',
  '毛需求量',
  'PAB初值',
  '净需求量',
  '计划产出量',
  'PAB',
  '计划投入量'
]
