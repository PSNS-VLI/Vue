const mps = {
  namespaced: true,
  state: {
    PORele: []
  },
  mutations: {
    setPORele (state, payload) {
      state.PORele = payload.data
    }
  },
  actions: {

  }
}

export default mps
