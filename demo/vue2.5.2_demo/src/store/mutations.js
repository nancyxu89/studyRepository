import * as types from './mutation-types'

function mapEnum(enums, t) {
  return enums.filter(e => e.type === t)
}

export default {
  [types.COM_ENUM](state, data) {
    state.enums = data.map(d => {
      return {
        name: d.showName,
        value: d.dictionaryId,
        type: d.type
      }
    })
    // 项目类型
    state.project_type = mapEnum(state.enums, 1).reverse()
    // 舆情风险类别
    state.opinion_risk_type = mapEnum(state.enums, 2)
    // 工商风险类别
    state.business_risk_type = mapEnum(state.enums, 3).reverse()
    // // 舆情权重
    // state.weight_day_minus = mapEnum(state.enums, 4)
    // // 舆情级别
    // state.opinion_keyword_level = mapEnum(state.enums, 5)
    // 数据源审核状态
    state.datasource_examine_statue = mapEnum(state.enums, 6)
    // 数据源审核状态
    state.datasource_monitor_statue = mapEnum(state.enums, 15)
    // 企业成立年限
    state.ent_founding_years = mapEnum(state.enums, 7)
    // 企业注册资本
    state.ent_registered_capital = mapEnum(state.enums, 8)
    // 预警开启暂停
    state.warning_start_off = mapEnum(state.enums, 9)
    // 已删除未删除
    state.is_delete = mapEnum(state.enums, 10)
    // 预警推送频率
    state.warning_push_frequency = mapEnum(state.enums, 11)
    // 舆情变动类型
    state.opinion_change_type = mapEnum(state.enums, 14)
    // 企业同步状态
    state.ent_sync_state = mapEnum(state.enums, 18)
    // 主导产业
    state.leading_industry = mapEnum(state.enums, 4)
    // 园区级别
    state.park_level = mapEnum(state.enums, 5)
    // 产业链分类
    state.categories = mapEnum(state.enums, 23)
  }
}
