<template>
  <div class="company-moni">
    <div class="top-title">
      <div class="public-list-title fl">
        <span>当前共监控企业</span>
        <a>{{items.length}}</a>
      </div>
      <div class="moni-firm fr">
        <button class="cancle-btn" @click="company" :disabled="items.length>9" :title="items.length>9?'您最多可添加10家监控企业':'点击添加监控企业'">监控更多企业
        </button>
      </div>
    </div>
    <jPageMsg mode='f' :code="pageState.code" :msg="pageState.msg"></jPageMsg>
    <div v-if="items.length" class="company-moni-content">
      <div class="firm-content-one" v-for="item in items">
        <div class="firm-content-deal" :title="item.entName">
          <router-link :to="{ path: '/corpor/'+item.entId, query: { entName: item.entName }}">{{item.entName || '--'}}</router-link>
        </div>
        <div class="firm-content-change">
          <span class="fl">近一周变动
            <a>{{item.weekChangeCount || 0}}</a>
          </span>
          <span class="fr">近一月变动
            <a style="color:#2481d8;">{{item.monthChangeCount || 0}}</a>
          </span>
        </div>
        <div class="company-main">
          <router-link :disabled="!item.monthSuitCount" :to="{ path: '/suitrecord', query: { entId: item.entId,entName: item.entName }}" tag="button">诉讼记录
            <em>{{item.monthSuitCount||0}}</em>
          </router-link>
          <router-link :disabled="!item.monthPunishCount" :to="{ path: '/punishrecord', query: { entId: item.entId,entName: item.entName }}" tag="button">处罚记录
            <em>{{item.monthPunishCount||0}}</em>
          </router-link>
          <router-link :disabled="!item.monthDishonestyCount" :to="{ path: '/dishonestyrecord', query: { entId: item.entId,entName: item.entName }}" tag="button">失信记录
            <em>{{item.monthDishonestyCount||0}}</em>
          </router-link>
          <router-link :disabled="!item.monthBuisnessCount" :to="{ path: '/businessChange', query: { entId: item.entId,entName: item.entName }}" tag="button">工商变更
            <em>{{item.monthBuisnessCount||0}}</em>
          </router-link>
          <router-link :disabled="!item.monthBrandCount" :to="{ path: '/brandrecord', query: { entId: item.entId,entName: item.entName }}" tag="button">商标信息
            <em>{{item.monthBrandCount||0}}</em>
          </router-link>
          <router-link :disabled="!item.monthPatentCount" :to="{ path: '/patentrecord', query: { entId: item.entId,entName: item.entName }}" tag="button">专利信息
            <em>{{item.monthPatentCount||0}}</em>
          </router-link>
          <router-link :disabled="!item.monthOpinionCount" :to="{ path: '/publiclist', query: { entName: item.entName }}" tag="button">舆情
            <em>{{item.monthOpinionCount||0}}</em>
          </router-link>

        </div>
        <div class="company-change-time">
          <div class="newest-change-date">最新变动日期</div>
          <div class="company-format">{{item.latestChangeDate|dateFormat}}</div>
          <div class="cancel-monitoring fr" @click="cancelMonitor(item.entId)">
            <a>取消监控</a>
          </div>
        </div>
      </div>
      <div class="firm-content-one empty"></div>
    </div>
    <append-firmTooltip ref="company_monitoring_dialog" @save="getPageData" :initMonitorEnts="items"></append-firmTooltip>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
  </div>
</template>

<script>
import { personalSetting as api } from '../../api'
import appendFirmTooltip from './appendFirm.vue'
import { jOperaMsg, jPageMsg } from '../../components'
import { mapActions } from 'vuex'
import { Code } from '../../assets/js/operaCode.js'
export default {
  name: 'companymonitoring',
  data() {
    return {
      items: [],
      showToast: false,
      content: '暂时没有更多了',
      top: -30,
      left: 10,
      opera: {
        code: 1,
        msg: ''
      },
      pageState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  methods: {
    company() {
      this.$refs.company_monitoring_dialog.showDialog()
    },
    getPageData() {
      this.pageState.code = Code.Loading
      api.getMonitorInfo().then(rtn => {
        this.items = rtn.data.list
        this.pageState.code = this.items.length ? Code.Success : Code.NoData
      }).catch(err => {
        this.pageState = err
      })
    },
    // 取消监控
    cancelMonitor(entid) {
      this.loading = true
      if (!entid) {
        console.log(entid + '参数为空')
        return
      }
      var _this = this
      api.cancelMonitor({ entId: entid }).then(rtn => {
        _this.getPageData()
        this.opera.code = 1
        this.opera.msg = '操作成功！'
        this.$refs.operaMsg.show()
      }).catch(err => {
        this.opera.code = -1
        this.opera.msg = err.msg || '操作失败！'
        this.$refs.operaMsg.show()
      })
    },
    ...mapActions({
      showTooltip: 'MonitorTooltipShow',
      hideTooltip: 'MonitorTooltipHide',
      getList: 'getMonitorComponyList'
    })
  },
  mounted() {
    this.getPageData()
  },
  components: { appendFirmTooltip, jOperaMsg, jPageMsg }
}
</script>
<style scoped lang='less'>
.company-moni {
  .top-title {
    background: none;
    height: auto;
    border: none;
    border-bottom: 1px solid #ccc;
    display: -ms-flexbox;
    display: flex;
    margin: 0px 0px;
    position: relative;
    .input-group {
      margin: 34px 0%;
      position: absolute;
      right: 0px;
    }
    .public-list-title {
      margin: 0px 0 20px 0;
    }
    .public-list-title a {
      margin-left: 10px;
      font-size: 19px;
      color: #3ca1f8;
    }
    .moni-firm {
      position: absolute;
      right: 0px;
      .save-btn button {
        background: #ff8201;
        border: 1px solid #ff8201;
      }
      .save-btn button:focus {
        background: #ff8201;
        border: 1px solid #ff8201;
      }
    }
  }
  .company-moni-content {
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .firm-content-one {
      width: 32.15%;
      margin-top: 20px;
      height: 273px;
      border: 1px solid #ccc;
      .firm-content-deal {
        height: 41px;
        line-height: 41px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .firm-content-change {
        height: 20px;
        margin-top: 22px;
        cursor: pointer;
        font-weight: bold;
        padding: 0px 20px;
        span {
          font-size: 14px;
        }
        a {
          color: #ff7800;
          margin-left: 5px;
        }
      }
      .company-main {
        width: 92%;
        height: 118px;
        margin: 20px 4% 0 4%;
        button {
          width: 31%;
          height: 32px;
          background: #eef2f7;
          border: 1px solid #bddbf5;
          border-radius: 3px;
          margin: 8px 1% 4px 0;
          cursor: pointer;

          em {
            margin-left: 12px;
            font-size: 14px;
            color: #3ca1f8;
            font-weight: bold;
          }
        }
      }
      .company-change-time {
        display: -ms-flexbox;
        display: flex;
        margin: 25px 20px;
        position: relative;
        .newest-change-date,
        .company-format {
          color: #a0a0a0;
        }
        .company-format {
          margin-left: 15px;
        }
        .cancel-monitoring a {
          color: #da1a1a;
          position: absolute;
          right: 0px;
        }
      }
      &.empty {
        height: 0;
        border: none;
      }
    }
  }
}
</style>
