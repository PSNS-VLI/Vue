<template>
  <div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
    <img :src="'svg/' + type + '-bubble.svg'" />
    <div class="counter">{{ value }}</div>
  </div>
</template>

<script>
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
  computed: {
    bubbleStyle () {
      return {
        top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
      }
    }
  }
}
</script>
