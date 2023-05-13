<template>
  <div class="cloud" :class="'cloud-' + type" :style="style">
    <img :src="loadSVG('cloud' + type)" @load="initPosition" />
  </div>
</template>

<script>
import { loadSVG } from '../../utils/utils.js'
import TWEEN from '../../assets/js/Tween'

export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  mixins: [loadSVG],
  data () {
    this.cloudAnimationDurations = {
      min: 10000,
      max: 50000
    }
    return {
      style: {
        transform: 'none',
        zIndex: 0
      }
    }
  },
  methods: {
    setPosition (left, top) {
      // Use transform for better performance
      this.style.transform = `translate(${left}px, ${top}px)`
    },
    initPosition () {
      // Element width
      const width = this.$el.clientWidth
      this.setPosition(-width, 0)
    },
    startAnimation (delay = 0) {
      const vm = this

      // Element width
      const width = this.$el.clientWidth

      // Random animation duration
      const { min, max } = this.cloudAnimationDurations
      const animationDuration = Math.random() * (max - min) + min

      // Bing faster clouds forward
      this.style.zIndex = Math.round(max - animationDuration)

      // Random position
      const top = Math.random() * (window.innerHeight * 0.3)
      new TWEEN.Tween({ value: -width })
        .to({ value: window.innerWidth }, animationDuration)
        .delay(delay)
        .onUpdate(function () {
          vm.setPosition(this.value, top)
        })
        .onComplete(() => {
          // With a random delay
          this.startAnimation(Math.random() * 10000)
        })
        .start()
    }
  },
  mounted () {
    // We start the animation with a negative delay
    // So it begins midway
    this.startAnimation(-Math.random() * this.cloudAnimationDurations.min)
  }
}
</script>

<style>
.cloud {
  position: absolute;
}
</style>
