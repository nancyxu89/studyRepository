import http from '../request'

export default {
  /**
   * 企业库
   */
  getEntlibList(params) {
    return http.post('/entLibrary/list', params, 'new')
  }
}
