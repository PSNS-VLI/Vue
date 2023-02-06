/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  navTheme: 'dark', // Color theme, 'dark' or 'light' are both optional
  primaryColor: '#1890ff', // Dominant hue
  layout: 'sidemenu', // Navigation menu position, either 'sidemenu' or 'topmenu'
  contentWidth: 'Fluid', // Content mode which include 'fluid' means adapative width and 'fixed' means fixed width of 1200px
  fixedHeader: false, // Sticky header
  fixSiderbar: false, // Sticky sidebar, which make sense when layout is set to 'sidemenu'
  colorWeak: false, // Color weakness mode
  menu: {
    locale: true
  },
  title: 'ERP-Experiment',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
