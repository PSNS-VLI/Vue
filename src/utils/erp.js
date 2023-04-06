import Queue from './datastructure/Queue'

/**
 * Converts a list structure to a tree sctructure
 * @param {Object[]} array
 * @param {string} currentKey
 * @param {string} parentKey
 * @param {string} ancestorTag
 * @param {function} cleaner
 * @returns {Object[]}
 */
export function listToTree (array, currentKey, parentKey, cleaner = (item) => ({ ...item }), ancestorTag = '-') {
  array = array.map(item => cleaner(item))
  const tree = []
  const index = []
  for (let i = 0; i < array.length; i++) {
    if (array[i][parentKey] === ancestorTag) {
      tree.push(Object.assign(array[i], { children: [] }))
      index.push(i)
    }
  }
  for (const i of index) array.splice(i, 1)

  for (let i = 0; i < tree.length; i++) {
    findChild(tree[i], tree[i][currentKey])
  }

  function findChild (treeNode, parentTag) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][parentKey] === parentTag && !array[i].searched) {
        array[i].searched = true
        array[i].children = []
        findChild(array[i], array[i][currentKey])
        treeNode.children.push(array[i])
      }
    }
    return false
  }
  levelOrder(tree, null, (item) => { delete item.searched })
  return tree
}

/**
 * Converts a tree structure to a list structure
 * @param {Object[]} tree
 * @returns {Object[]}
 */
export function treeToList (tree, cleaner = (item) => ({ ...item })) {
  const newTree = JSON.parse(JSON.stringify(tree))
  const dataList = []
  levelOrder(newTree, null, node => {
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
  callBack = callBack || (() => {})
  const queue = new Queue()

  for (const child of tree) {
    queue.enqueue(child)
  }

  while (!queue.isEmpty()) {
    const node = queue.dequeue()
    callBack(node)
    if (node[childKey] && node[childKey].length > 0) {
      for (const child of node[childKey]) {
        queue.enqueue(child)
      }
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
