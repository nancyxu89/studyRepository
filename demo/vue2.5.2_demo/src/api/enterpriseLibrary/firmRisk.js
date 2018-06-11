import http from '../request'

export default {
  /**
     * 工商变更分页列表
      BusinessChangeInfoList(params) {
        return http.post('/datacenterRisk/findBusinessChangeInfoList', params)
      },
     */
  BusinessChangeInfoList(params) {
    return http.post('/entChangeInfo/list', params, 'new')
  },
  /**
     * 企业经营异常信息
      BusinessExceptionList(params) {
        return http.post('/realTimeData/findBusinessException', params)
      },
     */
  BusinessExceptionList(params) {
    return http.post('/entOperationExceptionInfo/list', params, 'new')
  },
  /**
     * 失信记录分页列表
      DishonestyEntInfoList(params) {
        return http.post('/datacenterRisk/findDishonestyEntInfoList', params)
      },
     */
  DishonestyEntInfoList(params) {
    return http.post('/realTimeData/findBreakFaith', params, 'new')
  },
  /**
     * 处罚记录分页列表
      PunishEntInfoList(params) {
        return http.post('/datacenterRisk/findPunishEntInfoList', params)
      },
     */
  PunishEntInfoList(params) {
    return http.post('/realTimeData/findAdminPenaltyInfo', params, 'new')
  },
  /**
     * 诉讼记录分页列表
      SuitEntInfoList(params) {
        return http.post('/datacenterRisk/findSuitEntInfoList', params)
      }
     */
  SuitEntInfoList(params) {
    return http.post('/realTimeData/findRefereeDocuments', params, 'new')
  }
}
