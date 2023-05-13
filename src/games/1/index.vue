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
  </div>
</template>

<script>
import TWEEN from './assets/js/Tween.js'
import { state } from './state/state.js'
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
  OverlayContentPlayerTurn
} from './components/ui'
import {
  Castle,
  Cloud,
  BannerBar
 } from './components/world'

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
  data () {
    this.overlayCloseHandlers = {
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
    return state
  },
  computed: {
    cssClass () {
      return {
        'can-play': this.canPlay
      }
    }
  },
  created () {
    console.log(this.$data)
    // Window resize handling
    window.addEventListener('resize', this.handleResize)
    // Tween.js
    requestAnimationFrame(this.animate)
    state.activeOverlay = 'player-turn'
  },
  mounted () {
    beginGame()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handlePlayCard (card) {
      playCard(card)
    },
    handleCardLeaveEnd () {
      applyCard()
    },
    handleOverlayClose () {
      this.overlayCloseHandlers[this.activeOverlay]()
    },
    handleResize () {
      state.worldRatio = getWorldRatio()
    },
    animate (time) {
      requestAnimationFrame(this.animate)
      // eslint-disable-next-line no-undef
      TWEEN.update(time)
    }
  }
}

</script>

<style lang="less" scoped>
@import url('./style/transitions.css');
@import url('./style/style.css');
</style>
