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
      :columns="columns"
      :data-source="tData"
    >
      <template slot="title">
      </template>
      <template
        v-for="col in columns"
        :slot="col.scopedSlots.customRender"
        slot-scope="text, record"
      >
        <template v-if="col.scopedSlots.customRender !== 'operation'">
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
import { STable, Ellipsis } from '@/components'
// eslint-disable-next-line
import { getRoleList, getServiceList } from '@/api/manage'
import { whoHasChild, treeToList, levelOrder } from '@/utils/bom'

export default {
  name: 'BomSummarizedExplosion',
  components: {
    STable,
    Ellipsis
  },
  props: {
    // bom data present and operation
    cacheData: {
      type: Array,
      default: () => []
    },
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
  computed: {
    showElements () {
      return this.showParam.explosionRule !== 0
        ? this.whoHasChild()
        : []
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
    return {
      // show param
      showParam: {
        explosionRule: 0,
        defaultRule: 0,
        defaultChoose: 0,
        choosedElement: 0,
        nameKey: '子项名称'
      },
      tData: [],
      // table loading
      loading: false,
      editingKey: ''
    }
  },
  watch: {
    bomData () {
      this.renderingTable()
    },
    explosionParam (val) {
      Object.assign(this.showParam, val)
    },
    [`showParam.choosedElement`] () {
      this.renderingTable()
    },
    [`showParam.explosionRule`] () {
      this.renderingTable()
    }
  },
  methods: {
    startLoading () {
      this.loading = true
    },
    endLoading () {
      this.loading = false
    },
    handleRuleChange (e) {
      this.$emit('showRuleChange')
    },
    handleChooseChange (e) {
      this.$emit('showChooseChange')
    },
    handleChange (value, key, column) {
      const newData = [...this.tData]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.tData = newData
      }
    },
    handleEdit (key) {
      const newData = [...this.tData]
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.tData = newData
      }
    },
    handleSave (key) {
      const newData = [...this.tData]
      const target = newData.find(item => key === item.key)
      if (target) {
        delete target.editable
        this.emitChange(newData)
      }
      this.editingKey = ''
    },
    handleCancel (key) {
      const newData = [...this.tData]
      const target = newData.find(item => key === item.key)
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key))
        delete target.editable
        this.tData = newData
      }
    },
    emitChange (data) {
      this.$emit('change', data)
    },
    thisChild () {
      return whoHasChild(this.bomData, '子项编码', '父项编码')
        .filter(item => item.key === this.showElements[this.showParam.choosedElement].key)
    },
    renderingTable () {
     this.tData = (() => {
        switch (this.showParam.explosionRule) {
          case 0:
              return [...this.bomData]
          case 1:
            return treeToList(
                this.thisChild()
              ).map(item => {
                delete item.children
                return { ...item }
              })
          case 2:
            const _list = []
            levelOrder(this.thisChild(), null, node => {
              if (node.children && node.children.length === 0) _list.push(node)
            })
            return _list.map(item => {
              delete item.children
              return { ...item }
            })
          default:
            return []
        }
      })()
    }
  },
  created () {
    getRoleList({ t: new Date() })
    this.renderingTable()
  }
}
</script>
