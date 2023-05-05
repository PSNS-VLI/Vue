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
      return listToTree(state.bom.bomData)
    }
  },
  mutations: {
  },
  actions: {
  }
}

export default erp
