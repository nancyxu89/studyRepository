import http from './request'

export default {
  /**
   * 添加企业
   * @param {*} params
   */
  addCompany(params) {
    return http.post('/mbdBaseInfo/add', params)
  },
  /**
   * 获取自定义企业列表
   * @param {*} params
   */
  getCustomCompany(params) {
    return http.post('/mbdBaseInfo/selectList', params)
  },
  /**
   * 添加关注企业
   */
  addAttention(params) {
    return http.post('/myAttention/addAtt', params)
  },
  /**
   * 取消关注
   */
  cancelAttention(params) {
    return http.post('/myAttention/cancelAtt', params)
  },
  /**
   * 修改关注企业项目类型
   */
  modifyAttention(params) {
    return http.post('/myAttention/changeAtt', params)
  },
  /**
   * 获取关注企业列表
   * @param params
   */
  getAttentionList(params) {
    return http.post('/myAttention/list', params)
  },
  /**
   * 是否关注
   */
  IsAttention(params) {
    return http.post('/myAttention/isAttention', params)
  }
}
