<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
  </page-header-wrapper>
</template>

<script>
  export default {
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
