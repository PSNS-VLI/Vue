<template>
  <div class="hand">
    <div class="wrapper">
      <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
        <card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from './card.vue'

export default {
  components: {
    card: Card
  },
  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handlePlay (card) {
      this.$emit('card-play', card)
    },
    handleLeaveTransitionEnd () {
      this.$emit('card-leave-end')
    }
  }
}
</script>

<style>
.hand {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 12px 0;
  background: rgba(0, 0, 0, 0.7);
  background: -webkit-linear-gradient(top, transparent 0, rgba(255, 255, 255, 0.4) 100%);
  background: linear-gradient(to bottom, transparent 0, rgba(255, 255, 255, 0.4) 100%);
  -webkit-perspective: 1000px;
  perspective: 1000px;
  pointer-events: none;
}
@media (max-width: 1200px) {
  .hand .cards {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
    height: 208px;
  }
}
</style>
