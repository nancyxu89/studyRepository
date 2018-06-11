import { personalSetting as api } from '../../api'
// import * as types from '../mutation-types'

const state = {
  tableList: {},
  warningPushTable: [],
  MonitorComponyList: [],
  isMonitorTooltipShow: false,
  isMonitorComponyListRefresh: false
}
// const warningType = [{
//   'dictionaryId': 12,
//   'showName': '诉讼记录'
// },
// {
//   'dictionaryId': 13,
//   'showName': '处罚记录'
// },
// {
//   'dictionaryId': 14,
//   'showName': '失信记录'
// },
// {
//   'dictionaryId': 15,
//   'showName': '工商变更'
// },
// {
//   'dictionaryId': 16,
//   'showName': '商标信息'
// },
// {
//   'dictionaryId': 17,
//   'showName': '专利信息'
// }]

const actions = {
  async getChangeInfo({ commit }, params) {
    let rtn = await api.getChangeInfo(params)
    commit('TABLE_LIST', rtn)
    return rtn
  },
  async getMonitorComponyList({ commit }, params) {
    let rtn = await api.getMonitorInfo(params)
    rtn.data.list.forEach(function(item) {
      item.latestChangeDate = exchangeDate(item.latestChangeDate)
    })
    commit('MONITOR_COMPONY_LIST', rtn)
    return rtn
  },
  async getWarningPushTable({ commit }, params) {
    let rtn = await api.warningPushList(params)
    rtn.data.list.forEach(function(item) {
      item.validStart = exchangeDate(item.validStart)
      item.opinionWarningKeyword = item.riskWorningTypeName || '-'
      item.status = item.status === 42 ? '开启' : '关闭'
    })
    commit('WARNING_PUSH_TABLE', rtn)
    return rtn
  },
  MonitorTooltipShow({ commit }) {
    commit('MONITOR_TOOLTIP_SHOW')
  },
  MonitorTooltipHide({ commit }) {
    commit('MONITOR_TOOLTIP_HIDE')
  }
}

const mutations = {
  TABLE_LIST(state, rtn) {
    state.tableList = rtn
  },
  MONITOR_TOOLTIP_SHOW(state) {
    state.isMonitorTooltipShow = true
  },
  MONITOR_TOOLTIP_HIDE(state) {
    state.isMonitorTooltipShow = false
  },
  MONITOR_COMPONY_LIST(state, rtn) {
    state.MonitorComponyList = rtn
  },
  WARNING_PUSH_TABLE(state, rtn) {
    state.warningPushTable = rtn
  }
}

export default {
  state,
  actions,
  mutations
}

function exchangeDate(date) {
  if (!date) return
  var d = new Date(date)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}

// function exchangeWarningType(types) {
//   var typeArrNumber = types.split(',')
//   var typeArr = []
//   typeArrNumber.forEach(function(item) {
//     if (+item < 12 || +item > 17) return
//     var temporary = warningType.find(function(obj) {
//       return obj.dictionaryId === item
//     }).showName
//     typeArr.push(temporary)
//   })
//   return typeArr === '' ? '-' : typeArr.join(',')
// }
