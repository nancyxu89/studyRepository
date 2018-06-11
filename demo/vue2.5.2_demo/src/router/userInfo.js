import {AUTHS} from '../assets/js/pageAuth.js'
import {Types} from '../assets/js/types'
const index = r => require.ensure([], () => r(require('@/view/userInfo/index')), 'userInfo')
const Tmp = r => require.ensure([], () => r(require('@/view/userInfo/personInfo')), 'userInfo')
export default[
  {
    path: 'info',
    component: index,
    meta: {
      auth: AUTHS.PersonInfo,
      userType: Types.GardenType
      // isDisabledEnter: true//配置是否禁用该路由
    },
    children: [
      {
        path: 'person',
        redirect: '/info/person/index'
      },
      {
        path: 'person/index',
        component: Tmp
      },
      {
        path: 'person/myCollect',
        component: Tmp,
        meta: {
          isDisabledEnter: true
        }
      },
      {
        path: 'garden',
        redirect: '/info/garden/baseInfo',
        meta: {
          isDisabledEnter: true
        }
      },
      {
        path: 'garden/baseInfo',
        component: Tmp,
        meta: {
          isDisabledEnter: true
        }
      },
      {
        path: 'garden/projectInfo',
        component: Tmp,
        meta: {
          isDisabledEnter: true
        }
      },
      {
        path: 'garden/enter',
        component: Tmp,
        meta: {
          isDisabledEnter: true
        }
      },
      {
        path: 'setting',
        redirect: '/info/setting/changepsw',
        meta: {
          isDisabledEnter: true
        }
      },
      {
        path: 'setting/changepsw',
        component: Tmp,
        meta: {
          isDisabledEnter: true
        }
      }
    ]
  }]
