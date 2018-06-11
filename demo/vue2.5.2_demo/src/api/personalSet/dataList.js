import http from '../request'

export default {
  /**
   * 数据源列表查询
   *
   * @param {any} params
   * @returns
   */
  dataSourcePage(params) {
    return http.post('/data/dataSource/selectList', params)
  },
  /**
   * 数据源列表删除
   *
   * @param {any} params
   * @returns
   */
  dataSourceDelById(params) {
    return http.post('/data/dataSource/delete', params)
  },
  /**
   * 数据源类型查询
   *
   * @returns
   */
  dataSourceTypeList() {
    return http.post('/dataSourceType/list')
  }
}
