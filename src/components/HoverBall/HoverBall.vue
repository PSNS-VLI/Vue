<template>
  <div
    ref="pageDiv"
    @mousemove="demo_move"
    @mouseup="demo_up"
    :class="{ zlevelTop: mouseDownState }"
    style="position: absolute; top: 0; height: 100%; width: 100%"
  >
    <div
      v-if="menuOpen"
      @click.stop="closeOpenModal"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 998"
    ></div>
    <div
      :class="{ 'six-more-modal-btn': menuOpen, moreModal: !menuOpen, 'more-tran-animate': !mouseDownState }"
      ref="actionMgr"
      :style="position"
      @mousedown="demo_down"
    >
      <div v-if="!menuOpen" @click="demo_click" class="imgMore">
        <img class="more-img" src="" alt="" title="多功能菜单" />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HoverBall',
  props: {
    // 通过position来设置初始定位
    position: {
      type: Object,
      default: function () {
        return {
          top: '32.25rem',
          left: '0'
        }
      }
    }
  },
  data () {
    return {
      menuOpen: false, //  菜单展开状态
      mouseDownState: false, //  鼠标点击状态
      iX: 0,
      iY: 0,
      dX: 0,
      dY: 500, //  初始定位
      lastMoveIndex: 0, //  拖拽计数
      curMoveIndex: 0 //  历史计数
    }
  },
  methods: {
    //  鼠标按下
    demo_down (event) {
      //  如果打开了菜单，则不做响应
      if (this.menuOpen) {
        this.mouseDownState = false
        return
      }
      console.log('demo_down', event)
      /* 此处判断  pc 或 移动端 得到 event 事件 */
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      // 鼠标点击 面向页面 的 x坐标 y坐标
      const { clientX, clientY } = touch
      // 鼠标x坐标 - 拖拽按钮x坐标  得到鼠标 距离 拖拽按钮 的间距
      this.iX = clientX - this.$refs.actionMgr.offsetLeft
      // 鼠标y坐标 - 拖拽按钮y坐标  得到鼠标 距离 拖拽按钮 的间距
      this.iY = clientY - this.$refs.actionMgr.offsetTop
      // 设置当前 状态为 鼠标按下
      this.mouseDownState = true
    },
    //  鼠标拖拽
    demo_move (event) {
      // 鼠标按下 切移动中
      if (this.mouseDownState) {
        console.log('demo_move', event)
        /* 此处判断  pc 或 移动端 得到 event 事件 */
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        // 鼠标移动时 面向页面 的 x坐标 y坐标
        const { clientX, clientY } = touch
        // 当前页面全局容器 dom 元素  获取容器 宽高
        const { clientHeight: pageDivY, clientWidth: pageDivX } = this.$refs.pageDiv
        /* 鼠标坐标 - 鼠标与拖拽按钮的 间距坐标  得到 拖拽按钮的 左上角 x轴y轴坐标 */
        let [x, y] = [clientX - this.iX, clientY - this.iY]

        // 拖拽按钮 dom 元素  获取 宽高 style 对象
        const { clientHeight: actionMgrY, clientWidth: actionMgrX, style: actionMgrStyle } = this.$refs.actionMgr
        /* 此处判断 拖拽按钮 如果超出 屏幕宽高 或者 小于
            设置 屏幕最大 x=全局容器x y=全局容器y 否则 设置 为 x=0 y=0
        */
        if (x > pageDivX - actionMgrX) x = pageDivX - actionMgrX
        else if (x < 0) x = 0
        if (y > pageDivY - actionMgrY) y = pageDivY - actionMgrY
        else if (y < 0) y = 0
        this.dX = x
        this.dY = y
        // 计算后坐标  设置 按钮位置
        actionMgrStyle.left = `${x}px`
        actionMgrStyle.top = `${y}px`
        actionMgrStyle.bottom = 'auto'
        actionMgrStyle.right = 'auto'
        //  move Index
        this.lastMoveIndex++
        //  当按下键滑动时， 阻止屏幕滑动事件
        event.preventDefault()
      }
    },
    //    鼠标抬起
    demo_up (event) {
      console.log('demo_up', event)
      //  当前页面全局容器 dom 元素  获取容器 宽高
      const { clientHeight: windowHeight, clientWidth: windowWidth } = document.documentElement
      console.log('全局容器:', windowWidth, windowHeight)
      //  拖拽按钮 dom 元素  获取 宽高 style 对象
      const { clientHeight: actionMgrY, clientWidth: actionMgrX, style: actionMgrStyle } = this.$refs.actionMgr

      console.log('拖拽按钮', actionMgrY, actionMgrX, actionMgrStyle)

      // 计算后坐标  设置 按钮位置
      if (this.dY > 0 && this.dY < windowHeight - 50) {
        //  不在顶部 且 不在底部
        if (this.dX <= windowWidth / 2) {
          //  left 小于等于屏幕一半
          actionMgrStyle.left = 0
          actionMgrStyle.right = 'auto'
        } else {
          //  left 大于屏幕一半
          actionMgrStyle.left = 'auto'
          actionMgrStyle.right = 0
        }
        if (this.dY >= windowHeight / 2) {
          //  宽度大于1/2时，是将top改为auto，调整bottom
          actionMgrStyle.top = 'auto'
          actionMgrStyle.bottom = windowHeight - this.dY - 50 + 'px'
        }
      } else {
        if (this.dY === 0) {
          //  在顶部
          actionMgrStyle.top = 0
          actionMgrStyle.bottom = 'auto'
        } else if (this.dY === windowHeight - 50) {
          actionMgrStyle.bottom = 0
          actionMgrStyle.top = 'auto'
        }
        if (this.dX >= windowWidth / 2) {
          //  右侧是将left改为auto，调整right
          actionMgrStyle.left = 'auto'
          actionMgrStyle.right = windowWidth - this.dX - 50 + 'px'
        }
      }
      this.mouseDownState = false
    },
    //    单击事件
    demo_click () {
      console.log('demo_click|moveIndex:', this.lastMoveIndex, this.curMoveIndex)
      //  mouseup 后会激活click事件
      //  如果上一次down事件到下一次click事件中经历10次以下move，则视为纯点击事件
      if (this.lastMoveIndex - this.curMoveIndex <= 10) {
        //  点击事件
        this.menuOpen = !this.menuOpen
        if (this.menuOpen) {
          //  打开菜单
        }
      }
      this.curMoveIndex = this.lastMoveIndex
    },
    //    点击空白关闭菜单
    closeOpenModal () {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>
<style>
.zlevelTop {
  z-index: 9999;
}

.more-tran-animate {
  transition: 0.5s;
}

.moreModal {
  z-index: 9999;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #337ab7;
  line-height: 40px;
  text-align: center;
  color: #fff;
  opacity: 0.6;
}

.moreModal:hover {
  opacity: 1;
}

.six-more-modal-btn {
  position: fixed;
  z-index: 9999;
  width: 14rem;
  height: 14rem;
  border-radius: 5px;
  background: #1a1a1a;
  color: #fff;
}

.imgMore {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
