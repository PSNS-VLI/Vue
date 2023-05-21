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
          :fileList="fileList"
          :customRequest="() => false"
          :showUploadList="false"
          :accept="excelType"
          @change="handleExcelUpload"
        >
          <a-button
            icon="upload">上传EXCEL</a-button>
        </a-upload>
        <a-button
          v-if="bomData.length > 0"
          type="primary"
          icon="download"
          @click="handleExcelExport">导出EXCEL</a-button>
      </div>
    </a-card>
    <!-- main content -->
    <a-card :bordered="false">
      <keep-alive>
        <component
          @change="handleBomChange"
          :explosion-param="null"
          :bom-data="bomData"
          :columns="columns"
          :is="tabActiveKey">
        </component>
      </keep-alive>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { read, utils, writeFile } from 'xlsx'
import { createNamespacedHelpers } from 'vuex'
import { bomColumns } from '@/config/erp.config.js'

// dynamic components
import BomSummarizedExplosion from './BOMSummarizedExplosion.vue'
import BomTreeExplosion from './BOMTreeExplosion.vue'

const { mapState, mapMutations } = createNamespacedHelpers('erp/bom')

export default {
  name: 'BomListWrapper',
  components: {
    BomSummarizedExplosion,
    BomTreeExplosion
  },
  data () {
    this.tabList = [
      { key: 'BomSummarizedExplosion', tab: '综合展开' },
      { key: 'BomTreeExplosion', tab: '树形展开' }
    ]
    // upload file types
    this.excelType = '.xls, .xlsx'
    return {
      fileList: [],
      tabActiveKey: 'BomSummarizedExplosion',
      columns: bomColumns
    }
  },
  computed: {
    // bom data present and operation
    ...mapState([
      'excelName',
      'bomData'
    ]),
    titleKey () {
      return this.columns.reduce((pre, cur) => {
        pre[cur.title] = cur.dataIndex
        return pre
      }, {})
    },
    keyTitle () {
      return this.columns.reduce((pre, cur) => {
        pre[cur.dataIndex] = cur.title
        return pre
      }, {})
    }
  },
  methods: {
    ...mapMutations([
      'setBomData',
      'setExcelName'
    ]),
    handleExcelUpload (event) {
      const excel = event.fileList.pop().originFileObj
      this.fileList = event.fileList
      this.setExcelName({ data: excel.name })
      const reader = new FileReader()
      reader.onload = (e) => {
        var wb = read(e.target.result, {
          type: 'array'
        })
        var excelJson = utils.sheet_to_json(
          wb.Sheets[wb.SheetNames[0]]
        )
        this.setBomData({
          data: this.convertExcelData(excelJson)
        })
      }
      reader.readAsArrayBuffer(excel)
    },
    handleExcelExport () {
      const wb = utils.book_new()
      utils.book_append_sheet(
        wb,
        utils.json_to_sheet(
          this.convertExcelData(this.bomData, 'output')
        )
      )
      writeFile(
        wb,
        this.excelName
      )
    },
    handleBomChange (data) {
      this.setBomData({ data })
    },
    convertExcelData (excelData, tag) {
      tag = tag || 'input'
      if (tag === 'input') {
        excelData = excelData.map((row, index) => {
          return Object.keys(row).reduce((pre, cur) => {
            pre['key'] = index
            pre[this.titleKey[cur]] = row[cur]
            return pre
          }, {})
        })
      }
      if (tag === 'output') {
        excelData = excelData.map(row => {
          delete row.key
          return Object.keys(row).reduce((pre, cur) => {
            pre[this.keyTitle[cur]] = row[cur]
            return pre
          }, {})
        })
      }
      return excelData
    }
  }
}
</script>
