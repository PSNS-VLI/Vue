<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <MPS-Table v-show="tabActiveKey === 'MpsTable'"/>
    <RCCP v-show="tabActiveKey === 'RCCP'"/>
  </page-header-wrapper>
</template>

<script>
  import MPSTable from './MPSTable.vue'
  import RCCP from './RCCP.vue'
  export default {
    components: {
    MPSTable,
    RCCP
  },
    data () {
      this.tabList = [
        { key: 'MpsTable', tab: '主生产计划表' },
        { key: 'RCCP', tab: '粗能力计划' }
      ]
      return {
        tabActiveKey: 'MpsTable'
      }
    }
  }
</script>

<style>

</style>
