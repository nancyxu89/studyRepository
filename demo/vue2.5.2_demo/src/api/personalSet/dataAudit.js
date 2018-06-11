import http from '../request'

export default {
  /**
     * 数据源审核列表
     */
  DataSelectList(params) {
    return http.post('/dataSourceCheck/selectList', params)
  },
  /**
     * 数据源审核列表页申请被拒绝
     */
  DataRefuse(params) {
    return http.post('/dataSourceCheck/refused', params)
  },
  /**
     * 数据源审核列表页数据通过
     */
  DataPass(params) {
    return http.post('/dataSourceCheck/pass', params)
  }
}
