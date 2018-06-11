import http from '../request'

export default {
  /**
   * 产业链发展情况
   */
  getSituation(params) {
    return http.post('/parkIndustry/developmentOverview', params)
  },
  /**
   * 园区产业链图谱
   */
  getAtlas(params) {
    return http.post('/parkIndustry/graph', params)
  },
  /**
   * 园区产业链现状及发展趋势
   */
  getTrend(params) {
    return http.post('/parkIndustry/industryTrend', params)
  }
}
