import http from '../request'

export default {
  /**
     * 对外投资信息列表
      externalInvest(params) {
        return http.post('/realTimeData/findEntForeignInvestment', params)
      }
     */
  externalInvest(params) {
    return http.post('/entOutInvestmentInfo/list', params, 'new')
  }
}
