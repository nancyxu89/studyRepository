import {AUTHS} from '../assets/js/pageAuth.js'
import {Types} from '../assets/js/types'
const indexOther = r => require.ensure([], () => r(require('@/view/personalSetting/indexOther')), 'personCenter')
const PersonCenter = r => require.ensure([], () => r(require('@/view/personalSetting/personCenter')), 'personCenter')
const Attentionlist = r => require.ensure([], () => r(require('@/view/personalSetting/attentionlist')), 'personCenter')
const ProjectDetail = r => require.ensure([], () => r(require('@/view/personalSetting/projectDetail')), 'personCenter')
export default[{
  path: 'personCenter',
  component: indexOther,
  meta: {
    auth: AUTHS.FocusList,
    userType: Types.GardenType
  },
  children: [
    {
      path: '',
      component: PersonCenter
    },
    {
      path: 'attentionlist',
      component: Attentionlist
    },
    {
      path: ':id/projectDetail',
      component: ProjectDetail
    }
  ]
}]
