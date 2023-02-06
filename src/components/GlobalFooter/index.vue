<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">{{ title }}</a>
    </template>
  </global-footer>
</template>

<script>
import defaultSettings from '@/config/defaultSettings'
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  },
  data () {
    return {
      title: defaultSettings.title
    }
  }
}
</script>
