/**
 * 下载表格
 */
import http from './request'

export default{
  /**
   * 下载表格数据
   * @param params
   */
  async downLoadForm(params) {
    http.post('/opinion/downloadList', params)
  },
  /**
   * 下载图片
   * @param params
   */
  async downLoadChart(params) {
    http.post('/opinion/downloadList', params)
  }
}
