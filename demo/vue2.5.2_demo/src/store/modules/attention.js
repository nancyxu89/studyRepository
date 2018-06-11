import { attention as api } from '../../api'
import * as types from '../mutation-types'

const state = {
  attrProjectTypes: [
    { id: 1, name: '再融资类项目' },
    { id: 2, name: '并购重组类项目' },
    { id: 3, name: '首发类项目' },
    { id: 6, name: '债券类项目' },
    { id: 5, name: '优先股类项目' },
    { id: 4, name: '新三板类项目' }
  ],
  attrList: []
}
const getters = {
  attrList: state => state.attrList
}

const actions = {
  async addAttention({ commit, state }, params) {
    let rtn = await api.addAttention(params)
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
  [types.ATTR_LIST](state, { data }) {
    state.attrList = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
