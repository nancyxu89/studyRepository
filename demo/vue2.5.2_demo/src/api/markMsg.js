import http from './request'

export default {
  /**
   * 企业备注
   */
  addMark(params) {
    return http.post('/remark/add', params)
  },
  /**
   *
   * @param {企业Id} entId
   */
  getMartMsg(params) {
    return http.post('/remark/query', params)
  }
}
