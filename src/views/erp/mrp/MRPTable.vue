<template>
  <div class="wrapper">
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
          <a-col :md="6" :sm="24">
            <a-form-item label="全表搜索">
              <a-input-search placeholder="Search" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="mps-table">
      <a-table
        bordered
        :columns="sideColumns"
        :locale="locale">
        <div slot="title" class="table-title">
          zxca-f 的MPS
        </div>
      </a-table>

      <a-table
        bordered
        :columns="mainColumns"
        :data-source="mainData"
        :pagination="false">
      </a-table>
    </div>
  </div>

</template>

<script>
  import EmptyNone from '../components/EmptyNone.vue'

  // eslint-disable-next-line
  const mainColumns = [{
    title: '时区',
    children: [{
      title: '时段',
      dataIndex: 'title'
    }]
  }, {
    title: '当期',
    dataIndex: 'current_zone'
  }, {
    title: '需求时区',
    children: [{
      title: '1',
      dataIndex: 'zone_1'
    }, {
      title: '2',
      dataIndex: 'zone_2'
    }]
  }, {
    title: '计划时区',
    children: [{
      title: '3',
      dataIndex: 'zone_3'
    }, {
      title: '4',
      dataIndex: 'zone_4'
    }, {
      title: '5',
      dataIndex: 'zone_5'
    }, {
      title: '6',
      dataIndex: 'zone_6'
    }]
  }, {
    title: '预测时区',
    children: [{
      title: '7',
      dataIndex: 'zone_7'
    }, {
      title: '8',
      dataIndex: 'zone_8'
    }, {
      title: '9',
      dataIndex: 'zone_9'
    }, {
      title: '10',
      dataIndex: 'zone_10'
    }]
  }]
  // eslint-disable-next-line
  const sideColumns = [{
    title: '编制日期'
  }, {
    title: '2023/10/2'
  }, {
    title: '安全库存'
  }, {
    title: '20'
  }, {
    title: '生产批量'
  }, {
    title: '160'
  }]
  const mainData = [{
    key: '1',
    title: '预测量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '2',
    title: '订单量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '3',
    title: '计划接受量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '4',
    title: '毛需求量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '5',
    title: 'PAB初值',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '6',
    title: '净需求量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '7',
    title: '计划产出量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '8',
    title: 'PAB',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '9',
    title: '计划投入',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '10',
    title: 'ATP',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }]
  export default {
    data () {
      this.locale = { emptyText: <EmptyNone /> }
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
        mainColumns,
        sideColumns,
        mainData
      }
    },
    method: {
      handleRuleChange (e) {
        this.$emit('showRuleChange')
      }
    }
  }
</script>

<style>
.table-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.ant-table-wrapper:first-child .ant-table-placeholder {
  padding: unset;
}

.ant-table-wrapper:first-child .ant-table-thead > tr > th {
  border-bottom: none;
}
</style>
