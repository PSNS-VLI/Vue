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
  return tree
}

/**
 *
 * @param {Array} tree
 * @returns Array
 */
export function treeToList (tree) {
  const dataList = []
  DFS(tree)

  function DFS (tree) {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      const key = node.key
      dataList.push({ key, title: node.title })
      if (node.children) {
        DFS(node.children)
      }
    }
  }
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
