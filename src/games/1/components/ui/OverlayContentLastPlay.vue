<template>
  <div>
    <div v-if="opponent.skippedTurn">{{ opponent.name }} turn was skipped!</div>
    <template v-else>
      <div>{{ opponent.name }} just played:</div>
      <card :def="lastPlayedCard" />
    </template>
  </div>
</template>

<script>
import { getLastPlayedCard } from '../../utils/core.js'

import Card from './Card.vue'

export default {
  components: {
    card: Card
  },
  props: {
    opponent: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    lastPlayedCard () {
      return getLastPlayedCard(this.opponent)
    }
  }
}
</script>
