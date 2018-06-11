import http from './request'

export default {
  /**
   * 企业库--舆情动态--主体舆情--企业舆情
   * @param params
   * @returns {*}
   */
  getMainCompanyOpinion(params) {
    return http.post('/opinion/mainOpinion', params)
  },
  /**
   * 企业库--舆情动态 1 主体舆情--主要人员舆情;2 关联方舆情
   * @param params
   * @returns {*}
   */
  getMainStaffOpinion(params) {
    return http.post('/opinionAttention/getPageList', params)
  },
  /**
   * 企业库--关联图谱--图形
   * @param params
   * @returns {*}
   */
  getAtlasInfoList(params) {
    return http.post('/mbdRelationChart/getDetail', params)
  },
  /**
   * 企业库--关联图谱--企业基本信息
   * @param params
   * @returns {*}
   */
  getCompanyBaseInfo(params) {
    return http.post('/realTimeData/findBaseInfo', params)
  }
}
