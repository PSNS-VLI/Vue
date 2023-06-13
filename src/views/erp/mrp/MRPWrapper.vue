<template>
  <page-header-wrapper>
    <template v-if="hasData">
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="6" :sm="24">
                <a-form-item label="选择项目">
                  <a-select
                    @change="handleRuleChange"
                    v-model="showParam.explosionRule"
                    :placeholder="showRules[showParam.explosionRule].name"
                    :default-value="showParam.defaultRule"
                  >
                    <template v-for="s in showRules">
                      <a-select-option :key="s.key" :value="s.value">{{ s.name }}</a-select-option>
                    </template>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-card>
      <a-card :bordered="false">
        <MRP
          :sideColumns="sideColumns"
          :mainColumns="mainColumns"
          :tableData="tableData"/>
      </a-card>
    </template>
  </page-header-wrapper>
</template>

<script>
import {
  getTableColumnsTem,
  getTableDataTem,
  extractTableData,
  inflateTableData
} from '@/utils/erp'
import { mapGetters } from 'vuex'

import MRP from './MRP.vue'

export default {
  components: {
    MRP
  },
  data () {
    this.sideColumns = [{
      title: '计划接收量'
    }, {
      title: '80'
    }, {
      title: '提前期'
    }, {
      title: '1'
    }, {
      title: '当期PAB'
    }, {
      title: '安全库存'
    }, {
      title: '20'
    }, {
      title: '批量'
    }, {
      title: '160'
    }]
    return {
      // show param
      showParam: {
        explosionRule: 0,
        defaultRule: 0
      },
      // mrp data
      mainColumns: [],
      tableData: []
    }
  },
  computed: {
    ...mapGetters('erp', {
      showRules: 'mrpList',
      POReleDict: 'POReleDict'
    }),
    hasData () {
      return this.showRules.length !== 0
    }
  },
  created () {
    this.initModule()
  },
  methods: {
    handleRuleChange (e) {
      this.tableData = this.genTableData(this.POReleDict[this.showRules[e].key])
      this.$emit('showRuleChange')
    },
    genTableData (PORele) {
      const data = getTableDataTem('mrp', [2, 2, 3], { field: { parent: 'ZXC' } })
      if (!PORele) return data
      const matrix = extractTableData(data)
      matrix[0] = PORele
      matrix[3][0] = 20
      return inflateTableData(data, matrix)
    },
    initModule () {
      const vm = this
      if (this.hasData) {
        this.mainColumns = getTableColumnsTem('mrp', [2, 2, 3])
        // this.tableData = this.genTableData(this.POReleDict[this.showRules[this.showParam.defaultRule].key])
        this.tableData = this.genTableData([0, 50,	50,	60,	60,	60,	60,	90])
      } else {
        const modal = this.$error({
          keyboard: false,
          title: '缺少必要步骤',
          content: '请先进行BOM模块的实验！',
          onOk () {
            vm.$router.push('/erp/bom').then(_ => {
              modal.destroy()
            })
          }
        })
      }
    }
  }
}
</script>

<style></style>
