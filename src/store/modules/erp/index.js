import { listToTree } from '@/utils/erp'

import bom from './bom.js'
import mps from './mps.js'
import mrp from './mrp.js'
import crp from './crp.js'

const erp = {
  namespaced: true,
  modules: {
    bom,
    mps,
    mrp,
    crp
  },
  state: {
  },
  getters: {
    bomTree (state) {
      return listToTree(state.bom.bomData, 'childKey', 'parentKey')
    },
    POReleDict (state) {
      const PORele = [...state.mps.PORele]
      if (!PORele.length) return {}
      const dict = {}
      listToTree(state.bom.bomData, 'childKey', 'parentKey', (cur, par, parKey) => {
        if (!par) {
          dict[cur.childKey] = PORele
        } else {
          const res = dict[parKey].map(item => item * Number(cur.quantityPer))
          dict[cur.childKey] = dict[cur.childKey]
          ? dict[cur.childKey].map((item, index) => item + res[index])
          : res
        }
        return cur
      })
      return dict
    },
    mrpList (state, getters) {
      return Object.keys(getters.POReleDict).reduce((pre, item, index) => {
        const node = state.bom.bomData.find(bom => String(bom.childKey) === item)
        if (node && node.parentKey !== '-') {
          pre.push({
            key: item,
            value: index,
            name: node ? node.childName : ''
          })
        }
        return pre
      }, [])
    }
  },
  mutations: {
  },
  actions: {
  }
}

export default erp
