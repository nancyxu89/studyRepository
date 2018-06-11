import http from './request'

export default {
  /**
     * 获取项目企业列表
     */
  getProjectEnts(params) {
    return http.post('/homeList/list', params)
  },
  getEntListByKeyword(params) {
    return http.post('/homeGanged/list', params)
  }
}
