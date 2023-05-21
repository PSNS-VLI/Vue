<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="展开方式">
              <a-select
                @change="handleRuleChange"
                v-model="showParam.explosionRule"
                :placeholder="showRules[showParam.explosionRule].name"
                :default-value="showParam.defaultRule">
                <template v-for="s in showRules">
                  <a-select-option :key="s.value" :value="s.value">{{ s.name }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24" v-if="showParam.explosionRule !== 0">
            <a-form-item label="选择元素">
              <a-select
                @change="handleChooseChange"
                v-model="showParam.choosedElement"
                :placeholder="showElements[showParam.choosedElement][showParam.nameKey]"
                :default-value="showParam.defaultChoose">
                <template v-for="(e, i) in showElements">
                  <a-select-option :key="e.key" :value="i">{{ e[showParam.nameKey] }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <ErpTable
      @change="$emit('change', $event)"
      operation="edit, add, delete, search"
      :hasSide="false"
      :frozenList="frozenList"
      :mainColumns="columns"
      :mainData="tData"/>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import { whoHasChild, treeToList, levelOrder } from '@/utils/erp'

import { STable, Ellipsis } from '@/components'
import ErpTable from '../components/ErpTable.vue'

export default {
  name: 'BomSummarizedExplosion',
  components: {
    STable,
    Ellipsis,
    ErpTable
  },
  props: {
    // bom data present and operation
    bomData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    explosionParam: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    this.showRules = [{
      key: 'identedExplosion',
      value: 0,
      name: '多阶展开'
    }, {
      key: 'singleLevelExplosion',
      value: 1,
      name: '单阶展开'
    }, {
      key: 'finalExplosion',
      value: 2,
      name: '尾阶展开'
    }]
    this.frozenList = ['hierarchy']
    return {
      // show param
      showParam: {
        explosionRule: 0,
        defaultRule: 0,
        choosedElement: 0,
        defaultChoose: 0,
        nameKey: 'childName'
      },
      tData: []
    }
  },
  computed: {
    showElements () {
      return whoHasChild(this.bomData, 'children', true, 'childKey', 'parentKey')
    }
  },
  watch: {
    bomData: {
      immediate: true,
      handler (val) {
        this.cacheData = cloneDeep(val)
        this.renderingTable()
      }
    },
    explosionParam (val) {
      Object.assign(this.showParam, val)
    },
    'showParam.choosedElement' () {
      this.renderingTable()
    },
    'showParam.explosionRule' () {
      this.renderingTable()
    }
  },
  methods: {
    handleRuleChange (e) {
      this.$emit('showRuleChange')
    },
    handleChooseChange (e) {
      this.$emit('showChooseChange')
    },
    renderingTable () {
     this.tData = (() => {
        switch (this.showParam.explosionRule) {
          case 0:
              return cloneDeep(this.bomData)
          case 1:
            return treeToList(
              this.showElements[this.showParam.choosedElement].children
              ).map(item => {
                delete item.children
                return item
              })
          case 2:
            const _list = []
            levelOrder(
              this.showElements[this.showParam.choosedElement].children,
              null,
              node => {
              if (node.children && node.children.length === 0) _list.push(node)
            })
            return _list.map(item => {
              delete item.children
              return item
            })
          default:
            return []
        }
      })()
    }
  }
}
</script>
