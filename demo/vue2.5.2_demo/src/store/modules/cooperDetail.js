import {cooperDetail as api} from '../../api'
import * as types from '../mutation-types'

const state = {
  _atlasList: {}, // 关联图谱--图形
  _companyBaseInfo: {}, // 关联图谱--企业基本信息
  _mainCompanyOpinion: {total: 0}, // 舆情动态--主体舆情--企业舆情
  _mainStaffOpinion: {total: 0}, // 舆情动态--主体舆情--主要人员舆情
  _affiliatedListOne: {total: 0}, // 关联方舆情--对外投资
  _affiliatedListTwo: {total: 0}, // 关联方舆情--企业股东
  _affiliatedListThree: {total: 0}// 关联方舆情--企业股东的对外投资
}

const getters = {
  atlasList: state => state._atlasList,
  companyBaseInfo: state => state._companyBaseInfo,
  mainCompanyOpinion: state => state._mainCompanyOpinion,
  mainStaffOpinion: state => state._mainStaffOpinion,
  affiliatedListOne: state => state._affiliatedListOne,
  affiliatedListTwo: state => state._affiliatedListTwo,
  affiliatedListThree: state => state._affiliatedListThree
}

const actions = {
  async getAtlasList({commit, state}, params) { // 关联图谱--图形
    let result = await api.getAtlasInfoList(params)
    if (result.code === 1) {
      commit(types.COOPER_DETAIL_ATLAS_INFO, result)
    }
  },
  async getCompanyBaseInfo({commit, state}, params) { // 关联图谱--企业基本信息
    let result = await api.getCompanyBaseInfo(params)
    if (result.code === 1) {
      commit(types.COOPER_DETAIL_COMPANY_BASE_INFO, result)
    }
  },
  async getMainCompanyOpinionList({commit, state}, params) { // 舆情动态--主体舆情--企业舆情
    let result = await api.getMainCompanyOpinion(params)
    if (result.code === 1) {
      commit(types.COOPER_DETAIL_COMPANY_OPINION, result)
    }
  },
  async getMainStaffOpinionList({commit, state}, params) { // 舆情动态--主体舆情--主要人员舆情
    let result = await api.getMainStaffOpinion(params)
    if (result.code === 1) {
      commit(types.COOPER_DETAIL_STAFF_OPINION, result)
    }
  },
  async getAffiliatedListOne({commit, state}, params) { // 关联方舆情--对外投资
    let result = await api.getMainStaffOpinion(params)
    if (result.code === 1) {
      commit(types.COOPER_AFFILIATED_OPINION_ONE, result)
    }
  },
  async getAffiliatedListTwo({commit, state}, params) { // 关联方舆情--企业股东
    let result = await api.getMainStaffOpinion(params)
    if (result.code === 1) {
      commit(types.COOPER_AFFILIATED_OPINION_TWO, result)
    }
  },
  async getAffiliatedListThree({commit, state}, params) { // 关联方舆情--企业股东的对外投资
    let result = await api.getMainStaffOpinion(params)
    if (result.code === 1) {
      commit(types.COOPER_AFFILIATED_OPINION_THREE, result)
    }
  }
}

const mutations = {
  [types.COOPER_DETAIL_ATLAS_INFO](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._atlasList = data
  },
  [types.COOPER_DETAIL_COMPANY_BASE_INFO](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._companyBaseInfo = data
  },
  [types.COOPER_DETAIL_COMPANY_OPINION](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._mainCompanyOpinion = data
  },
  [types.COOPER_DETAIL_STAFF_OPINION](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._mainStaffOpinion = data
  },
  [types.COOPER_AFFILIATED_OPINION_ONE](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._affiliatedListOne = data
  },
  [types.COOPER_AFFILIATED_OPINION_TWO](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._affiliatedListTwo = data
  },
  [types.COOPER_AFFILIATED_OPINION_THREE](state, {data, code, msg}) {
    data.code = code
    data.msg = msg
    state._affiliatedListThree = data
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
