import http from '../request'

export default {
  /**
   * 入住园区列表页
   */
  getPark(params) {
    return http.post('/parkInfo/selectList', params)
  },
  /**
   * 区域列表
   */
  areaList(params) {
    return http.post('/parkInfo/areaList', params)
  },
  /**
   * 注册验证码
   */
  getCode(params) {
    return http.post('/sms/different', params)
  },
  /**
   * 检查用户是否存在
   */
  findByUser(params) {
    return http.post('/user/findByUserNameAndUserType', params)
  },
  /**
   * 注 册
   */
  register(params) {
    return http.post('/user/addUser', params)
  },
  /**
   * 获取用户信息
   */
  getInformation(params) {
    return http.post('/user/userInfo', params)
  },
  /**
   * 更改用户信息
   */
  updateSysUser(params) {
    return http.post('/user/updateSysUser', params)
  }
}
