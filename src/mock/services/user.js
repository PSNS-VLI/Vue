import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const adminToken = '4291d7da9005377ec9aec4a71ea837f'
const studentToken = '4291d7da9005377ec9aec4a71ea837d'

const permissions = [
  {
    roleId: 'admin',
    permissionId: 'dashboard',
    permissionName: '仪表盘',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false
      },
      {
        action: 'query',
        describe: '查询',
        defaultCheck: false
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false
      }
    ],
    actionList: null,
    dataAccess: null
  },
  {
    roleId: 'admin',
    permissionId: 'profile',
    permissionName: '详细页权限',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false
      },
      {
        action: 'query',
        describe: '查询',
        defaultCheck: false
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false
      }
    ],
    actionList: null,
    dataAccess: null
  },
  {
    roleId: 'admin',
    permissionId: 'game',
    permissionName: '游戏权限',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false
      },
      {
        action: 'query',
        describe: '查询',
        defaultCheck: false
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false
      }
    ],
    actionList: null,
    dataAccess: null
  },
  {
    roleId: 'admin',
    permissionId: 'user',
    permissionName: '用户信息修改',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false
      },
      {
        action: 'import',
        describe: '导入',
        defaultCheck: false
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false
      },
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false
      }
    ],
    actionList: null,
    dataAccess: null
  }
]

const adminPermissions = [{
  roleId: 'admin',
  permissionId: 'erp',
  permissionName: 'erp权限',
  actions:
    '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
  actionEntitySet: [
    {
      action: 'add',
      describe: '新增',
      defaultCheck: false
    },
    {
      action: 'import',
      describe: '导入',
      defaultCheck: false
    },
    {
      action: 'get',
      describe: '详情',
      defaultCheck: false
    },
    {
      action: 'update',
      describe: '修改',
      defaultCheck: false
    }
  ],
  actionList: null,
  dataAccess: null
}]

const users = [
  {
    id: adminToken,
    name: '于亮亮',
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {
      id: 'admin',
      name: '管理员',
      describe: '拥有所有权限',
      status: 1,
      creatorId: 'system',
      createTime: 1497160610259,
      deleted: 0,
      permissions: permissions.concat(adminPermissions)
    }
  },
  {
    id: studentToken,
    name: '学生于亮亮',
    username: 'student',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'student',
    role: {
      id: 'student',
      name: '学生',
      describe: '拥有部分权限',
      status: 1,
      creatorId: 'system',
      createTime: 1497160610259,
      deleted: 0,
      permissions: permissions.map(item => ({ ...item, roleId: 'student' }))
    }
  }
]

const info = options => {
  const body = getBody(options)
  const token = body.token || '4291d7da9005377ec9aec4a71ea837d'
  const userInfo = users.find(user => user.id === token)
  return builder(userInfo)
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
const userNav = options => {
  const nav = [
    // dashboard
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        title: 'menu.dashboard',
        icon: 'dashboard',
        show: true
      },
      component: 'RouteView',
      redirect: '/dashboard/workplace'
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: 'menu.dashboard.monitor',
        show: true
      },
      component: 'Workplace'
    },
    {
      name: 'monitor',
      path: 'https://www.baidu.com/',
      parentId: 1,
      id: 3,
      meta: {
        title: 'menu.dashboard.workplace',
        target: '_blank',
        show: true
      }
    },
    {
      name: 'Analysis',
      parentId: 1,
      id: 2,
      meta: {
        title: 'menu.dashboard.analysis',
        show: true
      },
      component: 'Analysis',
      path: '/dashboard/analysis'
    },

    // profile
    {
      name: 'profile',
      parentId: 0,
      id: 10018,
      meta: {
        title: 'menu.profile',
        icon: 'profile',
        show: true
      },
      redirect: '/profile/basic',
      component: 'RouteView'
    },
    {
      name: 'basic',
      parentId: 10018,
      id: 10019,
      meta: {
        title: 'menu.profile.basic',
        show: true
      },
      component: 'ProfileBasic'
    },
    {
      name: 'advanced',
      parentId: 10018,
      id: 10020,
      meta: {
        title: 'menu.profile.advanced',
        show: true
      },
      component: 'ProfileAdvanced'
    },

    // result
    {
      name: 'result',
      parentId: 0,
      id: 10021,
      meta: {
        title: 'menu.result',
        icon: 'check-circle-o',
        show: true
      },
      redirect: '/result/success',
      component: 'PageView'
    },
    {
      name: 'success',
      parentId: 10021,
      id: 10022,
      meta: {
        title: 'menu.result.success',
        hiddenHeaderContent: true,
        show: true
      },
      component: 'ResultSuccess'
    },
    {
      name: 'fail',
      parentId: 10021,
      id: 10023,
      meta: {
        title: 'menu.result.fail',
        hiddenHeaderContent: true,
        show: true
      },
      component: 'ResultFail'
    },

    // Exception
    {
      name: 'exception',
      parentId: 0,
      id: 10024,
      meta: {
        title: 'menu.exception',
        icon: 'warning',
        show: true
      },
      redirect: '/exception/403',
      component: 'RouteView'
    },
    {
      name: '403',
      parentId: 10024,
      id: 10025,
      meta: {
        title: 'menu.exception.not-permission',
        show: true
      },
      component: 'Exception403'
    },
    {
      name: '404',
      parentId: 10024,
      id: 10026,
      meta: {
        title: 'menu.exception.not-find',
        show: true
      },
      component: 'Exception404'
    },
    {
      name: '500',
      parentId: 10024,
      id: 10027,
      meta: {
        title: 'menu.exception.server-error',
        show: true
      },
      component: 'Exception500'
    },

    // account
    {
      name: 'account',
      parentId: 0,
      id: 10028,
      meta: {
        title: 'menu.account',
        icon: 'user',
        show: true
      },
      redirect: '/account/center',
      component: 'RouteView'
    },
    {
      name: 'center',
      parentId: 10028,
      id: 10029,
      meta: {
        title: 'menu.account.center',
        show: true
      },
      component: 'AccountCenter'
    },

    // 特殊三级菜单
    {
      name: 'settings',
      parentId: 10028,
      id: 10030,
      meta: {
        title: 'menu.account.settings',
        hideHeader: true,
        hideChildren: true,
        show: true
      },
      redirect: '/account/settings/basic',
      component: 'AccountSettings'
    },
    {
      name: 'BasicSettings',
      path: '/account/settings/basic',
      parentId: 10030,
      id: 10031,
      meta: {
        title: 'account.settings.menuMap.basic',
        show: false
      },
      component: 'BasicSetting'
    },
    {
      name: 'SecuritySettings',
      path: '/account/settings/security',
      parentId: 10030,
      id: 10032,
      meta: {
        title: 'account.settings.menuMap.security',
        show: false
      },
      component: 'SecuritySettings'
    },
    {
      name: 'CustomSettings',
      path: '/account/settings/custom',
      parentId: 10030,
      id: 10033,
      meta: {
        title: 'account.settings.menuMap.custom',
        show: false
      },
      component: 'CustomSettings'
    },
    {
      name: 'BindingSettings',
      path: '/account/settings/binding',
      parentId: 10030,
      id: 10034,
      meta: {
        title: 'account.settings.menuMap.binding',
        show: false
      },
      component: 'BindingSettings'
    },
    {
      name: 'NotificationSettings',
      path: '/account/settings/notification',
      parentId: 10030,
      id: 10034,
      meta: {
        title: 'account.settings.menuMap.notification',
        show: false
      },
      component: 'NotificationSettings'
    }
  ]
  const json = builder(nav)
  console.log('json', json)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
