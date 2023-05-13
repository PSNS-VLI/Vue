<template>
  <div class="overlay" @click="handleClick">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 51;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 32px;
  text-align: center;
}
.overlay .big {
  font-size: 72px;
}
.overlay .card {
  margin: 32px auto 0;
  pointer-events: none;
}
</style>
