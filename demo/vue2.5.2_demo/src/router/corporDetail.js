/**
 * 企业库路由地址
 **/

import {AUTHS} from '../assets/js/pageAuth.js'
import {Types} from '../assets/js/types'
const basicMsg = r => require.ensure([], () => r(require('@/view/cooperVue/basicMsg')), 'corporDetail')
const businessRisk = r => require.ensure([], () => r(require('@/view/cooperVue/businessRisk')), 'corporDetail')
const customTag = r => require.ensure([], () => r(require('@/view/cooperVue/customTag')), 'corporDetail')
const exposeMsg = r => require.ensure([], () => r(require('@/view/cooperVue/exposeMsg')), 'corporDetail')
const intangibleAssets = r => require.ensure([], () => r(require('@/view/cooperVue/intangibleAssets')), 'corporDetail')
const investmentsAbroad = r => require.ensure([], () => r(require('@/view/cooperVue/investmentsAbroad')), 'corporDetail')
const atlas = r => require.ensure([], () => r(require('@/view/cooperVue/atlas')), 'corporDetail')
const opinionDynamic = r => require.ensure([], () => r(require('@/view/cooperVue/opinionDynamic')), 'corporDetail')
const affiliateOpinion = r => require.ensure([], () => r(require('@/view/cooperVue/affiliateOpinion')), 'corporDetail')
const companyListPage = r => require.ensure([], () => r(require('@/view/cooperVue/companyListPage')), 'corporDetail')
const companyDetail = r => require.ensure([], () => r(require('@/view/cooperVue/companyDetail')), 'corporDetail')
const selfDefineFirm = r => require.ensure([], () => r(require('@/view/cooperVue/selfDefineFirm')), 'corporDetail')
const annualReport = r => require.ensure([], () => r(require('@/view/cooperVue/annualReport')), 'corporDetail')
const opinion = r => require.ensure([], () => r(require('@/view/cooperVue/opinion')), 'corporDetail')
const selfDefine = r => require.ensure([], () => r(require('@/view/cooperVue/selfDefineTags')), 'corporDetail')

export default [{
  path: 'corpor',
  name: 'entList',
  component: companyListPage,
  meta: {
    auth: AUTHS.EntLib,
    userType: Types.GardenType
  }
}, {
  path: 'corpor/:id',
  component: companyDetail,
  meta: {
    auth: AUTHS.EntDetail,
    userType: Types.GardenType
  },
  children: [
    {
      path: 'basicMsg',
      name: 'entBaseInfo',
      component: basicMsg
    }, {
      path: 'businessRisk',
      name: 'entRisk',
      component: businessRisk
    }, {
      path: 'selfDefine',
      component: selfDefine,
      children: [{
        path: 'customTag',
        name: 'entCustomTag',
        component: customTag
      }, {
        path: 'selfDefineFirm',
        name: 'entSelfDefineFirm',
        component: selfDefineFirm
      }]
    }, {
      path: 'exposeMsg',
      name: 'entExposeMsg',
      component: exposeMsg
    }, {
      path: 'intangibleAssets',
      name: 'entAssets',
      component: intangibleAssets
    }, {
      path: 'investmentsAbroad',
      name: 'entInvestment',
      component: investmentsAbroad
    }, {
      path: 'atlas',
      name: 'entAtlas',
      component: atlas
    },
    {
      path: 'opinion',
      component: opinion,
      children: [
        {
          path: 'dynamic',
          name: 'entDynamicOpinion',
          component: opinionDynamic
        }, {
          path: 'affiliate',
          name: 'entAffiliateOpinion',
          component: affiliateOpinion
        }]
    },
    {
      path: 'annualReport',
      name: 'entAnnualReport',
      component: annualReport
    }]
}]
