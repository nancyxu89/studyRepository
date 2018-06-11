import http from '../request'

export default {
  /**
   * 数据源处理查询
   *
   * @param {any} params
   * @returns
   */
  dataSourcePage(params) {
    return http.post('/dataSourceCheck/selectList', params)
  },
  /**
   * 数据源处理通过
   *
   * @param {any} params
   * @returns
   */
  dataSourcePass(params) {
    return http.post('/dataSourceCheck/pass', params)
  },
  /**
   * 数据源处理拒绝
   *
   * @param {any} params
   * @returns
   */
  dataSourceRefused(params) {
    return http.post('/dataSourceCheck/refused', params)
  }
}
