<template>
  <div>
    <div
      @mouseenter="menuOpen = true"
      @mouseleave="menuOpen = false"
      id="nmh-navicon"
      class="wrapper"
      :class="{ 'menu-open': menuOpen, 'sticky-right': stickyRight }"
      :style="{ left: wrapperLeft, top: wrapperTop }"
      ref="wrapper">
      <div
        @mousedown="onMouseDown"
        class="trigger"></div>
      <ul class="menu-list" :style="{ opacity: menuOpen ? 1 : 0 }">
        <li
          class="menu-item"
          :style="{ transform: `rotate(${menuOpen ? ((stickyRight ? -avgDeg : avgDeg) * index) : 0}deg)`}"
          v-for="(item, index) in menus"
          :key="index">
          <dl
            @click="$emit('clickMenuItem', item)"
            :style="{ transform: `rotate(${menuOpen ? ((stickyRight ? avgDeg : -avgDeg) * index) : 0}deg)`}"
            class="menu-item-container">
            <dt class="menu-item-title">{{ item.title }}</dt>
            <dd class="menu-item-icon">
              <a-icon :type="item.icon" />
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    average: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      menuOpen: false,
      stickyRight: false,
      wrapperLeft: '20px',
      wrapperTop: '20px'
    }
  },
  computed: {
    avgDeg () {
      const len = this.menus.length
      return this.average
      ? len && len > 1 ? 180 / (len - 1) : 0
      : this.interval
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
          this.stickyRight = true
        } else {
          x = 10
          this.stickyRight = false
        }
        this.menuOpen = true
        this.wrapperLeft = `${x}px`
        document.onmousemove = null
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 40%;
  left: 20px;
  width: 100px;
  height: 100px;
}

.wrapper.sticky-right {
  left: auto;
  right: 20px;
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
  opacity: 0;
  transition: opacity .6s ease-in-out;;
}

.wrapper .menu-list .menu-item {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
  transition: all 0.8s ease-in-out;
}

.menu-list .menu-item-container {
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
  transform: rotate(0deg);
  transition: all 0.8s ease-in-out, color 0.1s, background 0.1s;
}

.wrapper.menu-open .menu-list .menu-item-container {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-left: -40px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}
</style>
