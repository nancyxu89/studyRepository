import { homepage as api } from '../../api'
import * as types from '../mutation-types'

const state = {
  projectEnts: []
}

const actions = {
  async getProjectEnts({ commit, state }, params) {
    var rtn = await api.getProjectEnts(params)
    if (rtn.code === 1) {

    }
    return rtn
  },
  async cancelAttention({ commit, state }, params) {
    let rtn = await api.cancelAttention(params)
    return rtn
  },
  async modifyAttention({ commit, state }, params) {
    let rtn = await api.modifyAttention(params)
    return rtn
  },
  async getAttentionList({ commit, state }, params) {
    let rtn = await api.getAttentionList(params)
    if (rtn.code === 1) {
      commit(types.ATTR_LIST, rtn)
    }
    return rtn
  }
}

const mutations = {
  [types.HOME_PROENT](state, projectType, ents) {
    state.projectEnts[projectType] = ents
  }
}

export default {
  state,
  actions,
  mutations
}
