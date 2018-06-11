export default {
  enums: [],
  // 项目类型
  project_type: [],
  // 舆情风险类别
  opinion_risk_type: [],
  // 工商风险类别
  business_risk_type: [],
  // 舆情权重
  weight_day_minus: [],
  // 舆情级别
  opinion_keyword_level: [],
  // 数据源审核状态
  datasource_examine_statue: [],
  // 数据源处理状态
  datasource_monitor_statue: [],
  // 企业成立年限
  ent_founding_years: [],
  // 企业注册资本
  ent_registered_capital: [],
  // 预警开启暂停
  warning_start_off: [],
  // 已删除未删除
  is_delete: [],
  // 预警推送频率
  warning_push_frequency: [],
  // 舆情变动类型
  opinion_change_type: [],
  // 企业同步状态
  ent_sync_state: [],
  // 关注状态
  attention_state: [{
    value: 1,
    text: '关注'
  }, {
    value: 2,
    text: '未关注'
  }],
  // 企业上市状态
  appear_state: [{
    value: 1,
    text: '上市企业'
  }, {
    value: 0,
    text: '非上市企业'
  }/* , {
   value: 2,
   text: '新三板'
   } */],
  location: [
    {name: '上海市'},
    {name: '广州市'},
    {name: '深圳市'},
    {name: '重庆市'},
    {name: '天津'},
    {name: '河北'},
    {name: '山西'},
    {name: '内蒙古'},
    {name: '辽宁'},
    {name: '吉林'},
    {name: '黑龙江'},
    {name: '江苏'},
    {name: '浙江'},
    {name: '安徽'},
    {name: '福建'},
    {name: '江西'},
    {name: '山东'},
    {name: '河南'},
    {name: '湖北'},
    {name: '湖南'},
    {name: '广东'},
    {name: '广西'},
    {name: '海南'},
    {name: '四川'},
    {name: '贵州'},
    {name: '云南'},
    {name: '西藏'},
    {name: '陕西'},
    {name: '甘肃'},
    {name: '宁夏'},
    {name: '新疆'}
  ],
  industry: [
    {name: '金融业'},
    {name: '房地产业'},
    {name: '采矿业'},
    {name: '制造业'},
    {name: '建筑业'},
    {name: '农林牧副渔'},
    {name: '电力、燃气及水的生产和供应业'},
    {name: '交通运输、仓储和邮政业'},
    {name: '批发和零售业'},
    {name: '住宿和餐饮业'},
    {name: '租赁和商务服务业'},
    {name: '科学研究、技术服务和地质勘查业'},
    {name: '水利、环境和公共设施管理业'},
    {name: '居民服务和其他服务业'},
    {name: '教育'},
    {name: '卫生、社会保障和社会服务业'},
    {name: '文化、体育和娱乐业'}
  ],
  // 产业链分类
  categories: [],
  areas: [{name: '宝鸡'}],
  /**
   * 主导产业
   */
  leading_industry: [],
  /**
   * 园区级别
   */
  park_level: []
}
