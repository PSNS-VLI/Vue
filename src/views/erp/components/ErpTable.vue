<template>
  <div class="wrapper">
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
          <div :key="item">
            <keep-alive>
              <a-input-number
                v-if="isEdit && record.editable && !frozenList.includes(item)"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e, record, index, item)"
              />
              <div v-else>
                {{ text }}
              </div>
            </keep-alive>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
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
    isEdit: {
      type: Boolean,
      default: false
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
    return { }
  },
  computed: {
    mainColAndScoped () {
      const columns = this.mainColumns
      const dataIndexList = []
      function genScoped (columns) {
        columns.forEach(item => {
          // eslint-disable-next-line no-unused-expressions
          item.dataIndex
          ? (item.scopedSlots = { customRender: item.dataIndex }) && dataIndexList.push(item.dataIndex)
          : item.children
            ? genScoped(item.children)
            : null
        })
      }
      genScoped(columns)
      return { columns, dataIndexList }
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
    handleChange (newValue, rowData, rowIndex, columnKey) {
      const data = this.mainData.map(item => ({ ...item }))
      data.find(item => item.key === rowData.key)[columnKey] = newValue
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped>
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
