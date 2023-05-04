const bom = {
  namespaced: true,
  state: {
    excelName: '',
    bomData: []
  },
  mutations: {
    setBomData (state, payload) {
      state.bomData = payload.data
    },
    setExcelName (state, payload) {
      state.excelName = payload.data
    }
  },
  actions: {

  }
}

export default bom
