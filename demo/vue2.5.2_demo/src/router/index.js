import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {constantRouterMap} from './router'
import {hasAuth} from '../assets/js/auth'

Vue.use(Router)
// 装载静态路由，不需要权限验证
let router = new Router({
  // mode: 'history',
  routes: constantRouterMap,
  linkActiveClass: 'selected'
})

store.dispatch('refresh')

router.beforeEach((to, from, next) => {
  // 支持单点登录
  var infoStr = location.search.slice(1)
  var infoJson = {}
  infoStr.split('&').forEach(item => {
    var arr = item.split('=')
    infoJson[arr[0]] = arr[1]
  })
  if (infoJson.username && infoJson.password) {
    var params = {
      username: infoJson.username,
      password: infoJson.password
    }
    var rtn = store.dispatch('login', params)
    rtn
      .then(data => {
        window.location.href = `${window.location.origin}${window.location.pathname}#/index`
      })
      .catch(() => {
        window.location.href = `${window.location.origin}${window.location.pathname}#/index`
      })
  } else {
    // 验证是否登录
    let isLogin = to.meta.requireAuth === false || store.getters.isLogin
    let userType = store.getters.userType

    // 验证是否有权限
    if (isLogin) {
      var auth = true
      if (to.meta.auth) {
        var authKey = to.meta.auth
        if (Object.prototype.toString.apply(authKey) === '[object Function]') {
          authKey = authKey(to)
        }
        let hasauth = hasAuth(authKey)
        auth = hasauth && userType && userType === to.meta.userType
      }
      if (auth) {
        next()
      } else {
        next({
          path: '/404',
          query: {
            r: to.fullPath
          }
        })
      }
    } else {
      /**
       * 增加游客身份后
       * @type {boolean|*}
       */
      var isNeedLogin = to.meta.requireAuth
      if (isNeedLogin === false) {
        next()
      } else {
        next({
          path: '/index'
          //   query: {
          //   r: to.fullPath
          // }
        })
      }
    }
  }
})

export default router
