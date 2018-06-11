<template>
  <div>
    <div class="homepage-search">
      <jSearch></jSearch>
    </div>
    <div class="homepage-content">
      <div class="content-left fl">
        <div class="content-sentiment">
          <div class="content-sentiment-title">
            <h1>重要舆情</h1>
            <router-link v-if="!isNoData01" :to="{path:'publiclist',query:{ sortNum:0 }}">
              <span>更多>></span>
            </router-link>
          </div>
          <ul v-for="item in proList01.list">
            <li class="content-sentiment-main" @click="openNewWindow(item.textLink)" v-bind:title="'['+item.entName+']'+item.title">
              <div class="content-sentiment-name">[{{item.entName}}]{{item.title}}</div>
              <div class="content-sentiment-name content-sentiment-energy">{{item.webSrc}}&nbsp;&nbsp;&nbsp;{{item.publishTm| dateFormat('YYYY-MM-DD HH:mm')}}</div>
            </li>
          </ul>
          <jPageMsg class="jUnNormalDataPos" v-if="queryState01.code!=Code.Success && queryState01.code!=Code.Loading" :code="queryState01.code" :msg="queryState01.msg" mode="s"></jPageMsg>
        </div>
        <div class="content-news-change">
          <div class="content-sentiment-title">
            <h1>风险及变更信息</h1>
          </div>
          <div class="content-message-change" v-for="item in riskTypeInfo">
            <router-link v-bind:to="getRightRouter(item[0])" tag="button" @click.native="validateIsAuth(item[0])">{{item[0].name}}</router-link>
            <router-link v-bind:to="getRightRouter(item[1])" tag="button" @click.native="validateIsAuth(item[1])">{{item[1].name}}</router-link>
            <router-link v-bind:to="getRightRouter(item[2])" tag="button" @click.native="validateIsAuth(item[2])">{{item[2].name}}</router-link>
          </div>
        </div>
      </div>
      <div class="content-right fr">
        <div class="content-newest-sentiment">
          <div class="content-sentiment-title">
            <h1>最新舆情</h1>
            <router-link class="item-style" v-if="!isNoData02" :to="{path:'publiclist',query:{ sortNum: 1 }}">
              <span>更多>></span>
            </router-link>
          </div>
          <div class="marquee">
            <ul v-for="item in proList02.list">
              <li class="content-sentiment-minute" @click="openNewWindow(item.textLink)" v-bind:title="'['+item.entName+']'+item.title">
                <div class="content-sentiment-character">[{{item.entName}}]{{item.title}}</div>
                <div class="content-sentiment-time">
                  <span class="source">{{item.webSrc}}</span>
                  <span class="time">{{item.publishTm| dateFormat('YYYY-MM-DD HH:mm')}}</span>
                </div>
              </li>
            </ul>
            <!--<div v-for="item in proList02.list">-->
            <!--<div class="content-sentiment-minute" @click="openNewWindow(item.textLink)" v-bind:title="'['+item.entName+']'+item.title">-->
            <!--<div class="content-sentiment-character">[{{item.entName}}]{{item.title}}</div>-->
            <!--<div class="content-sentiment-time">-->
            <!--<span class="source">{{item.webSrc}}</span>-->
            <!--<span class="time">{{item.publishTm| dateFormat('YYYY-MM-DD HH:mm')}}</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <jPageMsg class="jUnNormalDataPos" v-if="queryState02.code!=Code.Success && queryState02.code!=Code.Loading" :code="queryState02.code" :msg="queryState02.msg" mode="s"></jPageMsg>
        </div>
        <div class="content-type-item">
          <div class="item-top">
            <div class="content-item-main">
              <div class="content-sentiment-title">
                <i class="iconfont icon-rongzi"></i>
                <h1>再融资项目</h1>
                <div class="item-number">({{proList1.total}})</div>
                <router-link v-if="!isNoData1" to="/setting/attentionlist?projectTypeId=1" tag="span">>></router-link>
              </div>
              <ul v-for="item in proList1.list">
                <router-link v-bind:title="item.entName" tag="li" :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName">{{item.entName}}</router-link>
              </ul>
              <jPageMsg class="jUnNormalDataPos" v-if="queryState1.code!=Code.Success && queryState1.code!=Code.Loading" :code="queryState1.code" :msg="queryState1.msg" mode="s"></jPageMsg>
            </div>
            <div class="content-item-main">
              <div class="content-sentiment-title">
                <i class="iconfont icon-hebing"></i>
                <h1>并购重组类项目</h1>
                <div class="item-number">({{proList2.total}})</div>
                <router-link v-if="!isNoData2" to="/setting/attentionlist?projectTypeId=2" tag="span">>></router-link>
              </div>
              <ul v-for="item in proList2.list">
                <router-link v-bind:title="item.entName" tag="li" :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName">{{item.entName}}</router-link>
              </ul>
              <jPageMsg class="jUnNormalDataPos" v-if="queryState2.code!=Code.Success && queryState2.code!=Code.Loading" :code="queryState2.code" :msg="queryState2.msg" mode="s"></jPageMsg>
            </div>
            <div class="content-item-main">
              <div class="content-sentiment-title">
                <i class="iconfont icon-jingpinshoufa"></i>
                <h1>首发类项目</h1>
                <div class="item-number">({{proList3.total}})</div>
                <router-link v-if="!isNoData3" to="/setting/attentionlist?projectTypeId=3" tag="span">>></router-link>
              </div>
              <ul v-for="item in proList3.list">
                <router-link v-bind:title="item.entName" tag="li" :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName">{{item.entName}}</router-link>
              </ul>
              <jPageMsg class="jUnNormalDataPos" v-if="queryState3.code!=Code.Success && queryState3.code!=Code.Loading" :code="queryState3.code" :msg="queryState3.msg" mode="s"></jPageMsg>
            </div>
          </div>
          <div class="item-top">
            <div class="content-item-main">
              <div class="content-sentiment-title">
                <i class="iconfont icon-xinshoufaicon"></i>
                <h1>新三板类项目</h1>
                <div class="item-number">({{proList4.total}})</div>
                <router-link v-if="!isNoData4" to="/setting/attentionlist?projectTypeId=4" tag="span">>></router-link>
              </div>
              <ul v-for="item in proList4.list">
                <router-link v-bind:title="item.entName" tag="li" :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName">{{item.entName}}</router-link>
              </ul>
              <jPageMsg class="jUnNormalDataPos" v-if="queryState4.code!=Code.Success && queryState4.code!=Code.Loading" :code="queryState4.code" :msg="queryState4.msg" mode="s"></jPageMsg>
            </div>
            <div class="content-item-main">
              <div class="content-sentiment-title">
                <i class="iconfont icon-gupiao"></i>
                <h1>优先股类项目</h1>
                <div class="item-number">({{proList5.total}})</div>
                <router-link v-if="!isNoData5" to="/setting/attentionlist?projectTypeId=5" tag="span">>></router-link>
              </div>
              <ul v-for="item in proList5.list">
                <router-link v-bind:title="item.entName" tag="li" :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName">{{item.entName}}</router-link>
              </ul>
              <jPageMsg class="jUnNormalDataPos" v-if="queryState5.code!=Code.Success && queryState5.code!=Code.Loading" :code="queryState5.code" :msg="queryState5.msg" mode="s"></jPageMsg>
            </div>
            <div class="content-item-main">
              <div class="content-sentiment-title">
                <i class="iconfont icon-zhaiquan"></i>
                <h1>债券类项目</h1>
                <div class="item-number">({{proList6.total}})</div>
                <router-link v-if="!isNoData6" to="/setting/attentionlist?projectTypeId=6" tag="span">>></router-link>
              </div>
              <ul v-for="item in proList6.list">
                <router-link v-bind:title="item.entName" tag="li" :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName">{{item.entName}}</router-link>
              </ul>
              <jPageMsg class="jUnNormalDataPos" v-if="queryState6.code!=Code.Success && queryState6.code!=Code.Loading" :code="queryState6.code" :msg="queryState6.msg" mode="s"></jPageMsg>
            </div>
          </div>
        </div>
      </div>
      <j-Loading v-if="isShowLoading" loader="f"></j-Loading>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { jPageMsg } from '../../components'
import jLoading from '../../components/jLoading.vue'
import jSearch from './jSearch'
import { hasAuth } from '../../assets/js/auth'
import { Code } from '../../assets/js/operaCode.js'

export default {
  name: 'homepage',
  data() {
    return {
      keyword: '',
      Code: Code,
      queryState01: {
        code: Code.Loading,
        msg: ''
      },
      queryState02: {
        code: Code.Loading,
        msg: ''
      },
      queryState1: {
        code: Code.Loading,
        msg: ''
      },
      queryState2: {
        code: Code.Loading,
        msg: ''
      },
      queryState3: {
        code: Code.Loading,
        msg: ''
      },
      queryState4: {
        code: Code.Loading,
        msg: ''
      },
      queryState5: {
        code: Code.Loading,
        msg: ''
      },
      queryState6: {
        code: Code.Loading,
        msg: ''
      },
      isNoData01: false,
      isNoData02: false,
      isNoData1: false,
      isNoData2: false,
      isNoData3: false,
      isNoData4: false,
      isNoData5: false,
      isNoData6: false,
      isShowLoading: false,
      total: 0,
      riskTypesRaw: [
        [{ type: 12, name: '诉讼记录', auth: 'menu_ssjl' }, { type: 13, name: '处罚记录', auth: 'menu_cfjl' }, { type: 14, name: '失信记录', auth: 'menu_sxjl' }],
        [{ type: 15, name: '工商变更', auth: 'menu_gsbg' }, { type: 16, name: '商标信息', auth: 'menu_sbxx' }, { type: 17, name: '专利信息', auth: 'menu_zlxx' }],
        [{ type: 7, name: '监管机构', auth: 'menu_jgjg' }, { type: 8, name: '土地信息', auth: 'menu_tdxx' }, { type: 9, name: '其他政府部门', auth: 'menu_qtzfbm' }]]
    }
  },
  computed: {
    ...mapGetters({
      proList01: 'importantListHome',
      proList02: 'newestListHome',
      proList1: 'projectList1',
      proList2: 'projectList2',
      proList3: 'projectList3',
      proList4: 'projectList4',
      proList5: 'projectList5',
      proList6: 'projectList6'
    }),
    riskTypeInfo() {//设置左下侧button模块的访问权限
      let vm = this;
      let riskTypeFromState = this.$store.state.opinion_risk_type || [];
      this.riskTypesRaw.map(function (item, index) {
        item.map(function (subitem, i) {
          if (!hasAuth(subitem.auth)) {
            vm.riskTypesRaw[index][i]['isAuth'] = false;
          } else {
            vm.riskTypesRaw[index][i]['isAuth'] = true;
          }

          riskTypeFromState.map(function (value) {
            if (value.name == vm.riskTypesRaw[index][i]['name']) {
              vm.riskTypesRaw[index][i]['isAuth'] = true;
            }
          })
        })
      })

      return this.riskTypesRaw;
    }
  },
  methods: {
    ...mapActions({
      getMainList: 'getImportantList',
      getNewList: 'getNewestList',
      getProList: 'getProjectList'
    }),
    validateIsAuth: function (item) {
      if (!item.isAuth) {
        alert('没有访问权限');
      }
    },
    getRightRouter: function (item) {
      if (!item.isAuth) {
        return '';
      }
      if (item.type < 18 && item.type > 11) {
        return "/riskinformation?type=" + item.type;//跳转到风险变更
      }
      return "/publiclist?type=" + item.type;//跳转到舆情列表
    },
    validateSearchInfo: function () {
      let str = this.keyword.trim();
      if (str == '') {
        alert('关键字为空');
        return;
      }
      let url = "/corpor?entName=" + str;
      this.$router.push(url);
    },
    openNewWindow: function (url) {
      if (url != undefined) {
        if (checkURL(url)) {
          window.open(url, '_blank');
        } else {
          alert('请使用合法的url地址,当前地址为\n' + url);
        }
      }
      function checkURL(URL) {
        let str = URL;
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp = new RegExp(Expression);
        if (objExp.test(str) == true) {
          return true;
        } else {
          return false;
        }
      }
    },
    renderPage: function () {
      let vm = this;
      vm.isShowLoading = true;
      this.getMainList({ count: 5 }).then(function () {
        vm.setNoData('01');
      }).catch(function (err) {
        vm.setNoData('01', true, err);
      });
      this.getNewList({ count: 5 }).then(function () {
        vm.setNoData('02');
      }).catch(function (err) {
        vm.setNoData('02', true, err);
      });

      for (let i = 1; i < 7; i++) {
        vm.getProList({ projectTypeID: i + '' }).then(function () {
          vm.setNoData(i);
        }).catch(function (err) {
          vm.setNoData(i, true, err);
        });
      }
    },
    setNoData: function (type, fromErr = false, err) {
      let vm = this;
      vm.total++;
      if (vm.total == 8) {
        setTimeout(function () {
          vm.isShowLoading = false;
        }, 300);
        vm.total = 0;
      }

      if (vm['proList' + type].total != undefined && vm['proList' + type].total == 0) {
        vm['isNoData' + type] = true;
      } else if (vm['proList' + type].length == 0) {
        vm['isNoData' + type] = true;
      }

      if (fromErr) {
        vm['queryState' + type].code = err.code;
        vm['queryState' + type].msg = err.msg;

        vm['proList' + type].list = [];//出现异常时制空列表,防止异常提示与列表信息同在
        vm['proList' + type].total = 0;
        vm['isNoData' + type] = true;
      } else {
        vm['queryState' + type].code = vm['proList' + type].list.length == 0 ? Code.NoData : vm['proList' + type].code;
        vm['queryState' + type].msg = vm['proList' + type].msg;
      }
    }
  },
  mounted: function () {
    this.renderPage();
  },
  components: {
    jSearch,
    jPageMsg,
    jLoading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/homepage.css";
.jUnNormalDataPos {
  margin-top: 8px;
  margin-left: 20px;
}
</style>
