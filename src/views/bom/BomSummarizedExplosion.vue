<template>
  <div>
    <!-- table menu -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="展开方式">
              <a-select v-model="queryParam.status" :placeholder="queryRules[0].name" default-value="0">
                <template v-for="q in queryRules">
                  <a-select-option :key="q.value" :value="q.value">{{ q.name }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="选择元素">
              <a-select v-model="queryParam.status" :placeholder="queryRules[0].name" default-value="0">
                <template v-for="q in queryRules">
                  <a-select-option :key="q.value" :value="q.value">{{ q.name }}</a-select-option>
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
      :data-source="bomData"
    >
      <template slot="title">
        ssasas
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
              <a-popconfirm title="确认更改?" @confirm="() => save(record.key)">
                <a>保存</a>
              </a-popconfirm>
              <a @click="() => cancel(record.key)"> 取消</a>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'

import { STable, Ellipsis } from '@/components'
// eslint-disable-next-line
import { getRoleList, getServiceList } from '@/api/manage'

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
    }
  },
  data () {
    return {
      // query param
      queryParam: {},
      queryRules: [{
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
      }],
      // table loading
      loading: false,
      editingKey: ''
    }
  },
  methods: {
    startLoading () {
      this.loading = true
    },
    endLoading () {
      this.loading = false
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleChange (value, key, column) {
      const newData = [...this.bomData]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.bomData]
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.bomData = newData
      }
    },
    save (key) {
      const newData = [...this.bomData]
      const newCacheData = [...this.cacheData]
      const target = newData.find(item => key === item.key)
      const targetCache = newCacheData.find(item => key === item.key)
      if (target && targetCache) {
        delete target.editable
        this.bomData = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel (key) {
      const newData = [...this.bomData]
      const target = newData.find(item => key === item.key)
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key))
        delete target.editable
        this.bomData = newData
      }
    }
  },
  created () {
    getRoleList({ t: new Date() })
  }
}
</script>
