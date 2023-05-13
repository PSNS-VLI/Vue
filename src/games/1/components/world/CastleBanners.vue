<template>
  <div class="banners">
    <!-- Food -->
    <img class="food-icon" src="svg/food-icon.svg" />
    <bubble type="food" :value="player.food" :ratio="foodRatio" />
    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

    <!-- Health -->
    <img class="health-icon" src="svg/health-icon.svg" />
    <bubble type="health" :value="player.health" :ratio="healthRatio" />
    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
  </div>
</template>

<script>
import { maxFood, maxHealth } from '../../state/state.js'

import Bubble from './Bubble.vue'
import BannerBar from './BannerBar.vue'

export default {
  components: {
    bubble: Bubble,
    'banner-bar': BannerBar
  },
  props: {
    player: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    foodRatio () {
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
    }
  }
}
</script>
