import http from '../request'
/* 自定义关联企业舆情 */
export default {
  /**
     * 企业舆情
     */
  selfDefine(paramsJson) {
    return http.post('/opinionAttention/getPageList', paramsJson)
  }
}
