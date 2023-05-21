<template>
  <div class="wrapper">
    <div class="table-operation" v-if="operation">
      <a-row :gutter="48">
        <a-col :md="3" :sm="6" v-if="operation.includes('edit')">
          <a-button
            :type="isEdit ? 'default' : 'primary'"
            icon="edit"
            @click="isEdit = !isEdit">
            <template v-if="isEdit">取消编辑</template>
            <template v-else>编辑</template>
          </a-button>
        </a-col>
        <a-col :md="3" :sm="6" v-if="operation.includes('add')">
          <a-button
            type="primary"
            icon="plus"
            @click="handleAdd">
            新增
          </a-button>
        </a-col>
        <a-col :md="3" :sm="6" v-if="operation.includes('delete')">
          <a-button
            :type="isDelete ? 'default' : 'primary'"
            icon="delete"
            @click="isDelete = !isDelete">
            <template v-if="isDelete">取消删除</template>
            <template v-else>删除</template>
          </a-button>
        </a-col>
        <a-col :md="6" :sm="6" v-if="operation.includes('search')">
          <a-input-search placeholder="Search" />
        </a-col>
      </a-row>
    </div>
    <div class="table-wrapper">
      <a-table
        bordered
        :columns="sideColumns"
        :locale="locale"
        v-if="hasSide"
      >
        <template slot="title" v-if="title">
          <div class="table-title">{{ title }}</div>
        </template>
      </a-table>

      <a-table
        bordered
        :columns="mainColAndScoped.columns"
        :data-source="mainData"
        :pagination="false">
        <template slot="title" v-if="!hasSide && title">
          <div class="table-title">{{ title }}</div>
        </template>
        <template v-for="item in mainColAndScoped.dataIndexList" :slot="item" slot-scope="text, record, index">
          <div :key="item" v-if="item !== 'operation'">
            <div v-if="mainColAndScoped.textFields.includes(item)">
              <keep-alive>
                <a-input
                  v-if="isEdit && !frozenList.includes(item)"
                  style="margin: -5px 0"
                  :value="text"
                  @input="e => handleChange(e.target.value, record, index, item)"
                />
                <div v-else>
                  {{ text }}
                </div>
              </keep-alive>
            </div>
            <div v-else>
              <keep-alive>
                <a-input-number
                  v-if="isEdit && !frozenList.includes(item)"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e, record, index, item)"
                />
                <div v-else>
                  {{ text }}
                </div>
              </keep-alive>
            </div>
          </div>
          <div :key="item" v-if="item === 'operation' && isDelete">
            <a-popconfirm
              title="确认删除?"
              @confirm="() => handleDelete(record)"
            >
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

import EmptyNone from './EmptyNone.vue'

export default {
  model: {
    prop: 'mainData',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    hasSide: {
      type: Boolean,
      default: true
    },
    operation: {
      type: String,
      default: ''
    },
    sideColumns: {
      type: Array,
      default: () => []
    },
    frozenList: {
      type: Array,
      default: () => []
    },
    mainColumns: {
      type: Array,
      default: () => []
    },
    mainData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.locale = { emptyText: <EmptyNone /> }
    return {
      isEdit: false,
      isDelete: false
    }
  },
  computed: {
    mainColAndScoped () {
      const columns = cloneDeep(this.mainColumns)
      const dataIndexList = []
      const textFields = []
      function genScoped (columns) {
        columns.forEach(item => {
          if (item.dataIndex) {
            item.scopedSlots = { customRender: item.dataIndex }
            dataIndexList.push(item.dataIndex)
            if (item.type && item.type === 'text') textFields.push(item.dataIndex)
          } else {
            if (item.children) genScoped(item.children)
          }
        })
      }
      genScoped(columns)
      if (this.isDelete) {
        columns.push({
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        })
        dataIndexList.push('operation')
      } else {
        const index1 = columns.findIndex(
            item => item.dataIndex === 'operation')
        const index2 = columns.findIndex(
            item => item.dataIndex === 'operation')
        columns.splice(index1 >= 0 ? index1 : columns.length, 1)
        dataIndexList.splice(index2 >= 0 ? index2 : dataIndexList.length, 1)
      }
      return { columns, dataIndexList, textFields }
    },
    inputListeners: function () {
      return Object.assign({},
        this.$linsteners,
        {
          blur () {
            this.$emit('change')
          }
        }
      )
    }
  },
  methods: {
    handleAdd () {
      this.$emit('change', this.mainData.concat(
        [Object.assign({
          key: Date.now().toString()
        }, this.mainColAndScoped.dataIndexList.reduce((pre, cur) => {
          pre[cur] = 0
          return pre
        }, {}))]
      ))
    },
    handleDelete (record) {
      const data = cloneDeep(this.mainData)
      data.splice(data.findIndex(item => item.key === record.key), 1)
      this.$emit('change', data)
    },
    handleChange (newValue, rowData, rowIndex, columnKey) {
      const data = this.mainData.map(item => ({ ...item }))
      data.find(item => item.key === rowData.key)[columnKey] = newValue
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped>
.table-operation {
  margin-bottom: 20px;
}
.table-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.table-wrapper >>> .ant-table-wrapper:first-child .ant-table-placeholder {
  padding: 0;
}

.table-wrapper >>> .ant-table-wrapper:first-child .ant-table-thead > tr > th {
  border-bottom: none;
}
</style>
