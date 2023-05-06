const mpsMainColumns = [{
  title: '时区',
  children: [{
    title: '时段',
    dataIndex: 'name'
  }]
}, {
  title: '当期',
  dataIndex: 'current_zone'
}]
const zoneList = ['需求时区', '计划时区', '预测时区']
const mpsMainData = [
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

export default {
  mpsMainColumns,
  zoneList,
  mpsMainData
}
