export default {
  state: () => ({
    isTranClose: false
  }),
  mutations: {
    tranClose(state: any, data: any) {
      state.isTranClose = false
    },
    tranOpen(state: any, data: any) {
      state.isTranClose = true
    }
  }
}