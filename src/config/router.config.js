// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, GameLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

/**
 * Static Routes
 * @type { *[] }
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // Dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: BlankLayout,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },

      // BOM
      {
        path: '/erp',
        name: 'erp',
        component: BlankLayout,
        redirect: '/erp/config',
        meta: { title: 'menu.erp', icon: 'table', permission: ['erp'] },
        children: [
          {
            path: '/erp/config',
            name: 'erp-config',
            hideChildrenInMenu: true,
            component: () => import('@/views/erp/erp/ERPWrapper'),
            meta: { title: 'menu.erp.config', keepAlive: true, permission: ['erp', 'erp-config'] }
          },
          {
            path: '/erp/bom',
            name: 'erp-bom',
            hideChildrenInMenu: true,
            component: () => import('@/views/erp/bom/BOMWrapper'),
            meta: { title: 'menu.erp.bom', keepAlive: true, permission: ['erp', 'erp-bom'] }
          },
          {
            path: '/erp/mps',
            name: 'erp-mps',
            hideChildrenInMenu: true,
            component: () => import('@/views/erp/mps/MPSWrapper'),
            meta: { title: 'menu.erp.mps', keepAlive: true, permission: ['erp', 'erp-mps'] }
          },
          {
            path: '/erp/mrp',
            name: 'erp-mrp',
            hideChildrenInMenu: true,
            component: () => import('@/views/erp/mrp/MRPWrapper'),
            meta: { title: 'menu.erp.mrp', keepAlive: true, permission: ['erp', 'erp-mrp'] }
          },
          {
            path: '/erp/crp',
            name: 'erp-crp',
            hideChildrenInMenu: true,
            component: () => import('@/views/erp/crp/CRPWrapper'),
            meta: { title: 'menu.erp.crp', keepAlive: true, permission: ['erp', 'erp-crp'] }
          }
        ]
      },

      // GAME
      {
        path: '/game',
        name: 'game',
        component: BlankLayout,
        redirect: '/game/lobby',
        meta: { title: 'menu.game', icon: 'compass', permission: ['game'] },
        children: [{
          path: '/game/lobby',
          name: 'game-lobby',
          component: () => import('@/views/game/GameLobby'),
          meta: { title: 'menu.game.lobby', keepAlive: true, permission: ['game'] }
        }]
      },

      // Account
      {
        path: '/account',
        component: BlankLayout,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          // acount/settings
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * Basic Routes
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/gaming',
    name: 'gaming',
    component: GameLayout,
    redirect: '/',
    children: [
      {
        path: '/gaming/general/:id',
        name: 'general-game',
        component: () => import('@/views/game/GeneralGameLoader'),
        props: true
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  // Execption
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
