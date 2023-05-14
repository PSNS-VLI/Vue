<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <a-card :bordered="false">
      <keep-alive>
        <component
          :is="tabActiveKey">
        </component>
      </keep-alive>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import WorkCenter from './WorkCenter.vue'
import ProcessRoute from './ProcessRoute.vue'

export default {
  components: {
    WorkCenter,
    ProcessRoute
  },
  data () {
    this.tabList = [
      { key: 'WorkCenter', tab: '工作中心' },
      { key: 'ProcessRoute', tab: '工艺路线' }
    ]
    return {
      tabActiveKey: 'WorkCenter'
    }
  }
}
</script>

<style scoped>

</style>
