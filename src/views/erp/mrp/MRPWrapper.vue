<template>
  <page-header-wrapper>
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
                    <a-select-option :key="s.value" :value="s.value">{{ s.name }}</a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <MRPTable />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import MRPTable from './MRPTable.vue'

export default {
  components: {
    MRPTable
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
        defaultRule: 0
      }
    }
  },
  methods: {
    handleRuleChange (e) {
      this.$emit('showRuleChange')
    }
  }
}
</script>

<style></style>
