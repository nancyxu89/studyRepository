import { common } from '../api'
import * as types from './mutation-types'

export default {
  init({ dispatch, commit }) {
    dispatch('getEnum')
  },
  reset({ dispatch }) {
    localStorage.removeItem('userInfo')
  },
  /**
   * 页面刷新
   */
  refresh({ commit }) {
    let storage = localStorage
    if (storage.getItem('userInfo')) {
      let userInfo = JSON.parse(storage.getItem('userInfo'))
      commit(types.USER_INFO, userInfo)
    }
    if (storage.getItem('auths')) {
      let auths = JSON.parse(storage.getItem('auths'))
      commit(types.USER_AUTH, auths)
    }
  },
  /**
   * 获取公共枚举值
   * @param param0
   */
  async getEnum({ commit, state }) {
    var exist = new Promise(function(resolve, reject) {
      if (state.enums && state.enums.length) {
        resolve(state.enums)
      }
    })
    return Promise.race([exist, common.getEnum()]).then((rtn) => {
      if (rtn.code === 1) {
        commit(types.COM_ENUM, rtn.data)
      }
      return rtn
    })
  }

}
