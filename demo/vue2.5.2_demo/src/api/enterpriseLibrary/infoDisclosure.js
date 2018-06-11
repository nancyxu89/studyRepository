import http from '../request'

export default {
  /**
   * 获取高管人员信息列表
   * @param {Authorization} param 用户验证token标志
   * @param {entName} param 主体企业名称
   * @param {entId} param 主体企业id
   */
  getSeniorExecutive(param) {
    return http.post('/realTimeData/findLisComSeniorExecutive', param)
  },

  /**
   * 获取十大股东信息列表
   * @param {Authorization} param 用户验证token标志
   * @param {entName} param 主体企业名称
   * @param {entId} param 主体企业id
   */
  getShareholder(param) {
    return http.post('/realTimeData/findLisComTenShareholder', param)
  },

  /**
   * 获取公司基本信息列表
   * @param {Authorization} param 用户验证token标志
   * @param {entName} param 主体企业名称
   * @param {entId} param 主体企业id
   */
  getBaseInfo(param) {
    return http.post('/realTimeData/findListedCompanyInfo', param)
  }
}
