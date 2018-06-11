import http from './request'

export default {
  /**
     * 获取最新变动信息方法
     * @param {riskType：number} params
     * 12--17对应（诉讼记录，处罚记录，失信记录，工商变更，商标信息，专利信息），不填写参数默认为全部
     */
  getChangeInfo(params) {
    return http.post('/monitorLatestChange/selectList', params)
  },

  /**
     * 获取当前监控企业信息数据
     * @param {无参数} params
     */
  getMonitorInfo(params) {
    return http.post('/moniorMessageStatistics/selectList', params)
  },

  /**
     * 企业是否被监控
     * @param {*} params
     */
  isMonitor(params) {
    return http.post('/moniorMessageStatistics/checkEnt', params)
  },

  /**
     * 取消监控方法
     * @param {entId} params 企业id
     */
  cancelMonitor(params) {
    return http.post('/moniorMessageStatistics/delete', params)
  },

  /**
     * 添加监控保存
     * @param {entIds} params 可以是以 ','分割的字符串，多个企业id
     */
  addMonitor(params) {
    return http.post('/moniorMessageStatistics/add', params)
  },

  /**
     * 查询关注列表数据
     * @param {pageNum} params 当前页
     * @param {pageSize} params 每页显示条数
     * @param {qName} params 模糊查询字段名
     * @param {projectTypeID} params 项目类型
     */
  queryFollowList(params) {
    return http.post('/myAttention/list', params)
  },

  /**
     * 预警推送列表接口
     * @param {参数详见接口文档，全部为通用参数} param
     */
  warningPushList(params) {
    return http.post('/monitorWarningSet/selectList', params)
  },

  /**
     * 预警推送添加
     * @param {预警名称} params name
     * @param {email} params email
     * @param {tel} params tel
     * @param {推送平率类型: 即时46,每日47,每周48,每月49} params frequency
     * @param {推送时间_时 0,1,2,3…23 } params hour
     * @param {推送时间_周 1,2,3,4,5,6,7} params week
     * @param {推送时间_月 1,2,3,4…12} params month
     * @param {推送有效期类型,长期：50，自定义：51} params validPeriod
     * @param {推送有效期开始时间 格式：2017-03-03 00:00:00} params validStart
     * @param {推送有效期结束时间 格式：2017-03-03 00:00:00} params validEnd
     * @param {风险及变更信息类别,诉讼,处罚,失信等多个用,分开} params riskWorningType
     * @param {舆情预警关键词，多个用，} params opinionWarningKeyword
     * @param {预警推送状态42开启43关闭} params status
     * @param {关联企业entId， 用“,” 分割} params entName
     */
  warningPushAdd(params) {
    return http.post('/monitorWarningSet/add', params)
  },

  /**
     * 预警推送删除
     * @param {id} params id
     */
  warningPushDelete(params) {
    return http.post('/monitorWarningSet/delete', params)
  },

  /**
     * 预警推送修改
     * @param {参数同预警推送添加} params
     */
  warningPushUpdate(params) {
    return http.post('/monitorWarningSet/update', params)
  },

  /**
     * 获取私有标签
     * @param {*} param
     */
  getPrivateLabel(param) {
    return http.post('/opinionPrivateKeyword/list', param)
  },

  /**
     * 获取公有标签
     * @param {*} param
     */
  getPublicLabel(param) {
    return http.post('/mbdOpinionKeyword/list', param)
  }
}
