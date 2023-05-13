<template>
  <div>
    <div id="#app" :class="cssClass">
      <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />

      <div class="world">
        <castle v-for="(player, index) in players" :key="index" :player="player" :index="index" />
        <div class="land" />
        <div class="clouds">
          <cloud v-for="index in 10" :key="index" :type="((index - 1) % 5) + 1" />
        </div>
      </div>

      <transition name="hand">
        <hand
          v-if="!activeOverlay"
          :cards="currentHand"
          @card-play="handlePlayCard"
          @card-leave-end="handleCardLeaveEnd"
        />
      </transition>

      <transition name="fade">
        <div class="overlay-background" v-if="activeOverlay" />
      </transition>

      <transition name="zoom">
        <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
          <component
            :is="'overlay-content-' + activeOverlay"
            :player="currentPlayer"
            :opponent="currentOpponent"
            :players="players"
          />
        </overlay>
      </transition>
    </div>
    <banner-bar />
  </div>
</template>

<script>
import state from './state'
import {
  getWorldRatio
} from './utils/utils.js'
import {
  playCard,
  applyCard,
  beginGame,
  newTurn
} from './utils/core.js'

import {
  TopBar,
  Hand,
  Overlay,
  OverlayContentGameOver,
  OverlayContentLastPlay,
  OverlayContentPlayerTurn,
  BannerBar
} from 'components/ui'
import {
  Castle,
  Cloud
 } from 'components/world'

export default {
  components: {
    'top-bar': TopBar,
    hand: Hand,
    overlay: Overlay,
    'overlay-content-game-over': OverlayContentGameOver,
    'overlay-content-last-play': OverlayContentLastPlay,
    'overlay-content-player-turn': OverlayContentPlayerTurn,
    'banner-bar': BannerBar,
    'castle': Castle,
    'cloud': Cloud
  },
  data: state,
  computed: {
    cssClass () {
      return {
        'can-play': this.canPlay
      }
    }
  },
  methods: {
    handlePlayCard (card) {
      playCard(card)
    },
    handleCardLeaveEnd () {
      applyCard()
    },
    handleOverlayClose () {
      overlayCloseHandlers[this.activeOverlay]()
    }
  },
  mounted () {
    beginGame()
  }
}
var overlayCloseHandlers = {
  'player-turn' () {
    if (state.turn > 1) {
      state.activeOverlay = 'last-play'
    } else {
      newTurn()
    }
  },

  'last-play' () {
    newTurn()
  },

  'game-over' () {
    document.location.reload()
  }
}

// Window resize handling
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

// Tween.js
requestAnimationFrame(animate)

function animate (time) {
  requestAnimationFrame(animate)
  // eslint-disable-next-line no-undef
  TWEEN.update(time)
}

</script>
<script src="assets/js/Tween.js"></script>

<style lang="less" scoped>
</style>
