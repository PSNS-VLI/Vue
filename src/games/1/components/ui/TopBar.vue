<template>
  <div class="top-bar" :class="'player-' + currentPlayerIndex">
    <div class="player p0">{{ players[0].name }}</div>
    <div class="turn-counter">
      <img class="arrow" :src="loadSVG('turn')" />
      <div class="turn">Turn {{ turn }}</div>
    </div>
    <div class="player p1">{{ players[1].name }}</div>
  </div>
</template>

<script>
import { loadSVG } from '../../utils/utils.js'

export default {
  props: {
    players: {
      type: Array,
      default: () => []
    },
    currentPlayerIndex: {
      type: Number,
      default: 0
    },
    turn: {
      type: Number,
      default: 1
    }
  },
  mixins: [loadSVG],
  created () {
    console.log(this.players, this.currentPlayerIndex, this.turn)
  }
}
</script>

<style>
.top-bar {
  background: #356cdf;
  color: #fff;
  font-size: 42px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 12px;
  position: relative;
  z-index: 100;
}
.top-bar > * {
  -webkit-box-flex: 1;
  -ms-flex: auto 0 0px;
  flex: auto 0 0;
}
.top-bar .player {
  -webkit-box-flex: 100%;
  -ms-flex: 100% 1 1;
  flex: 100% 1 1;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.top-bar .turn-counter {
  position: relative;
  width: 250px;
}
.top-bar .turn-counter .arrow {
  max-width: 250px;
  top: -72px;
  position: absolute;
  -webkit-transition: -webkit-transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition: -webkit-transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.top-bar .turn-counter .turn {
  color: #356cdf;
  text-align: center;
  position: relative;
  z-index: 1;
}
.top-bar.player-0 .turn-counter .arrow {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.top-bar.player-0 .player.p1,
.top-bar.player-1 .player.p0 {
  opacity: 0.75;
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
@media (max-width: 1200px) {
  .top-bar {
    font-size: 32px;
  }
  .top-bar .turn-counter {
    position: relative;
    width: 200px;
  }
  .top-bar .turn-counter .arrow {
    max-width: 200px;
    top: -58px;
  }
  .castle .banners .stat-bubble {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
}
</style>
