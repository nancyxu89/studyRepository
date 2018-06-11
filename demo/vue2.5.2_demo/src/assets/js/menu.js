import {AUTHS} from './pageAuth'
import {Types} from './types'

export const menus = {
  gardenMenus: {
    homepage: {
      name: '总览',
      url: '/home',
      auth: AUTHS.GOverview,
      userType: Types.GardenType
    },
    publist: {
      name: '精准招商',
      url: '/precisionInvestment',
      auth: AUTHS.Accurate,
      userType: Types.GardenType
    },
    pubAnalysis: {
      name: '产业链招商',
      url: '/industryChain',
      auth: AUTHS.Chain,
      userType: Types.GardenType
    },
    entlib: {
      name: '企业库',
      url: '/corpor',
      auth: AUTHS.EntLib,
      userType: Types.GardenType
    }
  },
  entMenus: {
    homepage: {
      name: '总览',
      url: '/home_q',
      auth: AUTHS.QOverview,
      userType: Types.EntType
    }
  }

  // setting: {
  //   name: '个人中心',
  //   url: '/personCenter',
  //   auth: ''
  // }
  // setting: {
  //   name: '个人设置',
  //   url: '/setting',
  //   auth: ''
  // }
}

export const GuestMenus = [
  {name: '首页', path: '/index'},
  {name: '入驻园区', path: '/common/enter'},
  {
    name: '联系我们',
    path: '/common/connect'
  },
  {
    name: '关于我们',
    path: '/common/about'
  }
]
