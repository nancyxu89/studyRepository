import Vue from 'vue'
import Vuex from 'vuex'
import cooperDetail from './modules/cooperDetail'
import user from './modules/user'
import attention from './modules/attention'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import dataSourceType from './modules/dataSourceType'

import personalSetting from './modules/personalSetting'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  modules: {
    dataSourceType,
    user,
    attention,
    personalSetting,
    cooperDetail
  },

  strict: true

})
