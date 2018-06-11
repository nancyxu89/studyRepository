<template>
  <!--关联图谱-->
  <div class='atlasContent clearFix'>
    <p class="no-available">暂不开放此信息</p>
    <!--<div class='right-atlas'>-->
      <!--<jPageMsg class="no-hover" v-if="queryState.code!=1" :code="queryState.code" :msg="queryState.msg"></jPageMsg>-->
      <!--<j-Loading v-if="isShowLoading" loader="f"></j-Loading>-->
      <!--<div id="container"></div>-->
    <!--</div>-->
    <div class='left-atlas' v-if="isShowPopup">
      <h3>公司信息</h3>
      <h4>{{ companyName }}</h4>
      <div class='left-atlasList'>
        <ul>
          <li v-for='(item,index) in items' v-bind:key="index" class='clearFix detailMsg'>
            <span>{{item.name}}：</span>
            <p :title="item.value">{{splitValue(item.value)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { jPageMsg } from '../../components'
import jLoading from '../../components/jLoading.vue'
import { Code } from '../../assets/js/operaCode.js'

export default {
  data: function() {
    return {
      queryState: {
        code: Code.Loading,
        msg: ''
      },
      items: [],
      categoryList: [
        { type: 0, name: '主体' },
        { type: 1, name: '股东' },
        { type: 2, name: '投资公司' },
        { type: 3, name: '股东的对外投资' }
      ],
      companyName: '',
      isShowPopup: false,
      isShowLoading: false// 用于显示获取企业信息的加载提示,若访问失败,alert消息,不需要在页面显示如同加载图片的效果
    }
  },
  computed: {
    ...mapGetters({
      atlasData: 'atlasList',
      companyInfo: 'companyBaseInfo'
    })
  },
  methods: {
    ...mapActions({
      getAtlasData: 'getAtlasList',
      getCompanyInfo: 'getCompanyBaseInfo'
    }),
    splitValue(value) { // 截取字符串,长度超过30加省略号
      let length = value.length
      let str = value
      if (length > 30) {
        str = value.substring(0, 30) + '...'
      }

      return str
    },
    getEntAtlasData() {
      let vm = this
      vm.isShowLoading = true
      vm.getAtlasData({
        'entId': vm.$route.params.id
      }).then(function() {
        let fromServerChartJson = vm.atlasData['chartJson']
        vm.queryState.code = (fromServerChartJson === undefined || fromServerChartJson === '' || fromServerChartJson === '{}') ? Code.NoData : vm.atlasData.code
        vm.queryState.msg = vm.atlasData.msg
        vm.drawEntAltasChart()
      }).catch(function(error) {
        vm.queryState = error
        vm.isShowLoading = false
      })
    },
    getCompanyDetailInfo(params) {
      let vm = this
      let toParams = {
        'entId': vm.$route.params.id,
        'entName': params[0]
      }

      vm.isShowLoading = true
      this.getCompanyInfo(toParams).then(function() {
        if (vm.companyInfo != null) {
          let result = vm.companyInfo
          let datas = [result.name || params[0], result.legalPerson, result.address, result.societyCode,
            result.registationNo, result.type, result.businessScope]

          vm.setEntPopup(datas)
        } else {
          vm.isShowPopup = false
          vm.items = []
          vm.companyInfo.code = Code.NoData
          vm.setErrorHint(vm.companyInfo, params[0])
        }
        setTimeout(function() {
          vm.isShowLoading = false
        }, 200)
      }).catch(function(error) {
        vm.isShowLoading = false
        vm.isShowPopup = false
        vm.items = []
        vm.setErrorHint(error, params[0])
      })
    },
    setErrorHint(result, entName) {
      let hint = '  查询  ' + entName + '\n'
      if (result === '' || result.code === null) {
        hint = hint + '  没有相关信息  '
        alert(hint)
        return
      }
      let code = result.code
      let msg = result.msg

      if (code === Code.NoData) {
        hint = hint + '  没有相关信息  '
      } else if (code === Code.Error) {
        hint = hint + msg
      } else if (code === Code.Overdue) {
        hint = hint + '  你的用户信息已过期，请重新登录  '
      } else if (code === Code.NoAuth) {
        hint = hint + '  你无权限执行该操作，请 切换用户 继续操作，如有疑问请联系管理员  '
      } else if (code === Code.Offline) {
        hint = hint + '  网络出错，请稍后重试  '
      } else {
        hint = hint + '  操作异常 '
      }
      alert(hint)
    },
    drawEntAltasChart() {
      let vm = this
      let jusfD3Cluster = require('../../../static/js/jusf_d3_cluster')
      let params = {
        'clickFn': vm.getCompanyDetailInfo, // 点击事件，处理函数
        'clickParam': ['name', 'category']// 点击事件，所需获取参数
      }

      let fromServerChartJson = vm.atlasData['chartJson']
      let datas = fromServerChartJson
      if (typeof fromServerChartJson === 'string') {
        datas = JSON.parse(fromServerChartJson)
      }

      if (datas !== null && datas.data !== null) {
        jusfD3Cluster.draw('container', datas, params)
      }

      vm.isShowLoading = false
    },
    setEntPopup(params) {
      this.isShowPopup = true
      this.companyName = params[0]
      this.items = [
        {
          name: '法人',
          value: getValue(params[1])
        }, {
          name: '地址',
          value: getValue(params[2])
        }, {
          name: '组织机构代码',
          value: getValue(params[3])
        }, {
          name: '工商注册号',
          value: getValue(params[4])
        }, {
          name: '公司类型',
          value: getValue(params[5])
        }, {
          name: '营业范围',
          value: getValue(params[6])
        }
      ]

      function getValue(value) {
        if (value !== undefined && value !== '') {
          return value
        } else {
          return '--'
        }
      }
    },
    getCategoryName(type) {
      let name = ''
      this.categoryList.map(function(item) {
        if (item.type === type) {
          name = item.name
        }
      })
      return name
    }
  },
  mounted() {
    //    this.getEntAtlasData()
  },
  components: {
    jPageMsg,
    jLoading
  }
}

</script>
<style scoped lang='less'>
.noDataStyle {
  margin-top: -40px;
  width: 95.8%;
}
.atlasContent {
  width: 100%;
  overflow: hidden;
  position: relative;
  /*margin: 0 20px;*/
  .left-atlas {
    width: 275px;
    height: 365px;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 6px 5px #dedede;
    margin: 40px 0 0 5px;

      position: absolute;
      top: 0;
    h3 {
      font-size: 14px;
      /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
      padding-left: 6px;
      margin: 12px 0 0 10px;
      border-left: 3px solid #ff6905;
    }
    h4 {
      color: #1593ed;
      font-size: 14px;
      margin: 0px 0 3px 21px;
      line-height: 40px;
    }
    .left-atlasList {
      width: 248px;
      border: 1px solid #e0e0e0;
      margin-left: 14px;
      ul {
        li {
          overflow: hidden;
          max-height: 60px;
        }
        .detailMsg {
          border-bottom: 1px solid #e0e0e0;
          span {
            float: left;
            width: 84px;
            vertical-align: middle;
            padding: 6px 0;
            padding-left: 7px;
            color: #666;
          }
          p {
            float: left;
            white-space: normal;
            min-height: 25px;
            width: 134px;
            border-left: 1px solid #e0e0e0;
            padding: 6px 0;
            padding-left: 10px;
            cursor: pointer;
          }
        }
        li:nth-child(6) {
          border-bottom: none;
        }
      }
    }
  }
  .right-atlas {
    width: 100%;
    height: 610px;
    margin-top: 40px;
    overflow: hidden;
  }
  #container {
    height: 610px;
  }
}
</style>
