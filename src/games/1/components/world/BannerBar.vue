<template>
  <svg viewBox="0 0 20 260">
    <path :d="`m 0,0 20,0 0,${height} -10,-10 -10,10 z`" :style="`fill:${color};stroke:none;`" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    ratio: {
      type: Number,
      default: 0
    }
  },
  computed: {
    targetHeight () {
      return 220 * this.ratio + 40
    }
  },
  data () {
    return {
      height: 0
    }
  },
  watch: {
    targetHeight (newValue, oldValue) {
      const vm = this
      // eslint-disable-next-line no-undef
      new TWEEN.Tween({ value: oldValue })
      // eslint-disable-next-line no-undef
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ value: newValue }, 500)
        .onUpdate(function () {
          vm.height = this.value.toFixed(0)
        })
        .start()
    }
  },
  created () {
    this.height = this.targetHeight
  }
}
</script>
