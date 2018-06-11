<template>
  <!--企业库列表页-->
  <div class='comListPage'>
    <div class="comSeo clearFix">
      <div class='comListDetail'>
        <div class='seach'>
          <label>
            <span>企业名称：</span>
            <input type='text' placeholder="请输入企业名称" v-model="entName" @keydown.enter="searchInfo" />
          </label>
          <label>
            <span>法定代表人：</span>
            <input type='text' placeholder="请输入法定代表人名称" v-model="legalRep" @keydown.enter="searchInfo" />
          </label>
          <!--<label class="legalPerson2"><span>注册时间：</span>-->
          <!--<jDatePicker class="wid" v-model="startTime" :max="endTime"></jDatePicker>-->
          <!--<span class="interval">-</span>-->
          <!--<jDatePicker class="wid" v-model="endTime" :min="startTime"></jDatePicker>-->
          <!--</label>-->
          <!--<label class="legalPerson wp-40"><span>注册资本(/万元)：</span>-->
          <!--<input type='text' placeholder="请输入注册资金" @keydown.enter="searchInfo" v-model="minCapital"/>-->
          <!--<span class="interval">-</span>-->
          <!--<input type='text' placeholder="请输入注册资金" @keydown.enter="searchInfo" v-model="maxCapital"/>-->
          <!--</label>-->
          <!--<button class='search-btn' @click="searchInfo">-->
          <!--重 置-->
          <!--</button>-->
          <button class='search-btn seaAct' @click="searchInfo">
            <i class="iconfont icon-sousuo"></i>搜 索
          </button>
        </div>
        <div class='selectTabBox f1'>
          <div class='selectList'>
            <label>区域：</label>
            <j-district class='areaStyle' :initItems="province" v-model='province' displayKey="text" valueKey="value" @change="filterChange"></j-district>
          </div>
          <div class='selectList'>
            <label>成立年限：</label>
            <j-select class='setUpDate' :initItems="appearstate" v-model='setupDt' displayKey="name" valueKey="value" :selectedIndex="0" @change="filterChange">
            </j-select>
          </div>
          <div class='selectList'>
            <label>注册资本：</label>
            <j-select :initItems="regAssets" v-model='regAsset' displayKey="name" valueKey="value" :selectedIndex="0" @change="filterChange">
            </j-select>
          </div>
          <!--<div class='selectList'>-->
          <!--<label>关注状态：</label>-->
          <!--<j-select class='focus' v-model='attention' :initItems="attentions" displayKey="text" valueKey="value" :selectedIndex="0" @change="filterChange">-->
          <!--</j-select>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="comCon">
      <div class="public-list-content">
        <div class="public-list-top">
          <div class="public-list-sort fl">
            <span>排序：</span>
            <j-sort-button2 text="成立时间" @sort="sort" :initState="timeInit"></j-sort-button2>
            <j-sort-button2 text="注册资本" @sort="sortByNew"></j-sort-button2>
          </div>
          <a href="javascript:;" class="add-company" @click="addCompanyOpen" v-if="addCustomEntAuth">添加企业</a>
        </div>
        <div class="tableRad">
          <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
              <th width="5%">序号</th>
              <th>企业名称</th>
              <th>法人</th>
              <th>注册资本(万元)</th>
              <th width="10%">成立时间</th>
              <th>区域</th>
              <th v-if="attentionAuth">关注</th>
            </thead>
            <tr v-if="!items.length" class="no-hover">
              <td :colspan="attentionAuth?7:6">
                <div class="nodata" v-if="addCustomEntAuth && pageState.code == Code.NoData">
                  <p>-没有找到企业-</p>
                  <p>
                    <button class="add-company" @click="addCompanyOpen">添加企业</button>
                  </p>
                </div>
                <jPageMsg mode='f' :code="pageState.code" :msg="pageState.msg" v-else></jPageMsg>

              </td>
            </tr>
            <tr v-for="(item,index) in items" v-bind:key="index" v-else>
              <td class="text-center">{{ setSerialNum(index) }}</td>
              <!--<td class="item-subject"><a>{{item.entName}}</a></td>-->
              <td :title="item.entName">
                <router-link :to="{ path: '/corpor/'+item.entId+'/basicMsg', query: { entName: item.entName }}">{{item.entName || '--'}}</router-link>
              </td>
              <td class="text-center">{{item.legalRep || '--'}}</td>
              <td class="text-center">{{item.regAsset|| '--'}}</td>
              <td class="text-center">{{(+item.setupDt)|dateFormat }}</td>
              <td class="text-center">{{item.province || '--'}}</td>
              <td class="text-center" v-if="attentionAuth">
                <i class="iconfont icon-wujiaoxingman" :class="{attention:item.attention}" :title="item.attention?'取消关注':'添加关注'" @click="attentionHandle(item)"></i>
              </td>
            </tr>

          </table>
        </div>
        <div class="fenye">
          <p class='record'>共
            <span>{{total}}</span>条记录</p>
          <j-paging class="paging" :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="total" @pageChanged="query"></j-paging>
        </div>
        <j-loading mode='f' v-show="pageState.code == Code.Loading"></j-loading>
        <j-attention :entId='curItem.entId' ref="attention" @save="saved"></j-attention>
        <j-confirm ref="confirm" :msg="attentionMsg" @confirm="cancelAttention"></j-confirm>
        <add-companyTooltip ref="add_company"></add-companyTooltip>
      </div>
    </div>
  </div>
</template>
<script>
import {
  jPaging,
  jSortButton2,
  jDatePicker,
  jSelect,
  jDistrict,
  jPageMsg,
  jConfirm,
  jLoading
} from '../../components'
import { jAttention } from '../components'
import http from '../../api/request'
import { Code } from '../../assets/js/operaCode.js'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import addCompanyTooltip from './addCompanyTooltip.vue'
import { attention as attentionAPI, personalSetting } from '../../api'
let paramsJson = {}
let queryHandle = 0
export default {
  data() {
    return {
      pageIdx: 1,
      pageSize: 10,
      total: 0,
      province: '', // 区域
      setupDt: '', // 成立年限
      regAsset: '', // 注册资本
      attention: '', // 关注
      setSerialNum(index) {
        return (this.pageIdx - 1) * 10 + (index + 1)
      },
      keyword: '',
      entName: '',
      legalRep: '',
      riskCategorys: 0,
      appearState: 0,
      items: [],
      curItem: {},
      timeInit: 'DESC',
      sortColumn: 'SETUP_DT',
      order: '',
      pageState: {
        code: Code.Loading,
        msg: ''
      },
      Code: Code,
      attentionAuth: hasAuth(AUTHS.AddAttention),
      addCustomEntAuth: hasAuth(AUTHS.AddCustomEnt),
      attentionMsg: '',
      startTime: '',
      endTime: '',
      minCapital: '',
      maxCapital: ''
    }
  },
  computed: {
    appearstate() {
      var foundYears = this.$store.state.ent_founding_years
      return [{ name: '不限', value: '' }].concat(...foundYears)
    },
    regAssets() {
      var foundCapital = this.$store.state.ent_registered_capital
      return [{ name: '不限', value: '' }].concat(...foundCapital)
    },
    attentions() {
      var atts = this.$store.state.attention_state
      return [{ value: 3, text: '全部' }].concat(...atts)
    }
  },
  methods: {
    addCompanyOpen() {
      this.$refs.add_company.show()
    },
    saved(proTypes) {
      this.curItem.attention = proTypes
        .map(t => {
          return t.value
        })
        .join(',')
    },
    sort(order) {
      // 成立时间
      this.sortColumn = 'SETUP_DT'
      this.query(1, order, this.sortColumn)
    },
    sortByNew(order) {
      // 注册资本
      this.sortCapital = 'REG_ASSET'
      this.query(1, order, this.sortCapital)
    },
    query(pageIndex = 1, order, sortCapital) {
      this.pageIdx = pageIndex
      paramsJson.pageNum = pageIndex
      if (order && sortCapital) {
        paramsJson.order = order
        paramsJson.sortColumn = sortCapital
      }
      this.pageState.code = Code.Loading
      let locationParams = this.getLocationParams()
      http
        .post('/entLibrary/list', { ...paramsJson, ...locationParams })
        .then(data => {
          this.items = data.data.list
          this.pageIdx = data.data.pageNum || 1
          this.total = data.data.total || 0
          this.pageSize = data.data.pageSize || 10
          this.pageState.code = this.total ? Code.Success : Code.NoData
        })
        .catch(err => {
          this.pageState = err
        })
    },
    searchInfo() {
      paramsJson.pageSize = this.pageSize
      paramsJson.qName = this.entName
      paramsJson.qValue = this.legalRep
      paramsJson.regAsset = this.regAsset
      paramsJson.setupDt = this.setupDt
      paramsJson.province = this.province
      //      paramsJson.attention = this.attention
      paramsJson.attention = 3

      this.query(1)
    },
    attentionHandle(item) {
      this.curItem = item
      if (item.attention) {
        personalSetting
          .isMonitor({ entId: this.curItem.entId })
          .then(res => {
            if (res.data.length) {
              this.attentionMsg =
                '确定取消关注该企业吗？<br/>该企业处于监控状态，取消关注将同时取消监控！'
            } else {
              this.attentionMsg = '确定取消关注该企业吗？'
            }
            this.$refs.confirm.show()
          })
          .catch(err => {
            this.operaState.code = -1
            this.operaState.msg = err.msg || '取消失败！'
            this.$refs.operaMsg.show()
          })
      } else {
        this.$refs.attention.show()
      }
    },
    cancelAttention() {
      attentionAPI.cancelAttention({ entId: this.curItem.entId }).then(rtn => {
        this.curItem.attention = ''
      })
    },
    filterChange() {
      if (queryHandle) {
        clearTimeout(queryHandle)
      }
      queryHandle = setTimeout(this.searchInfo, window.handleDelay)
    },
    refreshCompanyList() {
      this.filterChange()
    },
    getLocationParams() {
      let href = window.location.href
      let params = {}
      if (href.indexOf('?') !== -1) {
        let str = href.substr(href.indexOf('?') + 1)
        let strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          let item = strs[i].split('=')
          if (item !== '') {
            params[item[0]] = item[1]
          }
        }
      }

      return params
    }
  },
  mounted() {
    this.entName = this.$route.query.entName || ''
    this.filterChange()
  },
  beforeRouteUpdate(to, from, next) {
    this.filterChange()
    next()
  },
  components: {
    jPaging,
    jSortButton2,
    jDatePicker,
    jSelect,
    jDistrict,
    jAttention,
    jConfirm,
    jPageMsg,
    jLoading,
    addCompanyTooltip
    //      jSentimentTags
  }
}
</script>
<style scoped lang='less'>
@import '../../assets/css/publiclist.css';
.comListPage {
  width: 100%;
  /*margin: 0 20px;*/
  position: relative;
  height: calc(~'100% - 20px');
  .comListDetail {
    width: 100%;
    height: 100px;
    /*margin: 20px 0 30px 0;*/
    /*border: 1px solid #dbdbdb;*/
    /*background: #f2f2f2;*/
    padding-bottom: 10px;
    float: left;
    .seach {
      width: 100%;
      float: left;
      /*height: 54px;*/
      /*border-bottom: 1px solid #ccc;*/
      label:nth-child(3) {
        margin-right: 0;
      }
      label:nth-child(2) {
      }
      label {
        /*margin-left: 1%;*/
        float: left;
        width: 33.3%;
        height: 34px;
        margin-bottom: 25px;
        /*margin-right: 1%;*/
        .wid {
          width: 140px;
        }
        .interval {
          margin: 0 6px;
        }
        input {
          width: 68%;
          height: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          /*margin-top: 8px;*/
          padding-left: 15px;
          &::-webkit-input-placeholder {
            color: #afb6bf;
          }
        }
        span {
          color: #9c9c9c;
          font-size: 14px;
        }
      }
      .legalPerson {
        input {
          width: 28%;
        }
      }
      .legalPerson2 {
        text-align: right;
      }
      .wp-40 {
        width: 40%;
      }
      button {
        float: right;
        border-radius: 5px;
        margin: 0 0 0 25px;
        border: 1px solid #9dc5fd;
        color: #1688f3;
        background-image: linear-gradient(
            -23deg,
            rgba(229, 240, 255, 0.6) 0%,
            rgba(240, 246, 255, 0.6) 100%
          ),
          linear-gradient(#ecf2fb, #ecf2fb);
      }
      .seaAct {
        background-image: linear-gradient(-23deg, #2f81ee 0%, #3f8ffa 100%),
          linear-gradient(#ecf2fb, #ecf2fb);
        color: white;
        i {
          margin-right: 5px;
        }
      }
    }
  }
  .selectTabBox {
    width: 100%;
    float: left;
    color: #9c9c9c;
    .selectList {
      float: left;
      /*margin-right:103px;
    margin-top:14px;*/
      margin: 1% 5% 0 0;
    }
    .selectList:nth-child(1) {
      margin-left: 39px;
      /*margin-right: 7%;*/
      .areaStyle {
        width: 80%;
      }
    }
    .selectList:nth-child(2) {
      width: 230px;
    }
    .selectList:nth-child(3) {
      width: 260px;
      margin: 1% 4% 0 0;
      & > span {
        width: 70%;
      }
    }
    .selectList:nth-child(4) {
      margin-right: 0;
    }
    .setUpDate {
      width: 60%;
    }
  }
  .add-company {
    background: #3699ed;
    background: linear-gradient(0deg, #41a7fb, #3b96e4);
    padding: 0 14px;
    line-height: 28px;
    color: #fff;
    text-decoration: none;
    font-size: 12px;
    border-radius: 4px;
  }
  .public-list-content {
    width: 100%;
    margin: 0;
  }
  .icon-wujiaoxingman {
    color: #b7b7b7;
  }
  .attention {
    color: #ff7e00;
  }
  .record {
    float: left;
    font-size: 1em;
    margin: 24px 0 0 0.1%;
    color: #9c9c9c;
    span {
      font-size: 16px;
      color: #ff850e;
      margin: 0 2px;
    }
  }
  .paging {
    /*float: right;*/
    position: absolute;
    right: 40px;
  }
  .nodata {
    height: 150px;
    text-align: center;
    padding-top: 50px;
    font-size: 14px;
    p {
      height: 40px;
    }
  }
  .public-list-top .add-company {
    position: absolute;
    right: 0;
  }
  .comSeo {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    padding: 30px 40px 15px 40px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .comCon {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    padding: 25px 40px;
    box-sizing: border-box;
  }
  .tableRad {
    border: solid 1px rgba(69, 153, 230, 0.3);
    border-radius: 5px;
    margin-top: 25px;
  }
  .fenye {
    width: 100%;
    display: flex;
  }
  .public-list-sort {
    & > span {
      font-size: 14px;
      color: #9c9c9c;
    }
    button:last-child {
      margin-left: -3px;
      border-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left-color: transparent;
    }
  }
}
</style>
