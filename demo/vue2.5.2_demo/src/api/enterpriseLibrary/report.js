import http from '../request'

export default {
  /**
   * 获取企业年报信息
   */
  getFirmAnnals(param) {
    return http.post('/realTimeData/findEnterpriseAnnual', param)
  }
}
