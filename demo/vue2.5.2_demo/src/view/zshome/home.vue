<template>
  <div class="homepage">
    <div class="home_top">
      <div class="title">您好！欢迎使用招商通大数据平台</div>
      <div class="location">
          <label>定位：</label>
          <j-select class="select" v-model="location" :initItems="locations" displayKey="name" :selectedIndex="locationIdx">
          </j-select>
      </div>
      <div class="industry">
          <label>行业：</label>
          <j-select class="select sel_industry" v-model="industry" :initItems="industrys" displayKey="name" :selectedIndex="industryIdx">
          </j-select>
      </div>
    </div>
    <div class="home_center">
      <div class="left" :style="changeImg"></div>
      <div class="right">
        <div class="ent_recommend" @click="clickSkip"></div>
        <div class="enterprise1">
          <div class="capital"></div>
          <div class="attention" @click="attention"></div>
        </div>
        <div class="enterprise2">
          <div class="follow_enterprise"></div>
          <div class="inject_enterprise"></div>
        </div>
      </div>
    </div>
    <div class="home_bottom">
      <div class="gj_title">本周招商动态</div>
      <div class="gj_enterprise">
        <div class="gj_title">跟进企业</div>
        <table class="table-fixed">
          <thead>
            <th>序号</th>
            <th>企业名称</th>
            <th>法人</th>
          </thead>
          <tbody>
            <tr v-for="(lists,index) in list" v-bind:key="index">
              <td>{{index+1}}</td>
              <td :title="lists.name">
                <router-link :to="{ path: '/corpor/'+lists.entId, query: { entName: lists.name }}">{{lists.name}}</router-link>
              </td>
              <td>{{lists.legal}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="map" id="map"></div>
    </div>
  </div>
</template>

<script>
import {jSelect} from '../../components'
import '../../../node_modules/echarts/map/js/china.js'
export default {
  name: 'home',
  data() {
    return {
      list: [
        { entId: '7004', name: '中建一局集团建设发展有限公司', legal: '廖钢林' },
        { entId: '80370', name: '北京华远意通热力科技股份有限公司', legal: '赵一波' },
        { entId: '67920', name: '山东三星集团有限公司', legal: '王明峰' },
        { entId: '12260', name: '山东科大机电科技股份有限公司', legal: '包继华' },
        { entId: '9120', name: '佳沃农业开发股份有限公司', legal: '汤捷' },
        { entId: '8138', name: '青岛特锐德电气股份有限公司', legal: '于德翔' },
        { entId: '35674', name: '佛山市万宏再生资源开发有限公司', legal: '陈李福' },
        { entId: '51978', name: '深圳市活力天汇科技股份有限公司', legal: '李黎军' }
      ],
      location: '',
      locationIdx: 0,
      industry: '',
      industryIdx: 0,
      entName: '',
      changeImg: ''
    }
  },
  computed: {
    locations() {
      let locations = this.$store.state.location.map(item => { return item })
      return [{ name: '北京市' }].concat(...locations)
    },
    industrys() {
      let industrys = this.$store.state.industry.map(item => { return item })
      return [{ name: '全部' }].concat(...industrys)
    }
  },
  methods: {
    clickSkip() {
      this.$router.push('../../precisionInvestment')
    },
    attention() {
      this.$router.push('../personCenter/attentionlist')
    },
    chart() {
      let echarts = this.$echarts
      let myChart = echarts.init(document.getElementById('map'))
      let option = {
        dataRange: {
          min: 0,
          max: 4000,
          x: 'left',
          y: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: false,
          splitNumber: 0,
          color: ['orangered', 'gold', 'yellow', 'green', 'lightgreen', 'lightgrey']
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        series: [{
          name: 'value',
          type: 'map',
          mapType: 'china',
          roam: true,
          itemStyle: {
            normal: {
              label: {
                show: true
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: [
            {name: '黑龙江', value: 3544.1},
            {name: '吉林', value: 2805.7},
            {name: '内蒙古', value: 2250.8},
            {name: '山东', value: 2050.9},
            {name: '河南', value: 1853.7},
            {name: '河北', value: 1670.4},
            {name: '辽宁', value: 1403.5},
            {name: '山西', value: 862.7},
            {name: '四川', value: 765.7},
            {name: '云南', value: 747.3},
            {name: '新疆', value: 705.1},
            {name: '甘肃', value: 577.2},
            {name: '陕西', value: 543.1},
            {name: '安徽', value: 496.3},
            {name: '湖北', value: 332.9},
            {name: '贵州', value: 324.1},
            {name: '广西', value: 280.7},
            {name: '重庆', value: 259.7},
            {name: '江苏', value: 252.2},
            {name: '宁夏', value: 226.9},
            {name: '湖南', value: 188.8},
            {name: '天津', value: 107.3},
            {name: '广东', value: 77.9},
            {name: '北京', value: 49.4},
            {name: '浙江', value: 31.1},
            {name: '福建', value: 21.5},
            {name: '青海', value: 18.6},
            {name: '江西', value: 12.8},
            {name: '上海', value: 2.1},
            {name: '西藏', value: 0.8},
            {name: '海南', value: '-'}
          ]
        }]
      }
      myChart.setOption(option)
    }
  },
  components: {
    jSelect
  },
  mounted: function() {
    setTimeout(() => {
      this.chart()
      this.changeImg = 'background: url(' + require('../../assets/images/garden.jpg') + ') no-repeat;width: 568px;height: 297px;background-size: 100% 100%;'
    }, 0)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.homepage {
  /* width:96%; */
  margin: 20px;
  padding: 15px 2%;
  border: 1px solid #ccc;
  margin-bottom: 0;
}
.home_top,
.home_center {
  display: flex;
  font-size: 14px;
}
.location {
  margin-left: 3%;
}
.industry {
  margin-left: 6%;
}
.home_center {
  margin-top: 20px;
}
.home_center .left {
  width: 568px;
  height: 297px;
  background: url(../../assets/images/garden-low.jpg) no-repeat;
  background-size: 100% 100%;
}

.home_center .left.change-img{
  width: 568px;
  height: 297px;
  background-size: 100% 100%;
  background: url(../../assets/images/garden.jpg) no-repeat;
}

.home_center .right {
  width: 53%;
  height: 297px;
  margin-left: 2%;
  display: flex;
}
.ent_recommend {
  width: 20%;
  height: 100%;
  background: url(../../assets/images/recommend.jpg) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.enterprise1,
.enterprise2 {
  width: 39%;
  height: 100%;
  margin-left: 2%;
}
.capital,
.attention {
  width: 100%;
  height: 49%;
  background: url(../../assets/images/capital.jpg) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.attention {
  margin-top: 2%;
  background: url(../../assets/images/attention.jpg) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.follow_enterprise,
.inject_enterprise {
  width: 100%;
  height: 49%;
  background: url(../../assets/images/follow.jpg) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.inject_enterprise {
  margin-top: 2%;
  background: url(../../assets/images/inject.jpg) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.home_bottom {
  width: 98%;
  height: 527px;
  margin-top: 40px;
  padding: 15px 1%;
  border: 1px solid #f3e6e6;
  font-size: 14px;
  border-radius: 5px;
}
.gj_enterprise {
  width: 40%;
  height: 90%;
  margin-top: 20px;
  border: 1px solid #ccc;
  float: left;
}
.gj_enterprise .gj_title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: #1c7be4;
}
.map {
  width: 57%;
  height: 90%;
  margin: 20px 0 0 2%;
  float: right;
}
/* 表格 */
.table-fixed {
  border: 1px solid #636161;
  table-layout: fixed;
  width: 96%;
  margin: 10px 2%;
}
.table-fixed th {
  height: 38px;
  border: 1px solid #636161;
  background: #f2f1f1;
}
.table-fixed:not(.table-form) tr:not(.no-hover):hover {
  background-color: #eff6ff;
}
.table-fixed td {
  border: 1px solid #636161;
  height: 38px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  padding: 0 12px;
}
.table-fixed td:nth-child(2){
  text-align: left;
}
td {
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
.table-fixed .multi-line,
.multi-line {
  white-space: normal;
  line-height: 1.5;
}
.table-fixed .text-center {
  text-align: center;
}
.table-fixed a {
  cursor: pointer;
}
.select {
  color: #000;
}
.select option {
  height: 26px;
  border-bottom: 1px solid #ccc;
  background: #fff;
  text-align: center;
  cursor: pointer;
}
.select option:hover {
  background: #ccc;
  color: #fff;
  text-align: center;
}
.sel_industry{
  width:200px;
}
</style>
