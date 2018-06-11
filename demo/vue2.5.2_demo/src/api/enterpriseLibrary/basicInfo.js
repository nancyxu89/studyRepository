import http from '../request'

export default {
  /**
     * 工商注册信息
     */
  BaseInfo(params) {
    return http.post('/realTimeData/findBaseInfo', params)
  },
  /**
     * 主要人员列表
      KeyPersonnel(params) {
        return http.post('/realTimeData/findKeyPersonnel', params)
      },
     */
  KeyPersonnel(params) {
    return http.post('/entMajorPersonInfo/list', params, 'new')
  },
  /**
     * 股东信息
  stockholder(params) {
    return http.post('/realTimeData/findCorporateShareholders', params)
  },
     */
  stockholder(params) {
    return http.post('/entShareholderInvestmentInfo/list', params, 'new')
  },
  /**
   * 数据更新
   */
  updateNew(params) {
    return http.post('/synchDataController/reCollectData', params, 'new')
  }
}
