import PersonCenter from './personCenter'
import UserInfo from './userInfo'
import CorporDetail from './corporDetail'
import {AUTHS} from '../assets/js/pageAuth.js'
import {Types} from '../assets/js/types'
const Layout = r =>
  require.ensure([], () => r(require('@/view/layout')), 'Home')
const Home = r =>
  require.ensure([], () => r(require('@/view/zshome/home')), 'Home')
const HomeQ = r =>
  require.ensure([], () => r(require('@/view/home/homepageE')), 'HomeQ')
const notfound = r =>
  require.ensure([], () => r(require('@/view/errorPage/404')), 'Home')
const PrecisionInvestment = r =>
  require.ensure(
    [],
    () => r(require('@/view/precisionInvestment/precisionInvestment')),
    'Home'
  )
const IndustryChainIndex = r =>
  require.ensure(
    [],
    () => r(require('@/view/industryChain/index')),
    'industrychain'
  )
const AreaAnalysis = r =>
  require.ensure(
    [],
    () => r(require('@/view/industryChain/areaAnalysis')),
    'industrychain'
  )
const ChainFinancial = r =>
  require.ensure(
    [],
    () => r(require('@/view/industryChain/chainFinancial')),
    'industrychain'
  )
const ParkAnalysis = r =>
  require.ensure(
    [],
    () => r(require('@/view/industryChain/parkAnalysis')),
    'industrychain'
  )
const RecommendedEnt = r =>
  require.ensure(
    [],
    () => r(require('@/view/industryChain/recommendedEnt')),
    'industrychain'
  )

const GuestIndex = r =>
  require.ensure([], () => r(require('@/view/guest/index')), 'guest')
const GuestLayout = r =>
  require.ensure([], () => r(require('@/view/guest/layout')), 'guest')
const GuestEnter = r =>
  require.ensure([], () => r(require('@/view/guest/enter')), 'guest')
const GuestConnect = r =>
  require.ensure([], () => r(require('@/view/guest/connect')), 'guest')
const GuestAbout = r =>
  require.ensure([], () => r(require('@/view/guest/about')), 'guest')
// const TestValidate = r =>
//   require.ensure([], () => r(require('@/view/testValidate')), 'guest')

const asyncRouters = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'index',
        component: GuestIndex,
        meta: {
          requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
        }
      },
      {
        path: 'home',
        component: Home,
        meta: {
          auth: AUTHS.GOverview,
          userType: Types.GardenType
        }
      },
      {
        path: 'home_q',
        component: HomeQ,
        meta: {
          auth: AUTHS.QOverview,
          userType: Types.EntType
        }
      },
      {
        path: 'precisionInvestment',
        component: PrecisionInvestment,
        meta: {
          auth: AUTHS.Accurate,
          userType: Types.GardenType
        }
      },
      {
        path: 'industryChain',
        component: IndustryChainIndex,
        meta: {
          auth: AUTHS.Chain,
          userType: Types.GardenType
        },
        children: [
          {
            path: 'areaAnalysis',
            name: 'areaAnalysis',
            component: AreaAnalysis
          },
          {
            path: 'parkAnalysis',
            component: ParkAnalysis
          },
          {
            path: 'chainFinancial',
            component: ChainFinancial,
            meta: {
              isDisabledEnter: true
            }
          },
          {
            path: 'recommendedEnt',
            component: RecommendedEnt,
            meta: {
              isDisabledEnter: true
            }
          }
        ]
      },
      ...CorporDetail,
      ...PersonCenter,
      ...UserInfo
    ]
  }
]

export const constantRouterMap = [
  {
    path: '/index',
    name: 'index',
    component: GuestIndex,
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
    }
  },
  // {
  //   path: '/testValidate',
  //   name: 'testValidate',
  //   component: TestValidate,
  //   meta: {
  //     requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
  //   }
  // },
  {
    // name: 'common',
    path: '/common',
    component: GuestLayout,
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
    },
    children: [
      {
        name: 'guestEnter',
        path: 'enter',
        component: GuestEnter,
        meta: {
          requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
        }
      },
      {
        name: 'guestConnect',
        path: 'connect',
        component: GuestConnect,
        meta: {
          requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
        }
      },
      {
        name: 'guestAbout',
        path: 'about',
        component: GuestAbout,
        meta: {
          requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
        }
      },
      {
        path: '',
        redirect: '/index'
      }
    ]
  },
  ...getAuthRoutes(asyncRouters),
  {
    name: 'notfound',
    path: '/404',
    component: notfound,
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
    }
  }
]

export const asyncRouterMap = asyncRouters

export const notfoundRouter = {
  path: '**',
  redirect: '/404',
  meta: {
    requireAuth: false
  }
}

/**
 * 通过权限判断，获取有权限的路由集合
 */
function getAuthRoutes(routes) {
  let routerMap = []
  for (var i = 0; i < routes.length; i++) {
    let route = getRoute(routes[i])
    if (route) {
      routerMap.push(route)
    }
  }
  if (routerMap.length) {
    routerMap.push({
      path: '',
      redirect: routerMap[0].path
    })
  }
  return routerMap

  /**
   * 构造路由对象
   */
  function buildRoute(route) {
    let router = {
      name: route.name,
      path: route.path,
      component: route.component,
      meta: route.meta
    }
    if (route.redirect) {
      router.redirect = route.redirect
    }
    if (route.meta && route.meta.isDisabledEnter) {
      router.beforeEnter = (to, from, next) => {
        next(false)
      }
    }
    return router
  }

  /**
   * 路由权限验证
   */
  function getRoute(route) {
    var newRoute = null
    // let auth = true
    // // 判断是否有权限访问路由
    // if (route.meta && route.meta.auth) {
    //   auth = hasAuth(route.meta.auth)
    // }
    //
    // if (auth) {
    newRoute = buildRoute(route)
    if (route.children) {
      // 如果有子路由，循环调用获取有权限的路由
      let children = getAuthRoutes(route.children)
      if (children && children.length) {
        newRoute.children = children
      }
      // }
    }
    return newRoute
  }
}
