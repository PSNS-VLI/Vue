<template>
  <div class="wrapper">
    <component :is="component" v-if="component">
    </component>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      component: null
    }
  },
  watch: {
    id: {
      immediate: true,
      handler (val) {
        this.component = val
        ? () => import(`@/games/${val}/index.vue`).catch()
        : null
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
