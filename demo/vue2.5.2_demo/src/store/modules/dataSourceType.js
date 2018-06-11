import { dataSourceType as api } from '../../api'
import * as types from '../mutation-types'

const state = {
  dataSourceType: [], // 数据源类型列表
  dataSourceTypeAdd: [], // 添加数据源类型
  dataSourceTypeDel: [], // 删除数据源类型
  dataSourceTypeUpdate: [], // 更新数据源类型
  dataSourceTypeNameCount: [] // 添加数据源类型名称查重
}

const getters = {
  dataSourceType: state => state.dataSourceType,
  dataSourceTypeAdd: state => state.dataSourceTypeAdd,
  dataSourceTypeDel: state => state.dataSourceTypeDel,
  dataSourceTypeUpdate: state => state.dataSourceTypeUpdate,
  dataSourceTypeNameCount: state => state.dataSourceTypeNameCount
}

const actions = {
  async getDataSourceType({ commit, state }, params) {
    let rtn = await api.getDataSourceType(params)
    if (rtn.code === 1) {
      commit(types.DATA_SOURCE_TYPE, rtn)
    }
    return rtn
  },
  async addDataSourceType({ commit, state }, params) {
    let rtn = await api.addDataSourceType(params)
    if (rtn.code === 1) {
      commit(types.DATA_SOURCE_TYPE_ADD, rtn)
    }
    return rtn
  },
  async delDataSourceType({ commit, state }, params) {
    let rtn = await api.delDataSourceType(params)
    if (rtn.code === 1) {
      commit(types.DATA_SOURCE_TYPE_DEL, rtn)
    }
    return rtn
  },
  async updateDataSourceType({ commit, state }, params) {
    let rtn = await api.updateDataSourceType(params)
    if (rtn.code === 1) {
      commit(types.DATA_SOURCE_TYPE_UPDATE, rtn)
    }
    return rtn
  },
  async nameCountDataSourceType({ commit, state }, params) {
    let rtn = await api.nameCountDataSourceType(params)
    if (rtn.code === 1) {
      commit(types.DATA_SOURCE_TYPE_COUNT_NAME, rtn)
    }
    return rtn
  }

}

const mutations = {
  [types.DATA_SOURCE_TYPE](state, { data }) {
    state.dataSourceType = data
  },
  [types.DATA_SOURCE_TYPE_ADD](state, { msg }) {
    state.dataSourceTypeAdd = msg
  },
  [types.DATA_SOURCE_TYPE_DEL](state, { data }) {
    state.dataSourceTypeDel = data
  },
  [types.DATA_SOURCE_TYPE_UPDATE](state, { msg }) {
    state.dataSourceTypeUpdate = msg
  },
  [types.DATA_SOURCE_TYPE_COUNT_NAME](state, { data }) {
    state.dataSourceTypeNameCount = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
