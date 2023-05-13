<template>
  <div class="player-result" :class="result">
    <span class="name">{{ player.name }}</span> is
    <span class="result">{{ result }}</span>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    result () {
      return this.player.dead ? 'defeated' : 'victorious'
    }
  }
}
</script>

<style>
.player-result {
  margin: 42px 0;
  padding: 32px;
  background: rgba(255, 255, 255, 0.75);
}
.player-result.victorious span {
  color: #2a7db5;
}
.player-result.defeated span {
  color: #b52a2a;
}
</style>
