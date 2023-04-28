<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <a-card :bordered="false">
      <MPS v-show="tabActiveKey === 'MpsTable'"/>
      <RCCP v-show="tabActiveKey === 'RCCP'"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import MPS from './MPS.vue'
  import RCCP from './RCCP.vue'
  export default {
    components: {
      MPS,
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
