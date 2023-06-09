import Queue from './datastructure/Queue'
import cloneDeep from 'lodash.clonedeep'

import {
  zoneList,
  mpsTableColumns,
  mrpTableColumns,
  crpTableColumns,
  mpsTableData,
  mrpTableData
} from '@/config/erp.config'

/**
 * Converts a list structure to a tree sctructure
 * @param {Object[]} array
 * @param {string} currentKey
 * @param {string} parentKey
 * @param {string} ancestorTag
 * @param {function} cleaner
 * @returns {Object[]}
 */
export function listToTree (array, currentKey, parentKey, cleaner, ancestorTag) {
  cleaner = cleaner || (item => item)
  ancestorTag = ancestorTag || '-'
  if (array.length === 0) return []
  array = cloneDeep(array)
  const tree = array.filter(
    item => item[parentKey] === ancestorTag).map(
      item => Object.assign({}, cleaner(item), { children: [] }))
  tree.forEach(item => findChild(item, item[currentKey]))
  function findChild (treeNode, parentTag) {
    array.forEach(item => {
      if (item[parentKey] === parentTag) {
        treeNode.children.push(cleaner(item, treeNode, parentTag))
        item.children = []
        findChild(item, item[currentKey])
      }
    })
    if (treeNode.children.length === 0) delete treeNode.children
  }
  console.log(tree)
  return tree
}

/**
 * Converts a tree structure to a list structure
 * @param {Object[]} tree
 * @returns {Object[]}
 */
export function treeToList (tree, cleaner) {
  cleaner = cleaner || (item => item)
  tree = cloneDeep(tree)
  const dataList = []
  levelOrder(tree, null, node => {
    dataList.push(cleaner(node))
  })
  return dataList
}

/**
 * Find the key value of the parent element
 * @param {string} key
 * @param {Object[]} tree
 * @returns {string}
 */
export function getParentKey (key, tree) {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

/**
 * Sequence traversal
 * @param {Object[]} tree
 * @param {string} childKey
 * @param {function} callBack
 */
export function levelOrder (tree, childKey, callBack) {
  childKey = childKey || 'children'
  callBack = callBack || (item => {})
  const queue = new Queue()

  tree.forEach(item => queue.enqueue(item))

  while (!queue.isEmpty()) {
    const node = queue.dequeue()
    callBack(node)
    if (node[childKey] && node[childKey].length > 0) {
      node[childKey].forEach(item => queue.enqueue(item))
    }
  }
}

/**
 * Add an attribuate named key for object
 * @param {Object[]} data
 * @param {string} keyName
 */
export function generateKey (data, keyName) {
  data.map((item, index) => {
    item.key = item[keyName] || index
  })
}

/**
 * Filter out elements in the tree that have child elements
 * @param {Object[]} data
 * @param {string} childKey
 * @param {boolean} isTree
 * @param {string} currentKey
 * @param {string} parentKey
 * @returns
 */
export function whoHasChild (data, childKey, notTree, currentKey, parentKey) {
  childKey = childKey || 'children'
  let res
  notTree
    ? res = treeToList(listToTree(data, currentKey, parentKey))
    : res = treeToList(data)
  res = res.filter(item => item[childKey] && item[childKey].length > 0)
  return res
}

/** erp */

/**
 * generate main columns template for erp table
 * @param {string} model tag of which module to be processed
 * @param {number[]} timeFenceArray  time fence array
 * @returns {Object[]}
 */
export function getTableColumnsTem (model, timeFenceArray) {
  let columns
  let i = 0
  switch (model) {
    case 'mps':
      columns = mpsTableColumns.concat(
        timeFenceArray.slice(0, zoneList.length).map(
          (fence, index) => ({
            title: zoneList[index],
            children: initArrayZero(fence).map(_ => ({
              title: (++i).toString(),
              dataIndex: `zone_${i}`
            }))
          })
        )
      )
      break
    case 'mrp':
      columns = genCol(mrpTableColumns)
      break
    case 'crp':
      columns = genCol(crpTableColumns)
      break
    default:
      columns = []
  }
  function genCol (col) {
    return col.concat(
      initArrayZero(
        timeFenceArray.reduce((pre, cur) => pre + cur)
      ).map((_, i) => ({
        title: (++i).toString(),
        dataIndex: `zone_${i}`
      }))
    )
  }
  return columns
}

/**
 * generate main data template for erp table
 * @param {string} model tag of which module to be processed
 * @param {number[]} timeFenceArray  time fence array
 * @param {Object} params extra parameters
 * @returns {Object[]}
 */
export function getTableDataTem (model, timeFenceArray, params) {
  params = params || {}
  let data
  let i = 0
  switch (model) {
    case 'mps':
      data = mpsTableData
      break
    case 'mrp':
      data = mrpTableData
      break
    case 'crp':
      data = params.tableData || []
      break
    default:
      data = []
  }
  const zoneKey = initArrayZero(
    timeFenceArray.reduce((pre, cur) => pre + cur)
    ).reduce(pre => {
      ++i
      pre[`zone_${i}`] = 0
      return pre
    }, {})
  data = data.map((name, index) => Object.assign({
    key: index.toString(),
    editable: true,
    name: params.field && name.match(/\{(\w*)\}/)
      ? name.replace(/^\{(\w*)\}/, params.field[name.match(/\{(\w*)\}/)[1]])
      : name
  }, params.keyFn && typeof params.keyFn === 'function'
  ? params.keyFn(name, index)
  : {}, { current_zone: 0 }, zoneKey))
  console.log(data)
  return data
}

export function extractTableData (tableData) {
  return tableData.reduce((pre, cur) => {
    pre.push(Object.values(cur).slice(3))
    return pre
  }, [])
}

export function inflateTableData (tableData, matrix) {
  return tableData.reduce((pre, cur, index) => {
    pre.push(Object.assign(
      {},
      cur,
      matrix[index].reduce((pre, cur, index) => {
        pre[index === 0 ? 'current_zone' : `zone_${index}`] = cur
        return pre
      }, {})
      ))
      return pre
  }, [])
}

/**
 * calculate master production schedule
 * @param {number[][]} matrix mps data matrix
 * @param {number[]} TFL timeFenceList an array for mps time fence
 * @param {number} SSA safety stock amount
 * @param {number} PB production batch
 * @param {number} LT lead time
 * @returns an matrix which is calculated correctly
 */
export function calMPS (matrix, TFL, SSA, PB, LT) {
  matrix[3] = calGR(matrix[0], matrix[1], TFL)
  for (let CT = 1; CT < matrix[4].length; CT++) {
    const PAB = CT === 1 ? matrix[4][0] : matrix[7][CT - 1]
    matrix[4][CT] = calInitPAB(PAB, matrix[2][CT], matrix[3][CT])
    matrix[5][CT] = calNR(matrix[4][CT], SSA)
    matrix[6][CT] = calPORece(matrix[5][CT], PB)
    matrix[7][CT] = calPAB(PAB, matrix[2][CT], matrix[3][CT], matrix[6][CT])
  }
  matrix[8] = calPORele(matrix[6], LT)
  matrix[9] = calATP(matrix[6], matrix[2], matrix[1])
  return matrix
}

export function calMRP (matrix, SSA, PB, LT) {
  matrix[2] = calGRforMRP(matrix[0])
  for (let CT = 1; CT < matrix[3].length; CT++) {
    const PAB = CT === 1 ? matrix[3][0] : matrix[5][CT - 1]
    matrix[3][CT] = calInitPAB(PAB, matrix[1][CT], matrix[2][CT])
    matrix[4][CT] = calNR(matrix[3][CT], SSA)
    matrix[5][CT] = calPORece(matrix[4][CT], PB)
    matrix[6][CT] = calPAB(PAB, matrix[1][CT], matrix[2][CT], matrix[5][CT])
  }
  matrix[7] = calPORele(matrix[5], LT)
  return matrix
}

/**
 * calculate gross requirement
 * @param {number[]} PVList predicted volume array
 * @param {number[]} OVList order volume array
 * @param {number[]} TFL time fence array
 * @param {number} [CT=1] current time zone index
 * @returns {number[]} an array of gross requirment
 */
export function calGR (PVList, OVList, TFL, CT = 1) {
  const GRList = initArrayZero(PVList.length)
  for (CT; CT < PVList.length; CT++) {
    GRList[CT] = CT <= TFL[0]
    ? OVList[CT]
    : CT <= TFL[1] + TFL[0]
      ? Math.max(PVList[CT], OVList[CT])
      : PVList[CT]
  }
  return GRList
}

export function calGRforMRP (PPORele) {
  return cloneDeep(PPORele)
}

/**
 * calculate initial projected available
 * @param {number} PAB projected available list
 * @param {number} STAR schedule the amount received
 * @param {number} GR gross requirement
 * @returns {number} initial projected available balance
 */
export function calInitPAB (PAB, STAR, GR) {
    return PAB + STAR - GR
}

/**
 * calculate net requirement
 * @param {number} IPABList initial projected available
 * @param {number} SSA safety stock amount
 * @returns {number} net requirement
 */
export function calNR (IPAB, SSA) {
    return IPAB >= SSA ? 0 : SSA - IPAB
}

/**
 * calculate planned order receipts
 * @param {number} NR net requirement
 * @param {number} PB production batch
 */
export function calPORece (NR, PB) {
    return NR > 0 ? Math.ceil(NR / PB) * PB : 0
}

/**
 * calculate projected available balance
 * @param {number} PAB previous projected availabled balance
 * @param {number} STAR schedule the amount received
 * @param {number} GR gross requirement
 * @param {number} PORece planned order receipts
 */
export function calPAB (PAB, STAR, GR, PORece) {
    return PAB + STAR - GR + PORece
}

/**
 * calculate planed order releases
 * @param {number[]} POReceList planed order receipts array
 * @param {number} LT lead time
 * @param {number} [CT=1] current time zone index
 * @returns {number[]} TODO
 */
export function calPORele (POReceList, LT, CT = 1) {
  const POReleList = initArrayZero(POReceList.length)
  for (CT; CT < POReceList.length; CT++) {
    POReleList[CT] = LT + CT < POReceList.length ? POReceList[LT + CT] : 0
  }
  return POReleList
}

/**
 * calculate available to promise
 * @param {number[]} POReceList planed order receipts array
 * @param {number[]} STARList schedule the amount received array
 * @param {number[]} OVList order volume array
 * @param {number} CT current time zone index
 * @returns an array of available to promise
 */
export function calATP (POReceList, STARList, OVList, CT = 1) {
  const ATPList = initArrayZero(POReceList.length)
  for (CT; CT < POReceList.length; CT++) {
    let i = CT
    let ATP = POReceList[CT] + STARList[CT] - OVList[CT]
    for (++i; i < OVList.length; i++) {
      if (POReceList[i] > 0) break
      ATP -= OVList[i]
    }
    ATPList[CT] = ATP
  }
  return ATPList
}

// MPS RCCP

/**
 * calculate single piece preparation time
 * @param {number} PPT production preparation time
 * @param {number} ABS average batch size
 * @returns {number}
 */
export function calSPPT (PPT, ABS) {
  return PPT / ABS
}

export function initArrayZero (length) {
  return Array(length).fill(0)
}
