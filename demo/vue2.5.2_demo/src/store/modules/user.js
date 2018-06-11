import {user as api} from '../../api'
import * as types from '../mutation-types'
import {menuList} from '../../assets/js/marks'

const state = {
  userInfo: {},
  latest: '',
  auths: {}
}

const getters = {
  token(state) {
    return state.userInfo.token
  },
  isLogin(state) {
    return !!state.userInfo.token
  },
  userType(state) {
    return state.userInfo.userType
  }
}

const actions = {
  /**
   * 用户登录
   */
  async login({
    commit,
    state,
    dispatch
  }, params) {
    let rtn = await api.login({
      username: params.username,
      password: params.password,
      userType: params.userType
    })
    if (rtn.code === 1) {
      var user = Object.assign(rtn.data, {username: params.username, userType: params.userType})

      commit(types.USER_INFO, user)
      // 登录成功后获取用户权限
      // rtn = await dispatch('getUserAuth')
      let auths = {}
      menuList.allMenus.forEach(menu => {
        auths[menu.moduleMark] = {
          name: menu.moduleName,
          type: 'menu'
        }
      })
      commit(types.USER_AUTH, auths)
    }
    return rtn
  },
  async logout({
    commit,
    state
  }) {
    let params = {
      token: state.userInfo.token
    }
    commit(types.USER_INFO, {})
    commit(types.USER_AUTH, {})
    let rtn = await api.logout(params)
    return rtn
  },
  /**
   * 获取用户权限
   */
  async getUserAuth({
    commit,
    state
  }, params) {
    let rtn = await api.getAuth({
      token: state.userInfo.token
    })
    if (rtn.code === 1) {
      var auths = {}
      rtn.data.buttonList && rtn.data.buttonList.forEach(btn => {
        auths[btn.moduleMark] = {
          name: btn.moduleName,
          type: 'button'
        }
      })
      rtn.data.menuList && rtn.data.menuList.forEach(menu => {
        auths[menu.moduleMark] = {
          name: menu.moduleName,
          type: 'menu'
        }
      })
      commit(types.USER_AUTH, auths)
    }
    return rtn
  }
}

const mutations = {
  [types.USER_INFO](state, user) {
    state.userInfo = user
    setLocalStorage('userInfo', user)
  },
  [types.USER_AUTH](state, auths) {
    state.auths = auths
    setLocalStorage('auths', auths)
  }
}

// function setSessionStorage(key, value) {
//   if (value) {
//     sessionStorage.setItem(key, JSON.stringify(value))
//   } else {
//     sessionStorage.removeItem(key)
//   }
// }

function setLocalStorage(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.removeItem(key)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
