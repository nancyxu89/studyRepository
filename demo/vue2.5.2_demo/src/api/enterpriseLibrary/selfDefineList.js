import http from '../request'
/* 自定义关联企业名单 */
export default {
  /**
   * 企业名单列表
   */
  formDataList(paramsJson) {
    return http.post('/mbdacc/list', paramsJson)
  },
  /**
   * 删除数据
  */
  deleteData(paramsJson) {
    return http.post('/mbdacc/delete', paramsJson)
  },
  /**
   * 修改数据
  */
  resetData(paramsJson) {
    return http.post('/mbdacc/update', paramsJson)
  },
  /**
   * 添加数据
   *
  */
  addData(paramsJson) {
    return http.post('/mbdacc/add', paramsJson)
  },
  /**
   * 舆情名单回显接口
   * @param {id} paramJson id Authorization
   * @param {Authorization} paramJson  用户验证token标志
   */
  queryData(param) {
    return http.post('/mbdacc/query', param)
  }
}
