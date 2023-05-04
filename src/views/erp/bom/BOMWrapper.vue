<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <template v-slot:extraContent>
    </template>
    <!-- operation card: upload, create... -->
    <a-card :bordered="false">
      <div class="table-operator">
        <a-upload
          :customRequest="() => false"
          :showUploadList="false"
          :accept="excelType"
          @change="e => handleExcelUpload(e.fileList[0].originFileObj)"
        >
          <a-button> <a-icon type="upload" /> 上传EXCEL </a-button>
        </a-upload>
        <a-button
          v-if="hasData"
          type="primary"
          icon="download"
          @click="handleExcelExport">导出EXCEL</a-button>
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>
    </a-card>
    <!-- main content -->
    <a-card :bordered="false">
      <component
        @change="handleBomChange"
        :explosion-param="null"
        :cache-data="cacheData"
        :bom-data="bomData"
        :columns="columns"
        :is="tabActiveKey">
      </component>
    </a-card>

    <!-- create model -->
    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </page-header-wrapper>
</template>

<script>
import { read, utils, writeFile } from 'xlsx'
// eslint-disable-next-line
import { generateKey } from '@/utils/erp'
import { createNamespacedHelpers } from 'vuex'

// dynamic components
import BomSummarizedExplosion from './BOMSummarizedExplosion.vue'
import BomTreeExplosion from './BOMTreeExplosion.vue'
import CreateForm from './modules/CreateForm.vue'

const { mapState } = createNamespacedHelpers('erp/bom')

export default {
  name: 'BomListWrapper',
  components: {
    BomSummarizedExplosion,
    BomTreeExplosion,
    CreateForm
  },
  data () {
    this.tabList = [
      { key: 'BomSummarizedExplosion', tab: '综合展开' },
      { key: 'BomTreeExplosion', tab: '树形展开' }
    ]
    // upload file types
    this.excelType = '.xls, .xlsx'
    this.cacheData = []
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // tabbar
      tabActiveKey: 'BomSummarizedExplosion'
    }
  },
  computed: {
    // bom data present and operation
    ...mapState([
      'bomData',
      'columns',
      'excelName'
    ]),
    hasData: function () {
      return this.bomData.length !== 0
    }
  },
  methods: {
    handleExcelUpload (excel) {
      var self = this
      self.excelName = excel.name
      var reader = new FileReader()
      reader.onload = function (e) {
        var wb = read(e.target.result, {
          type: 'array'
        })
        var excelJson = utils.sheet_to_json(
          wb.Sheets[wb.SheetNames[0]]
        )
        // init columns
        self.columns = Object.keys(excelJson[0]).map(item => ({
          title: item,
          dataIndex: item,
          scopedSlots: { customRender: item }
        }))
        self.columns.push({
          title: '操作',
          scopedSlots: { customRender: 'operation' }
        })
        self.columns = self.columns.map(item => ({
          ...item,
          width: `${100 / self.columns.length}%`
        }))
        // init data
        excelJson = excelJson.map((item, index) => ({
          key: index,
          index: index,
          ...item
        }))
        // generateKey(excelJson, '子项编码')
        self.bomData = excelJson
        self.cacheData = excelJson.map(item => ({ ...item }))
      }
      reader.readAsArrayBuffer(excel)
    },
    handleExcelExport () {
      const wb = utils.book_new()
      utils.book_append_sheet(
        wb,
        utils.json_to_sheet(
          this.bomData.map(item => {
            delete item.key
            delete item.index
            return item
          })
        )
      )
      writeFile(
        wb,
        this.excelName
      )
    },
    handleBomChange (data) {
      this.bomData = data
      this.cacheData = [...data]
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    }
  }
}
</script>
