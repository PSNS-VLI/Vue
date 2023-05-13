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
    <!-- <HoverBall /> -->
    <HoverMenu
      @clickMenuItem="onClickMenuItem"
      :average="true"
      :menus="menus"/>
    <router-view />
  </div>
</template>

<script>
import { HoverMenu } from '@/components/HoverBall'

export default {
  name: 'GameLayout',
  components: {
    HoverMenu
  },
  data () {
    return {
      visible: false,
      menus: [{
        title: '退出全屏',
        icon: 'fullscreen-exit'
      }, {
        title: '返回大厅',
        icon: 'compass'
      }, {
        title: '游戏设置',
        icon: 'setting'
      }, {
        title: '交流中心',
        icon: 'message'
      }]
    }
  },
  created () {
    window.addEventListener('beforeunload', this.beforeUnload)
  },
  methods: {
    beforeUnload (e) {
      e.preventDefault()
      e.returnValue = ''
    },
    onClickMenuItem (item) {
      switch (item.title) {
        case this.menus[0].title:
          document.exitFullscreen()
          this.$notification.success({
            message: '已退出游戏模式',
            description: '您已经退出游戏模式，消息通知已上线',
            placement: 'topLeft',
            top: '100px'
          })
          this.$set(this.menus, 0, Object.assign({}, this.menus[0], {
            title: '进入全屏'
          }))
          break
        case this.menus[1].title:
          break
        case this.menus[2].title:
          break
        default:
          break
      }
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
