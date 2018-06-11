const Setting = r => require.ensure([], () => r(require('@/view/personalSetting/index')), 'setting')
const Attentionlist = r => require.ensure([], () => r(require('@/view/personalSetting/attentionlist')), 'setting')
const Companymonitoring = r => require.ensure([], () => r(require('@/view/personalSetting/companymonitoring')), 'setting')
const DataCategory = r => require.ensure([], () => r(require('@/view/personalSetting/dataCategory')), 'setting')
const DataOrignList = r => require.ensure([], () => r(require('@/view/personalSetting/dataOrignList')), 'setting')
const DataOrignAudit = r => require.ensure([], () => r(require('@/view/personalSetting/dataOrignAudit')), 'setting')
const PersonalInfor = r => require.ensure([], () => r(require('@/view/personalSetting/personalInfor')), 'setting')
const UserManage = r => require.ensure([], () => r(require('@/view/personalSetting/userManage')), 'setting')
const EarlyWarning = r => require.ensure([], () => r(require('@/view/personalSetting/earlyWarning')), 'setting')
const EarlyWarningSet = r => require.ensure([], () => r(require('@/view/personalSetting/earlyWarningSet')), 'setting')
const PunlicLabel = r => require.ensure([], () => r(require('@/view/personalSetting/punlicLabel')), 'setting')
const PrivateLabel = r => require.ensure([], () => r(require('@/view/personalSetting/privateLabel')), 'setting')
const AppendFirm = r => require.ensure([], () => r(require('@/view/personalSetting/appendFirm')), 'setting')
const NewestChange = r => require.ensure([], () => r(require('@/view/personalSetting/newestChange')), 'setting')
const DataDispose = r => require.ensure([], () => r(require('@/view/personalSetting/dataDispose')), 'setting')
const DataApply = r => require.ensure([], () => r(require('@/view/personalSetting/dataApply')), 'setting')
const EntRecord = r => require.ensure([], () => r(require('@/view/personalSetting/entRecord')), 'setting')

export default {
  path: 'setting',
  component: Setting,
  children: [{
    path: 'attentionlist',
    component: Attentionlist
  },
  {
    path: 'companymonitoring',
    component: Companymonitoring
  },
  {
    path: 'dataCategory',
    component: DataCategory
  },
  {
    path: 'dataOrignList',
    component: DataOrignList
  },
  {
    path: 'dataOrignAudit',
    component: DataOrignAudit
  },
  {
    path: 'dataDispose',
    component: DataDispose
  },
  {
    path: 'dataApply',
    component: DataApply
  },
  {
    path: 'personalInfor',
    component: PersonalInfor
  },
  {
    path: 'userManage',
    component: UserManage
  },
  {
    path: 'earlyWarning',
    component: EarlyWarning
  },
  {
    path: 'EarlyWarningSet/:id',
    component: EarlyWarningSet
  },
  {
    path: 'EarlyWarningSet',
    component: EarlyWarningSet
  },
  {
    path: 'punlicLabel',
    component: PunlicLabel
  },
  {
    path: 'privateLabel',
    component: PrivateLabel
  },
  {
    path: 'appendFirm',
    component: AppendFirm
  },
  {
    path: 'newestChange',
    component: NewestChange
  },
  {
    path: 'addEntRecord',
    component: EntRecord,
    name: 'entSyncList'
  }
  ]
}
