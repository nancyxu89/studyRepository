<template>
  <div>
    <div class="select-box clearFix">
      <span>产业链分类:</span>
      <j-select v-model="category" :initItems="categories" displayKey="name" valueKey="value" :selectedIndex="initIdx" @change="change"></j-select>
      <span>地区:</span>
      <j-select v-model="area" :initItems="areas" displayKey="name" :selectedIndex="initIdx" @change="fliterChange"></j-select>

      <span class="fr download-opt">
        <i class="icon iconfont icon-xiazai"></i>报告下载</span>
    </div>

    <div class="white-box">
      <div class="block-title ">
        <span class="left-border-title">产业链发展情况</span>
      </div>
      <div class="block-content">
        <p class="mgl-30">{{categoryTxt|alternative}}产业链在{{area|alternative}}共有企业
          <span class="blue-txt bold-txt">{{situation.entCount|alternative}}</span>家，覆盖行业
          <span class="blue-txt bold-txt">{{situation.coverCount | alternative}}</span>
          个，缺失行业
          <span class="blue-txt bold-txt">{{situation.misingCount|alternative}}</span>个。</p>
        <p class="mgl-30">
          本园区该产业链入驻企业较少，行业覆盖较窄。
          <span class="bold-txt">推荐重点招商行业：</span>{{situation.investmentIndusry|alternative('array')}}</p>
      </div>
    </div>

    <div class="white-box mgt-18">
      <div class="block-title">
        <span class="left-border-title">园区产业链图谱</span>
      </div>
      <div class="block-content" v-if="treeState.code===Code.Loading||treeState.code===Code.Success">
        <div class="chainMap" id="container"></div>
      </div>
      <jPageMsg mode='f' :code="treeState.code" :msg="treeState.msg" v-else></jPageMsg>
    </div>

    <div class="white-box mgt-18">
      <div class="block-title">
        <span class="left-border-title">园区产业链现状及发展趋势</span>
      </div>
      <div class="block-content clearFix" v-if="lineState.code===Code.Loading||lineState.code===Code.Success">
        <div class="chart-box">
          <div class="legend-box fr">
            <span :class="['label',labelIdx===index?'':'white']" v-for="(label,index) in labels" v-bind:key="index" @click="toggleLabel(index)">{{label}}</span>
          </div>
          <div class="chart" id="lineChart"></div>
        </div>
        <div class="brief-intro">{{instructions}}</div>
      </div>
      <jPageMsg mode='f' :code="lineState.code" :msg="lineState.msg" v-else></jPageMsg>
    </div>

    <div class="white-box">
      <div class="block-title ">
        <span class="left-border-title">产业链企业预警报告</span>
      </div>
      <div class="block-content mgl-40 summarize">{{situation.warning||'暂无数据'}}</div>
    </div>

    <div class="white-box mgt-18">
      <div class="block-title">
        <span class="left-border-title">总结</span>
      </div>
      <div class="block-content mgl-40 summarize">{{situation.summary||'暂无数据'}}</div>
    </div>
  </div>
</template>
<script>
import { jSelect, jPageMsg } from '../../components'
import '../../../static/js/d3.layout'
import { parkAnalysis as api } from '../../api'
import { Code } from '../../assets/js/operaCode'
import { AreaLine } from '../../assets/js/area-line'
let queryHandle = 0
export default {
  components: { jSelect, jPageMsg },
  data() {
    return {
      lineState: {
        code: Code.Loading,
        msg: ''
      },
      treeState: {
        code: Code.Loading,
        msg: ''
      },
      Code: Code,
      initIdx: 0,
      categoryTxt: '',
      area: '',
      category: '',
      labelIdx: 0,
      count: 0,
      labels: ['近五年', '近一年', '近一月'],
      situation: {},
      instructions: ''
    }
  },
  computed: {
    params() {
      return { industryTypeId: this.category, regionId: this.area }
    },
    categories() {
      let categories = this.$store.state.categories
      if (categories.length === 0) {
        return [{ name: '', value: '' }]
      }
      return [].concat(...categories)
    },
    areas() {
      return this.$store.state.areas
    }
  },
  methods: {
    change(val) {
      this.categoryTxt = val.name
      this.fliterChange()
    },
    fliterChange() {
      if (this.count < 2) {
        this.count++
      }
      if (this.count === 2) {
        this.getSituation()
        if (queryHandle) {
          clearTimeout(queryHandle)
        }
        queryHandle = setTimeout(() => {
          this.getAtlas()
          this.getTrend()
        }, window.handleDelay)
      }
    },
    toggleLabel(idx) {
      if (this.labelIdx === idx) {
        return
      }
      this.labelIdx = idx
      this.getTrend(idx + 1)
    },
    getSituation() {
      api.getSituation(this.params).then(rst => {
        this.situation = rst.data
        this.situation.summary = rst.data.summary || ''
        this.situation.warning = rst.data.warning || ''
      })
    },
    getAtlas() {
      api
        .getAtlas(this.params)
        .then(rst => {
          setTimeout(() => {
            let jusfD3Tree = require('../../../static/js/concept-graph')
            let tree = jusfD3Tree.CollapsibleTree.drawTree('container')
            tree.init(rst.data)
            tree.clickCallback = d => {
              /**
               * 新开窗口,跳转至企业库
               */
              window.open(
                `${window.location.origin}${
                  window.location.pathname
                }#/corpor?industryTypeId=${this.category}&industryId=${
                  d.industryId
                }&type=2`
              )
            }
            this.treeState.code = Code.Success
          }, 0)
        })
        .catch(err => {
          this.treeState = err
        })
    },
    getTrend(type = 1) {
      api
        .getTrend({ ...this.params, type: type })
        .then(rst => {
          AreaLine.drawAearLine(rst.data, 'lineChart', this.$echarts)
          this.instructions = rst.data.instructions
          this.lineState.code = Code.Success
        })
        .catch(err => {
          console.info(err)
          this.lineState = err
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/analysis.less';
</style>
