import Queue from './datastructure/Queue'
import cloneDeep from 'lodash.clonedeep'

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
  array = cloneDeep(array)
  array = array.map(item => cleaner(item))
  const tree = array.filter(
    item => item[parentKey] === ancestorTag).map(
      item => Object.assign({}, item, { children: [] }))
  tree.forEach(item => findChild(item, item[currentKey]))
  function findChild (treeNode, parentTag) {
    array.forEach(item => {
      if (!item.searched && item[parentKey] === parentTag) {
        treeNode.children.push(item)
        item.searched = true
        item.children = []
        findChild(item, item[currentKey])
      }
    })
  }
  levelOrder(tree, null, item => { delete item.searched })
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
export function whoHasChild (data, childKey, isTree, currentKey, parentKey) {
  let res
  isTree
    ? res = treeToList(data)
    : res = treeToList(listToTree(data, currentKey, parentKey))
  res = res.filter(item => item[childKey] && item[childKey].length > 0)
  return res
}

/** erp */

/**
 * calculate gross requirement
 * @param {number[]} PVList predicted volume array
 * @param {number[]} OVList order volume array
 * @param {number[]} TFL time fence array
 * @param {number} [CT=1] current time zone index
 * @returns {number[]} an array of gross requirment
 */
export function alGR (PVList, OVList, TFL, CT = 1) {
  const GRList = initArrayZero(PVList.length)
  for (CT; CT < PVList.length; CT++) {
    let v = 0
    CT <= TFL[0]
    ? v = PVList[CT]
    : CT <= TFL[2]
      ? v = Math.max(PVList[CT], OVList[CT])
      : v = OVList[CT]
    GRList[CT] = v
  }
  return GRList
}

/**
 * calculate initial projected available
 * @param {number[]} IPABList previous zone initial projected available
 * @param {number[]} STARList schedule the amount received
 * @param {number[]} GRList gross requirement
 * @param {number} CT current time zone index
 * @returns {number[]} an array of initial projected available balance
 */
export function calInitPAB (IPABList, STARList, GRList, CT = 1) {
  const PABList = initArrayZero(IPABList.length)
  for (CT = 2; CT < STARList.length; CT++) {
    PABList[CT] = IPABList[CT - 1] + STARList[CT] - GRList[CT]
  }
  return PABList
}

/**
 * calculate net requirement
 * @param {number[]} IPABList initial projected available
 * @param {number} SSA safety stock amount
 * @param {number} [CT=1] current time zone index
 * @returns {number[]} an array of net requirement
 */
export function calNR (IPABList, SSA, CT = 1) {
  const NRList = initArrayZero(IPABList.length)
  for (CT; CT < IPABList.length; CT++) {
    let v = 0
    IPABList[CT] >= SSA ? v = 0 : v = (SSA - IPABList[CT])
    NRList[CT] = v
  }
  return NRList
}

/**
 * calculate planned order receipts
 * @param {number[]} NRList net requirement
 * @param {number} PB production batch
 * @param {number} [CT=1] current time zone index
 */
export function calPORece (NRList, PB, CT = 1) {
  const POReceList = initArrayZero(NRList.length)
  for (CT; CT < NRList.length; CT++) {
    let n = 0
    const NR = NRList[CT]
    while (true) {
      if (n * PB >= NR && NR > (n - 1) * PB) break
      n++
    }
    POReceList[CT] = n * PB
  }
}

/**
 * calculate projected available balance
 * @param {number[]} PABList previous projected availabled balance
 * @param {number[]} STARList schedule the amount received
 * @param {number[]} GRList gross requirement
 * @param {number[]} PORList planned order receipts
 * @param {number} [CT=1] current time zone index
 */
export function alPAB (PABList, STARList, GRList, PORList, CT = 1) {
  const _PABlist = initArrayZero(PABList.length)
  for (CT; CT < PABList.length; CT++) {
    _PABlist[CT] = PABList[CT - 1] + STARList[CT] - GRList[CT] + PORList[CT]
  }
  return _PABlist
}

/**
 * calculate planed order releases
 * @param {number[]} POReceList planed order receipts array
 * @param {number} LT lead time
 * @param {number} [CT=1] current time zone index
 * @returns {number[]} TODO
 */
export function alPORele (POReceList, LT, CT = 1) {
  const POReleList = initArrayZero(POReceList.length)
  while (CT < POReceList.length) {
    if (LT + CT < POReceList.length) POReleList[CT] = POReceList[LT + CT]
    CT++
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
    let ATP = POReceList[CT] + STARList[CT]
    for (i; i < OVList.length; i++) if (POReceList.length > 0) break
    for (i; i > CT + 1; i--) ATP -= OVList[i - 1]
    ATPList[CT] = ATP
  }
  return ATPList
}

export function initArrayZero (length) {
  return Array(length).map(() => 0)
}
