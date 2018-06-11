<template>
  <div class='companyLibrary'>
    <header>
      <div class='clearFix'>
        <div class='clearFix rightBox'>
          <h3>{{item.name || '--'}}</h3>
          <label>开业</label>
          <label class='listingMarket' v-show="listed">上市公司</label>
          <label class='listingMarket' v-show="!listed">非上市公司</label>
        </div>
        <div class='concern'>
          <!--<button @click="amend()" v-if="!item.attention">-->
            <!--<i class='add'>+</i>关注</button>-->
          <!--<button @click="amend()" v-else>-->
            <!--<i class='add'>+</i>取消关注</button>-->
          <!--<button @click='remark()' v-if="item.attention">企业备注</button>-->
        </div>
      </div>
      <h4 class='titleSmall'>曾用名：{{item.usedName || '--'}}</h4>
      <ul class='headList clearFix'>
        <li>法人代表：
          <span class="overflow-hidden" :title="item.legalPerson">{{item.legalPerson || '--'}}</span>
        </li>
        <li>企业地址：
          <span class="overflow-hidden" :title="item.address">{{item.address || '--'}}</span>
        </li>
        <!--<li>总台电话：
                <span class="overflow-hidden" :title="item.enterprisePhone">{{item.enterprisePhone || '--'}}</span>
              </li>
              <li>企业网址：
                <span class="overflow-hidden" :title="item.url">{{item.url || '--'}}</span>
              </li>-->
        <li>项目类型：
          <span class="overflow-hidden" :title="item.projectId |enumConvert(',')">{{item.projectId |enumConvert(',')}}</span>
        </li>
      </ul>
      <!-- <jButton class="btn-refresh" @click="refreshData">
        <i class="iconfont icon-f14" :class="{'rotate':refreshTime}"></i>{{refreshName}}
      </jButton> -->
      <!-- <p class="refresh-date">更新时间：{{item.dataUpdateTime | dateFormat}}</p> -->
    </header>
    <section class='bodyContent'>
      <div>
        <top-nav :bok="listed" :entName="item.name" :isAttention="item.attention"></top-nav>
        <!--<select-tab :entName="item.name"></select-tab>-->
        <router-view></router-view>
      </div>
    </section>
    <!--弹出框内容-->
    <j-attention :entId='item.id' ref="attention_dialog" @save="attended"></j-attention>
    <j-add-remark :msg="remarkMsg" ref="remark_dialog" :entId="item.id "></j-add-remark>
    <j-confirm ref="confirm" :msg="attentionMsg" @confirm="cancleAttend"></j-confirm>
  </div>
</template>
<script>
import topNav from './topNav'
import { jAttention, jAddRemark } from '../components'
import { basicInfo as basicInfoA, attention as attentionA, personalSetting } from '../../api'
import { jConfirm, jButton } from '../../components'

export default {
  data() {
    return {
      timer: null,
      refreshName: '更新数据',
      refreshTime: false,
      listed: true,
      item: {
        id: 0,
        name: '',
        attention: false,
        legalPerson: '',
        address: '',
        enterprisePhone: '',
        url: '',
        projectId: '',
        usedName: ''
      },
      projectTypes: [],
      isMarket: '',
      remarkMsg: '',
      attentionMsg: ''
    }
  },
  methods: {
    // 刷新数据
    refreshData() {
      this.refreshTime = true
      this.refreshName = '正在更新'
      basicInfoA.updateNew({
        entId: this.entId,
        entName: this.entName
      }).then(rtn => {
        if (rtn.code) {
          this.delayTime = rtn.data.consumeTimes * 1000 || 300000
        }
        this._refresh(this.delayTime)
      }).catch((err) => {
        this.refreshTime = false
        this.refreshName = '更新数据'
        let _this = this
        if (err.code === -1) {
          this.tooltip.content = '该企业今天已重新采集过数据'
        } else {
          this.tooltip.content = '数据中心接口异常'
        }
        this.tooltip.show = true
        setTimeout(function() {
          _this.tooltip.show = false
          // _this.initCollection()
        }, 2000)
      })
    },
    _refresh(time) {
      var _this = this
      this.timer = setTimeout(function() {
        _this.refreshTime = false
        _this.refreshName = '更新数据'
        location.reload(true)
      }, time)
    },
    amend(entId, projectTypeId) {
      if (this.item.attention) {
        personalSetting.isMonitor({ entId: this.item.id }).then((res) => {
          if (res.data.length) {
            this.attentionMsg = '确定取消关注该企业吗？<br/>该企业处于监控状态，取消关注将同时取消监控！'
          } else {
            this.attentionMsg = '确定取消关注该企业吗？'
          }
          this.$refs.confirm.show()
        }).catch(err => {
          this.operaState.code = -1
          this.operaState.msg = err.msg || '取消失败！'
          this.$refs.operaMsg.show()
        })
      } else {
        this.$refs.attention_dialog.show()
      }
    },
    remark() {
      this.$refs.remark_dialog.show()
    },
    getList() {
      let params = {
        entId: this.item.id,
        // entName: '金宝街有限责任公司'
        entName: this.item.name
      }
      // 企业基本信息
      basicInfoA.BaseInfo(params).then(data => {
        this.item = Object.assign(this.item, data.data)
        if (this.item.isMarket === '是') {
          this.listed = true
        } else {
          this.listed = false
        }
      })
    },
    getIsAttention() {
      /** 是否关注**/
      let params = {
        entId: this.item.id
      }
      attentionA.IsAttention(params).then(data => {
        this.item.attention = !!(+data.data)
      })
    },
    attended(proTypes) {
      this.item.projectId = proTypes.map(pro => { return pro.value }).join(',')
      this.item.attention = true
    },
    cancleAttend() {
      attentionA.cancelAttention({ entId: this.item.id }).then(rtn => {
        if (rtn.code === 1) {
          this.item.attention = false
        }
      })
    }
  },
  mounted() {
    this.item.id = this.$route.params.id
    this.item.name = this.$route.query.entName
    this.getList()
    this.getIsAttention()
  },
  components: {
    topNav,
    jAttention,
    jAddRemark,
    jConfirm,
    jButton
  }
}

</script>
<style scoped lang='less'>
.companyLibrary {
  width: 96%;
  margin: 0 auto;
  header {
    position: relative;
    .refresh-date {
      width: 150px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      right: 0;
      top: 102px;
      font-size: 12px;
    }
    .btn-refresh {
      width: 150px;
      height: 40px;
      border-radius: 4px;
      line-height: 40px;
      border: 1px solid #78bffb;
      color: #78bffb;
      text-align: center;
      position: absolute;
      right: 0px;
      top: 60px;
      .icon-f14 {
        font-size: 20px;
        display: inline-block;
        margin-right: 10px;
      }
      &:hover {
        color: #fff;
        background: #78bffb;
      }
      .rotate {
        animation: refreshrotate 1s linear infinite;
      }

      @keyframes refreshrotate {
        from {
          transform: rotateZ(0deg);
        }
        to {
          transform: rotateZ(360deg);
        }
      }
    }
    .headList {
      width: 100%;
      margin-bottom: 15px;
      li {
        width: 30%;
        float: left;
        margin-bottom: 16px;
        color: #999;
        span {
          color: #000;
          display: inline-block;
          width: calc(~ "100% - 100px");
        }
      } // li:nth-child(2) {
      //   width: 50%;
      // }
      // li:nth-child(4) {
      //   span {
      //     color: #0e93f6
      //   }
      // }
      // li:nth-child(5) {
      //   b {
      //     color: #000;
      //   }
      // }
    }
    h3 {
      font-size: 14px;
      margin: 20px 0 18px 0;
      float: left;
      margin-right: 14px;
      font-size: 22px;
    }
    .titleSmall {
      font-size: 12px;
      color: #999;
      margin-bottom: 30px;
    }
    label {
      // width: 54px;
      padding: 0 10px;
      height: 26px;
      background: #ff6905;
      border-radius: 2px;
      text-align: center;
      line-height: 26px;
      color: #fff;
      margin: 22px 14px 0 0;
      float: left;
    }
    .listingMarket {
      background: #3f98e4;
    }
    .rightBox {
      float: left;
    }
    .concern {
      float: right;
      .add {
        position: absolute;
        top: 4px;
        left: 4px;
        font-style: normal;
      }
      button {
        border-radius: 2px;
        border: 1px solid #0092ff;
        color: #0092ff;
        display: inline-block;
        text-align: center;
        margin-top: 22px;
        margin-left: 10px;
        position: relative;
        background: #fff;
        font-family: "微软雅黑";
        padding: 5px 13px;
      }
    }
  }
  .bodyContent {
    .bodyNav {
      width: 100%;
      li {
        width: 12.4%;
        float: left;
        height: 52px;
        background: #f2f2f2;
        text-align: center;
        line-height: 52px;
        border-right: 1px solid #d5d5d5;
        border-radius: 2px;
        /*margin-left:-1px;*/
        a {
          font-size: 13px;
          color: #000;
        }
      }
      li:nth-child(1) {
        border-left: 1px solid #f2f2f2;
      }
    }
  }
  .clearFix:after {
    display: block;
    content: "";
    clear: both;
  }
}
</style>
