import http from './request'

export default {
  /**
   * 获取系统枚举值
   */
  getEnum(param) {
    return http.post('/dictionaryInfo/selectDicInfo')
  }

}
