import Queue from './datastructure/Queue'

/**
 *
 * @param {Array} array
 * @param {String} currentKey
 * @param {String} parentKey
 * @param {String} ancestorTag
 * @param {Function} cleaner
 * @returns Array
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
 *
 * @param {Array} tree
 * @returns Array
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
 *
 * @param {String} key
 * @param {Array} tree
 * @returns String<parentKey>
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
 *
 * @param {Array} tree
 * @param {String} childKey
 * @param {Function} callBack
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
 *
 * @param {Array} data
 * @param {String} keyName
 */
export function generateKey (data, keyName) {
  data.map((item, index) => {
    item.key = item[keyName] || index
  })
}

export function whoHasChild (data, currentKey, parentKey) {
  return treeToList(listToTree(data, currentKey, parentKey))
    .filter(item => item.children && item.children.length > 0)
}
