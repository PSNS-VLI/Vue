import UserLayout from './UserLayout'
import BasicLayout from './BasicLayout'
import GameLayout from './GameLayout'
import RouteView from './RouteView'
import PageView from './PageView'

const BlankLayout = {
  name: 'RouteView',
  render: h => h('router-view')
}

export {
  UserLayout,
  BasicLayout,
  GameLayout,
  BlankLayout,
  RouteView,
  PageView
}
