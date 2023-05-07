<template>
  <div>
    <!-- table menu -->
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
          <a-col :md="6" :sm="24">
            <a-form-item label="全表搜索">
              <a-input-search placeholder="Search" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- main content -->
    <a-table
      :loading="loading"
      :pagination="false"
      :columns="mainColumns"
      :data-source="tData"
    >
      <template slot="title">
      </template>
      <template
        v-for="col in mainColumns"
        :slot="col.scopedSlots.customRender"
        slot-scope="text, record"
      >
        <template v-if="col.scopedSlots.customRender !== operKey">
          <div :key="col.scopedSlots.customRender">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col.scopedSlots.customRender)"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else>
          <div :key="col.scopedSlots.customRender" class="editable-row-operations">
            <span v-if="record.editable">
              <a-popconfirm title="确认更改?" @confirm="() => handleSave(record.key)">
                <a>保存</a>
              </a-popconfirm>
              <a @click="() => handleCancel(record.key)"> 取消</a>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => handleEdit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
// eslint-disable-next-line
import { getRoleList } from '@/api/manage'
import { whoHasChild, treeToList, levelOrder } from '@/utils/erp'

import { STable, Ellipsis } from '@/components'

export default {
  name: 'BomSummarizedExplosion',
  components: {
    STable,
    Ellipsis
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
    this.operKey = 'operation'
    this.cacheData = []
    return {
      // show param
      showParam: {
        explosionRule: 0,
        defaultRule: 0,
        choosedElement: 0,
        defaultChoose: 0,
        nameKey: '子项名称'
      },
      tData: [],
      // table loading
      loading: false,
      editingKey: ''
    }
  },
  computed: {
    mainColumns () {
      const columns = cloneDeep(this.columns)
      columns.push({
        title: '操作',
        scopedSlots: { customRender: this.operKey }
      })
      return columns.map(item => ({
        ...item,
        width: `${100 / columns.length}%`
      }))
    },
    showElements () {
      return whoHasChild(this.bomData, 'children', true, '子项编码', '父项编码')
    }
  },
  created () {
    getRoleList({ t: new Date() })
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
    handleChange (value, key, column) {
      const newData = cloneDeep(this.tData)
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.tData = newData
      }
    },
    handleEdit (key) {
      const newData = cloneDeep(this.tData)
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.tData = newData
      }
    },
    handleSave (key) {
      const newData = cloneDeep(this.tData)
      const target = newData.find(item => key === item.key)
      if (target) {
        delete target.editable
        this.$emit('change', newData)
      }
      this.editingKey = ''
    },
    handleCancel (key) {
      const newData = cloneDeep(this.tData)
      const target = newData.find(item => key === item.key)
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key))
        delete target.editable
        this.tData = newData
      }
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
