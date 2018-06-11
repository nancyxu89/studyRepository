import http from './request'

export default {

  /**
     * 数据源类型列表
     */
  getDataSourceType(params) {
    return http.post('/dataSourceType/selectList', params)
  },
  /**
     * 添加数据源类型
     */
  addDataSourceType(params) {
    return http.post('/dataSourceType/insert', params)
  },
  /**
     * 删除数据源类型列表
     */
  delDataSourceType(params) {
    return http.post('/dataSourceType/delete', params)
  },
  /**
     * 更新数据源类型列表
     */
  updateDataSourceType(params) {
    return http.post('/dataSourceType/update', params)
  },
  /**
     * 添加数据源类型名称查重
     */
  nameCountDataSourceType(params) {
    return http.post('/dataSourceType/countName', params)
  }
}
