import http from '../request'

export default {
  /**
   * 产业链发展情况
   */
  getSituation(params) {
    return http.post('/areaIndustry/developmentOverview', params)
  },
  /**
   * 区域产业链图谱
   */
  getAtlas(params) {
    return http.post('/areaIndustry/graph', params)
  },
  /**
   * 区域产业链现状及发展趋势
   */
  getTrend(params) {
    return http.post('/areaIndustry/industryTrend', params)
  },
  /**
   * 舆情自定义主题
   */
  setOpinionTheme(params) {
    return http.post('/areaIndustry/opinionDefine', params)
  },
  /**
   * 舆情展示
   */
  getOpinionList(params) {
    return http.post('/areaIndustry/opinionList', params)
  }
}
