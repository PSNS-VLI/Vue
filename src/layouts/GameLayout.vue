<template>
  <div class="wrapper" ref="wrapper">
    <a-drawer
      title="Basic Drawer"
      placement="left"
      :closable="false"
      :visible="visible"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
    <HoverBall />
    <router-view />
  </div>
</template>

<script>
import HoverMenu from '@/components/HoverBall'

export default {
  name: 'GameLayout',
  components: {
    HoverMenu
  },
  data () {
    return {
      visible: false
    }
  },
  created () {
    window.addEventListener('beforeunload', this.beforeUnload)
  },
  methods: {
    beforeUnload (e) {
      e.preventDefault()
      e.returnValue = ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$confirm({
      title: '确定退出游戏？',
      content: '退出游戏后将会丢失游戏进度并可能受到处罚！',
      okText: '退出',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        next()
      },
      onCancel () {
        next(false)
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.beforeUnload)
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
