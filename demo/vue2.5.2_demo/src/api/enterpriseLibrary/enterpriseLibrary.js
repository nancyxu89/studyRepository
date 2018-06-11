import http from '../request'

export default {

  /**
   * 企业库
   */
  getEntlibList(params) {
    return http.post('/entLibrary/list', params, 'new')
  },
  /**
   * 企业库--无形资产
   * 获取商标信息
   * @param {any} params
   * @returns
   */
  getBrandList(params) {
    return http.post('/realTimeData/findEntTraInfo', params, 'new')
  },
  /**
   * 企业库--无形资产
   * 获取专利信息
   * @param {any} params
   * @returns
   */
  getPatentList(params) {
    return http.post('/realTimeData/findPatentInformation', params, 'new')
  }

}
