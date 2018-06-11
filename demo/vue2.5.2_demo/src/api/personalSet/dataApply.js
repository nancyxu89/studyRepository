import http from '../request'

export default {
  /**
   * 数据源申请查询
   *
   * @param {any} params
   * @returns
   */
  dataSourcePage(params) {
    return http.post('/dataSourceCheck/selectList', params)
  },
  /**
   * 数据源申请删除
   *
   * @param {any} params
   * @returns
   */
  dataSourceDelById(params) {
    return http.post('/data/dataSource/delete', params)
  },
  /**
   * 数据源申请更新
   *
   * @param {any} params
   * @returns
   */
  dataSourceUpdate(params) {
    return http.post('/data/dataSource/update', params)
  },
  /**
   * 数据源申请添加
   *
   * @param {any} params
   */
  dataSourceAdd(params) {
    return http.post('/data/dataSource/insert', params)
  }
}
