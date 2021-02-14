import { createStore } from 'vuex'
import init from './init'
import uiSetting from './uiSetting'
import moreMenu from './moreMenu'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    init,
    uiSetting,
    moreMenu
  }
})
