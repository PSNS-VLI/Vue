<template>
  <div class="castle" :class="'player-' + index">
    <img class="building" :src="loadSVG('castle' + index)" />
    <img class="ground" :src="loadSVG('ground' + index)" />
    <castle-banners :player="player" />
  </div>
</template>

<script>
import { loadSVG } from '../../utils/utils.js'
import CastleBanners from './CastleBanners.vue'

export default {
  components: {
    'castle-banners': CastleBanners
  },
  props: {
    player: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  mixins: [loadSVG]
}
</script>

<style>
@media (max-width: 1200px) {
  .castle .banners .stat-bubble {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
}
.castle {
  position: absolute;
  width: 39.58333333vw;
  height: 46.35416667vw;
  margin: 0 2.60416667vw;
  z-index: 10;
  top: 10vh;
}
.castle .building {
  max-width: 31.77083333vw;
  min-width: 31.77083333vw;
  position: absolute;
  bottom: 14.84375vw;
  left: 3.90625vw;
}
.castle .ground {
  max-width: 39.58333333vw;
  min-width: 39.58333333vw;
  position: absolute;
  left: 0;
}
.castle .banners {
  position: absolute;
  width: 3.38541667vw;
  height: 13.54166667vw;
  left: 5.20833333vw;
  bottom: 20.3125vw;
}
.castle .banners .health-bar,
.castle .banners .health-icon {
  left: 1.82291667vw;
}
.castle .banners > * {
  position: absolute;
  top: 0;
}
.castle .banners .food-icon,
.castle .banners .health-icon {
  z-index: 2;
  max-width: 1.5625vw;
  min-width: 1.5625vw;
}
.castle .banners .food-bar,
.castle .banners .health-bar {
  max-width: 1.04166667vw;
  min-width: 1.04166667vw;
  margin-left: 0.26041667vw;
}
.castle .banners .stat-bubble {
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 10;
  font-size: 42px;
  display: block;
  width: 60px;
  height: 60px;
  -webkit-transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.castle .banners .stat-bubble img {
  position: absolute;
  top: -46px;
  z-index: -1;
}
.castle .banners .stat-bubble div {
  position: relative;
  top: -42px;
}
@media (max-width: 950px) {
  .castle .banners .stat-bubble {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}
.castle .banners .food-bubble {
  left: calc(-70px - 30 * 0.05208333vw);
  -webkit-transform-origin: right top;
  transform-origin: right top;
}
.castle .banners .food-bubble img,
.castle.player-0 {
  left: 0;
}
.castle .banners .health-bubble {
  right: calc(-70px - 30 * 0.05208333vw);
  -webkit-transform-origin: left top;
  transform-origin: left top;
}
.castle .banners .health-bubble img,
.castle.player-1 {
  right: 0;
}
.castle.player-0 .ground {
  bottom: -2.03125vw;
}
.castle.player-1 .ground {
  bottom: -3.64583333vw;
}
.castle.player-1 .banners {
  left: auto;
  right: 5.20833333vw;
}
</style>
