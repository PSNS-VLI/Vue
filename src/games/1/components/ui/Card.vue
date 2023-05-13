<template>
  <div class="card" :class="'type-' + def.type" @click="play">
    <div class="title">{{ def.title }}</div>
    <img class="separator" :src="loadSVG('card-separator')" />
    <div class="description"><div v-html="def.description"></div></div>
    <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
  </div>
</template>

<script>
import { loadSVG } from '../../utils/utils.js'

export default {
  props: {
    def: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [loadSVG],
  methods: {
    play () {
      this.$emit('play')
    }
  }
}
</script>

<style>
.card {
  width: 200px;
  height: 260px;
  background: grey;
  color: #fff;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  cursor: pointer;
  position: relative;
  top: 0;
  margin: 0 6px;
}
.card .separator,
.card .title {
  -webkit-box-flex: 1;
  -ms-flex: auto 0 0px;
  flex: auto 0 0;
}
.card .title {
  font-size: 22px;
  margin-bottom: 12px;
}
.card .separator {
  width: 155px;
  height: 13px;
  margin: auto;
}
.card .description {
  -webkit-box-flex: 1;
  -ms-flex: auto 1 1;
  flex: auto 1 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
}
.card .description span {
  display: inline-block;
}
.card .description .keyword img {
  opacity: 0.75;
  margin-left: -2px;
  width: 14px;
  height: 21px;
  vertical-align: sub;
}
.card .note {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-style: italic;
}
.card:hover {
  top: -20px;
}
.card.type-attack {
  background: #9b1b1b;
}
.card.type-attack:hover {
  background: #c62323;
}
.card.type-special {
  background: #751b9b;
}
.card.type-special:hover {
  background: #9623c6;
}
.card.type-support {
  background: #1b6e9b;
}
.card.type-support:hover {
  background: #238dc6;
}
</style>
