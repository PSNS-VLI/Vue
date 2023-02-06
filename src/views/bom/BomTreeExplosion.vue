<template>
  <div>
    <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
    <a-tree
      draggable
      :tree-data="gData"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      @dragenter="onDragEnter"
      @drop="onDrop"
      @expand="onExpand"
    >
      <template #title="{ key: treeKey, title }">
        <a-dropdown :trigger="dropdownTriggerMode">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
          <template #overlay>
            <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
              <a-menu-item key="1">单阶展开</a-menu-item>
              <a-menu-item key="2">尾阶展开</a-menu-item>
              <a-menu-item key="3">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script>
import { listToTree, treeToList, getParentKey } from '@/utils/bom'

export default {
  name: 'BomTreeExplosion',
  props: {
    // bom data present and operation
    cacheData: {
      type: Array,
      default: () => []
    },
    bomData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    gData: {
      get: function () {
        return listToTree(this.bomData, '子项编码', '父项编码', (item) => ({
          ...item,
          key: `${item['子项编码']}`,
          title: `${item['子项编码']}/${item['子项名称']}`
        }))
      },
      set: function() {
        
      }
    },
    dataList: function () {
      return treeToList(this.gData)
    }
  },
  data () {
    // Dropdown component api
    // control the trigger mode. Array<click|hover|contextmenu>
    this.dropdownTriggerMode = ['contextmenu']
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true
    }
  },
  methods: {
    onDragEnter (info) {
      console.log(info)
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop (info) {
      console.log(info)
      const dropKey = info.node.eventKey
      const dragKey = info.dragNode.eventKey
      const dropPos = info.node.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      const data = [...this.gData]

      // Find dragObject
      let dragObj
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || []
          // where to insert
          item.children.push(dragObj)
        })
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || []
          // where to insert
          item.children.unshift(dragObj)
        })
      } else {
        let ar
        let i
        loop(data, dropKey, (item, index, arr) => {
          ar = arr
          i = index
        })
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj)
        } else {
          ar.splice(i + 1, 0, dragObj)
        }
      }
      this.gData = data
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.gData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    }
  }
}
</script>
