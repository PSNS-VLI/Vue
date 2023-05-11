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
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'GameLayout',
  props: {},
  data () {
    return {
        visible: false
    }
  },
  mounted () {
    this.$refs.wrapper
        .requestFullscreen()
        .then(res => this.$message.info('您已经进入游戏模式，ESC退出'))
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
