<template>
  <div class="banners">
    <!-- Food -->
    <img class="food-icon" :src="loadSVG('food-icon')" />
    <bubble type="food" :value="player.food" :ratio="foodRatio" />
    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />

    <!-- Health -->
    <img class="health-icon" :src="loadSVG('health-icon')" />
    <bubble type="health" :value="player.health" :ratio="healthRatio" />
    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
  </div>
</template>

<script>
import { loadSVG } from '../../utils/utils.js'
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
  mixins: [loadSVG],
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
