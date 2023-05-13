<template>
  <div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
    <img :src="loadSVG(type + '-bubble')" />
    <div class="counter">{{ value }}</div>
  </div>
</template>

<script>
import { loadSVG } from '../../utils/utils.js'
import { state } from '../../state/state.js'

export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 0
    }
  },
  mixins: [loadSVG],
  computed: {
    bubbleStyle () {
      return {
        top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
      }
    }
  }
}
</script>
