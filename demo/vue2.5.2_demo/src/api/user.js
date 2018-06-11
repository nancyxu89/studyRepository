import http from './request'

export default {
  /**
   * 登录
   */
  login(params) {
    return http.post('/login', params)
  },
  /**
   * 退出
   */
  logout(params) {
    return http.post('/logout', params)
  },
  /**
   * 获取用户权限
   */
  getAuth(params) {
    return http.post('/user/menuInfo', params)
  },
  /**
   * 获取用户个人信息
   * @param params
   * @returns {*}
   */
  getUserInfo(params) {
    return http.post('/user/userInfo', params)
  },
  /**
   * 保存用户修改信息
   * @param params
   * @returns {*}
   */
  saveUserInfo(params) {
    return http.post('/user/updateSysUser', params)
  },
  /**
   * 保存用户修改信息
   * @param params
   * @returns {*}
   */
  updateUserPsw(params) {
    return http.post('/user/updateSysUserInfo', params)
  }
}
