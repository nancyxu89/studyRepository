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
          <span class="bold-txt">核心产业：</span>{{situation.coreIndusry|alternative('array')}}</p>
        <p class="mgl-30">
          <span class="bold-txt">缺失产业：</span>{{situation.misingIndutry|alternative('array')}}</p>
        <p class="mgl-30">
          <span class="bold-txt">薄弱行业：</span>{{situation.weakIndusry|alternative('array')}}</p>
      </div>
    </div>

    <div class="white-box mgt-18">
      <div class="block-title">
        <span class="left-border-title">区域产业链图谱</span>
      </div>
      <div class="block-content" v-if="treeState.code===Code.Loading||treeState.code===Code.Success">
        <div class="chainMap" id="container"></div>
      </div>
      <jPageMsg mode='f' :code="treeState.code" :msg="treeState.msg" v-else></jPageMsg>
    </div>

    <div class="white-box mgt-18">
      <div class="block-title">
        <span class="left-border-title">区域产业链现状及发展趋势</span>
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
    <div class="white-box mgt-18">
      <div class="block-title clearFix">
        <span class="left-border-title">汽车产业链重大事件舆情分析</span>
        <i class="fr icon iconfont icon-liebiaoxunhuan" @click="refreshOpinion"></i>
        <span class="fr download-opt" @click="showSelfTheme">
          <i class="icon iconfont icon-xie"></i>自定义主题</span>
      </div>
      <div class="block-content" v-if="eventState.code===Code.Success&&events.length>0">
        <ul class="event-ul">
          <li v-for="(event,index) in events" v-bind:key="index">
            <p class="event-title" :title="event.theme">{{event.theme}}</p>
            <p class="event-content" :title="event.content">{{event.content}}</p>
            <div class="event-source">
              <span>采集自：
                <span>{{event.source}}</span>
              </span>
              <span>内容属性：
                <span>{{event.contentProperty}}</span>
              </span>
              <span>发布时间：
                <span>{{event.publishTime}}</span>
              </span>
              <span class="event-url">原文链接：
                <a :href="event.url" target="_blank">{{event.url}}</a>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <jPageMsg mode='f' :nodataHint="nodataHint" :code="eventState.code" :msg="eventState.msg" v-else></jPageMsg>
      <p class="loading-hint" v-show="eventState.code===Code.Loading">努力加载中...</p>
    </div>
    <div class="white-box mgt-18">
      <div class="block-title">
        <span class="left-border-title">总结</span>
      </div>
      <div class="block-content mgl-40 summarize">{{situation.summary||'暂无数据'}}</div>
    </div>

    <j-self-theme :initMsg.sync="initMsg" ref="jtheme" @makesure="makesure"></j-self-theme>
  </div>
</template>
<script>
import { jSelect, jPageMsg } from '../../components'
import jSelfTheme from '../components/jSelfTheme.vue'
import '../../../static/js/d3.layout'
import { areaAnlysis as api } from '../../api'
import { Code } from '../../assets/js/operaCode'
import { AreaLine } from '../../assets/js/area-line'
let queryHandle = 0
export default {
  components: { jSelect, jSelfTheme, jPageMsg },
  data() {
    return {
      eventState: {
        code: Code.Loading,
        msg: ''
      },
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
      labels: ['近五年', '近一年', '近一月'],
      events: [],
      situation: {},
      count: 0,
      opinionParams: {
        theme: '',
        keyword: '',
        exclusionWord: ''
      },
      instructions: '',
      nodataHint: '该主题未匹配到对应的舆情，请重新配置主题和关键词',
      initMsg: ''
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
        this.getOpinionList()
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
    showSelfTheme() {
      this.$refs.jtheme.show()
    },
    makesure(obj) {
      this.setOpinionTheme(obj)
    },
    getSituation() {
      api.getSituation(this.params).then(rst => {
        this.situation = rst.data
        this.situation.summary = rst.data.summary || ''
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
          this.lineState = err
        })
    },
    getOpinionList() {
      this.eventState.code = Code.Loading
      api
        .getOpinionList(this.opinionParams)
        .then(rst => {
          this.events = rst.data
          this.eventState.code =
            this.events.length > 0 ? Code.Success : Code.NoData
        })
        .catch(err => {
          this.eventState = err
        })
    },
    setOpinionTheme(params) {
      this.initMsg = ''
      api
        .setOpinionTheme(params)
        .then(rst => {
          this.opinionParams = params
          this.getOpinionList()
          this.$refs.jtheme.close()
        })
        .catch(err => {
          this.initMsg = err.msg
        })
    },
    refreshOpinion() {
      this.opinionParams = {}
      this.getOpinionList()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/analysis.less';
.loading-hint {
  height: 409px;
  margin-top: 30px;
  text-align: center;
}
</style>
