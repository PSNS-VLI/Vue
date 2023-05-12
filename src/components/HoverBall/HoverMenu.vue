<template>
  <div
    @mouseenter="menuOpen = true"
    @mouseleave="menuOpen = false"
    id="nmh-navicon"
    class="wrapper"
    :class="{ 'menu-open': menuOpen, 'sticky-left': stickyLeft }"
    :style="{ left: wrapperLeft, top: wrapperTop }"
    ref="wrapper">
    <div
      @mousedown="onMouseDown"
      class="trigger"></div>
    <ul class="menu-list" v-show="menuOpen">
      <li
        class="menu-item"
        :style="{ transform: `rotate(${(stickyLeft ? avgDeg : -avgDeg) * (index + 1)}deg)`}"
        v-for="(item, index) in [1, 2, 3, 4]"
        :key="item">
        <dl class="Jnmh-subdl">
          <dt class="NMH-subdt">电商平台</dt>
          <dd class="NMH-subdd"></dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuOpen: false,
      stickyLeft: false,
      wrapperLeft: '20px',
      wrapperTop: '20px'
    }
  },
  computed: {
    avgDeg () {
      return 180 / (4 - 1)
    }
  },
  watch: {
    menuOpen: {
      immediate: true,
      handler (val) {
        this.GtoggleNavlogo()
      }
    }
  },
  methods: {
    onMouseDown (eventDown) {
      const wrap = this.$refs.wrapper
      this.menuOpen = false
      const deltaX = eventDown.pageX - wrap.offsetLeft
      const deltaY = eventDown.pageY - wrap.offsetTop + document.body.scrollTop
      document.onmousemove = (eventMove) => {
        let x = eventMove.pageX - deltaX
        let y = eventMove.pageY - deltaY

        if (x < 0) {
          x = 0
        } else if (x > document.body.offsetWidth - wrap.offsetWidth) {
          x = document.body.offsetWidth - wrap.offsetWidth
        }

        if (y < 0) {
          y = 0
        } else if (y > document.body.offsetHeight - wrap.offsetHeight) {
          y = document.body.offsetHeight - wrap.offsetHeight
        }
        this.wrapperLeft = `${x}px`
        this.wrapperTop = `${y}px`
      }
      wrap.onmouseup = () => {
        let x = wrap.offsetLeft
        if (x > document.body.offsetWidth / 2) {
          x = document.body.offsetWidth - wrap.offsetWidth - 10
          this.wrapperLeft = false
        } else {
          x = 10
          this.wrapperLeft = true
        }
        this.menuOpen = true
        this.wrapperLeft = `${x}px`
        this.menuOpen = true
        document.onmousemove = null
      }
    }
  }
}
</script>

<style>
.wrapper {
  position: fixed;
  top: 40%;
  right: 20px;
  width: 100px;
  height: 100px;
}

.wrapper.sticky-left {
  right: auto;
  left: 20px;
}

.wrapper .trigger {
  position: absolute;
  top: 50%;
  right: 0;
  display: block;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 10px 0px;
  outline: none;
  border-radius: 50%;
  z-index: 1;
}

.wrapper .menu-list {
  position: absolute;
  top: -20px;
  bottom: -20px;
  left: -20px;
  right: -20px;
  margin: 0;
  padding: 0;
  background-color: transparent;
  list-style: none;
}

.wrapper .menu-list .menu-item {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
  transition: all 0.8s ease-in-out;
}

.menu-list .Jnmh-subdl {
  position: absolute;
  left: 50%;
  bottom: 100%;
  width: 0;
  height: 0;
  line-height: 1px;
  margin-left: 0;
  background: #fff;
  border-radius: 50%;
  text-align: center;
  font-size: 1px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: none;
  transition: all 0.8s ease-in-out, color 0.1s, background 0.1s;
}

.wrapper.menu-open .menu-list .Jnmh-subdl {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-left: -40px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}

.wrapper.menu-open .menu-list .Jnmh-subdd {
  position: absolute;
  line-height: normal;
}
</style>
