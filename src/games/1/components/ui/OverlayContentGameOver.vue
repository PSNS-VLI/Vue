<template>
  <div>
    <div class="big">Game Over</div>
    <player-result v-for="(player, index) in players" :player="player" :key="index"/>
  </div>
</template>

<script>
import PlayerResult from './PlayerResult.vue'

export default {
  components: {
    'player-result': PlayerResult
  },
  props: {
    players: {
      type: Array,
      default: () => []
    }
  }
}
</script>
