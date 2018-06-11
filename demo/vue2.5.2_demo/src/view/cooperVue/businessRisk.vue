<template>
  <!--企业风险-->
  <div class='basicBox'>
    <div class='midBasic'>
      <h3>工商变更
        <span class='record'>共{{ICChange.total}}条记录</span>
      </h3>
      <table class='table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>变更日期</th>
          <th>变更事项</th>
          <th>变更前内容</th>
          <th>变更后内容</th>
        </tr>
        <tr class="no-hover" v-if="ICChange.state.code!=Code.Success">
          <td colspan="5">
            <jPageMsg mode='s' :code="ICChange.state.code" :msg="ICChange.state.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in ICChange.list' v-bind:key="index" v-else>
          <td class="text-center">{{ serialNum(ICChange.pageIdx,index)}}</td>
          <td class="text-center" v-if="item.changeDate">{{item.changeDate|dateFormat}}</td>
          <td class="multi-line" :title="item.changeItem">{{item.changeItem || '--'}}</td>
          <td class="multi-line" :title="item.changeBefore">{{item.changeBefore || '--'}}</td>
          <td class="multi-line" :title="item.changeAfter">{{item.changeAfter || '--'}}</td>
        </tr>
      </table>
      <j-paging :initPageSize="pageSize" :initPageIndex="ICChange.pageIdx" :initTotalCount="ICChange.total" @pageChanged="getICChangeList"></j-paging>
    </div>
    <div class='midBasic btmBasic'>
      <h3>列入经营异常名单
        <span class='record'>共{{runAbnormal.total}}条记录</span>
      </h3>
      <table class='table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>列入经营异常名录原因</th>
          <th>列入日期</th>
          <th>作出决定机关（列入）</th>
          <th>移出经营异常名录原因</th>
          <th>移出日期</th>
          <th>作出决定机关（移出）</th>
        </tr>
        <tr class="no-hover" v-if="runAbnormal.state.code!=1">
          <td colspan="7">
            <jPageMsg mode='s' :code="runAbnormal.state.code" :msg="runAbnormal.state.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in runAbnormal.list' v-bind:key="index" v-else>
          <td class="text-center">{{ serialNum(runAbnormal.pageIdx,index) }}</td>
          <td :title="item.inputReason">{{item.inputReason || '--'}}</td>
          <td class="text-center">{{item.inputDate|dateFormat }}</td>
          <td :title="item.inputOrganization">{{item.inputOrganization || '--'}}</td>
          <td :title="item.outputReason">{{item.outputReason || '--'}}</td>
          <td class="text-center">{{item.outputDate |dateFormat}}</td>
          <td :title="item.outputOrganization">{{item.outputOrganization || '--'}}</td>
        </tr>
      </table>
      <j-paging :initPageSize="pageSize" :initPageIndex="runAbnormal.pageIdx" :initTotalCount="runAbnormal.total" @pageChanged="getRunAbnormalList"></j-paging>
    </div>
    <div class='midBasic btmBasic'>
      <h3>失信被执行人信息
        <span class='record'>共{{dishonesty.total}}条记录</span>
      </h3>
      <table class='table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>发布时间</th>
          <th>执行法院</th>
          <th>案号</th>
          <th>生效法律文书确定的义务</th>
          <th>被执行人的履行情况</th>
        </tr>
        <tr class="no-hover" v-if="dishonesty.state.code!=1">
          <td colspan="6">
            <jPageMsg mode='s' :code="dishonesty.state.code" :msg="dishonesty.state.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in dishonesty.list' v-bind:key="index" v-else>
          <td class="text-center">{{ serialNum(dishonesty.pageIdx,index) }}</td>
          <td class="text-center">{{item.publishDate|dateFormat}}</td>
          <td :title="item.court">{{item.court || '--'}}</td>
          <td :title="item.caseNo">{{item.caseNo || '--'}}</td>
          <td :title="item.duty">{{item.duty || '--'}}</td>
          <td :title="item.executeResult">{{item.executeResult || '--'}}</td>
        </tr>
      </table>
      <j-paging :initPageSize="pageSize" :initPageIndex="dishonesty.pageIdx" :initTotalCount="dishonesty.total" @pageChanged="getDishonestyList"></j-paging>
    </div>
    <div class='midBasic btmBasic'>
      <h3>处罚记录
        <span class='record'>共{{punish.total}}条记录</span>
      </h3>
      <table class='punish table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>处罚时间</th>
          <th>处罚文书号</th>
          <th>处罚单位</th>
          <th>处罚结果</th>
        </tr>
        <tr class="no-hover" v-if="punish.state.code!=1">
          <td colspan="5">
            <jPageMsg mode='s' :code="punish.state.code" :msg="punish.state.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in punish.list' v-bind:key="index" v-else>
          <td class="text-center">{{serialNum(punish.pageIdx,index)}}</td>
          <td class="text-center">{{item.publishtime|dateFormat}}</td>
          <td :title="item.bookNumber">{{item.bookNumber || '--'}}</td>
          <td :title="item.punishmentOrganization">{{item.punishmentOrganization || '--'}}</td>
          <td :title="item.punishmentContent">{{item.punishmentContent || '--'}}</td>
        </tr>
      </table>
      <j-paging :initPageSize="pageSize" :initPageIndex="punish.pageIdx" :initTotalCount="punish.total" @pageChanged="getPunishList"></j-paging>
    </div>
    <div class='midBasic btmBasic'>
      <h3>诉讼记录
        <span class='record'>共{{lawsuit.total}}条记录</span>
      </h3>
      <jLoading mode='s' v-if="lawsuit.state.code==Code.Loading"></jLoading>
      <table class='table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>发布时间</th>
          <th>执行法院</th>
          <th>案件编号</th>
          <th>详情</th>
        </tr>
        <tr class="no-hover" v-if="!lawsuit.total" v-cloak>
          <td colspan="5">
            <jPageMsg mode='s' :code="lawsuit.state.code" :msg="lawsuit.state.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in lawsuit.list' v-bind:key="index" v-else>
          <td class="text-center">{{serialNum(lawsuit.pageIdx,index)}}</td>
          <td class="text-center">{{item.publishtime|dateFormat}}</td>
          <td :title="item.courtname">{{item.courtname || '--'}}</td>
          <td :title="item.casecode">{{item.casecode || '--'}}</td>
          <td class="text-center" :title="item.url">
            <a :href="item.url || 'javascript:;'" :disabled="!item.url" target="_blank">详情</a>
          </td>
        </tr>
      </table>
      <j-paging :initPageSize="lawsuit.pageSize" :initPageIndex="lawsuit.pageIdx" :initTotalCount="lawsuit.total" @pageChanged="getLawsuitList"></j-paging>
    </div>
  </div>
</template>
<script>
import { jPaging, jPageMsg, jLoading } from '../../components'
import { Code } from '../../assets/js/operaCode.js'
import { firmRisk as api } from '../../api'
const pageSize = 5
export default {
  data() {
    return {
      pageSize: pageSize,
      Code: Code,
      serialNum(pageIdx, index) {
        return (pageIdx - 1) * pageSize + (index + 1)
      },
      ICChange: {
        list: [],
        total: 0,
        pageIdx: 1,
        state: {
          code: Code.Loading,
          msg: ''
        }
      },
      runAbnormal: {
        list: [],
        total: 0,
        pageIdx: 1,
        state: {
          code: Code.Loading,
          msg: ''
        }
      },
      dishonesty: {
        list: [],
        total: 0,
        pageIdx: 1,
        state: {
          code: Code.Loading,
          msg: ''
        }
      },
      punish: {
        list: [],
        total: 0,
        pageIdx: 1,
        state: {
          code: Code.Loading,
          msg: ''
        }
      },
      lawsuit: {
        list: [],
        total: 0,
        pageIdx: 1,
        pageSize: pageSize,
        state: {
          code: Code.Loading,
          msg: ''
        }
      }
    }
  },
  methods: {
    // 获取表格数据方法
    getICChangeList(pageIndex = 1) {
      this.ICChange.state.code = Code.Loading
      this.ICChange.pageIdx = pageIndex
      let params = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        entId: this.$route.params.id,
        entName: this.$route.query.entName
      }
      // 工商变更分页列表
      api.BusinessChangeInfoList(params).then(rtn => {
        this.ICChange.list = rtn.data.list
        this.ICChange.total = rtn.data.total || 0
        this.ICChange.state.code = this.ICChange.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.ICChange.total = 0
        this.ICChange.state = err
      })
    },
    getRunAbnormalList(pageIndex = 1) {
      this.runAbnormal.state.code = Code.Loading
      this.runAbnormal.pageIdx = pageIndex
      let params = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        entName: this.$route.query.entName
      }
      // 企业经营异常信息
      api.BusinessExceptionList(params).then(rtn => {
        this.runAbnormal.list = rtn.data.list
        this.runAbnormal.total = rtn.data.total || 0
        this.runAbnormal.state.code = this.runAbnormal.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.runAbnormal.total = 0
        this.runAbnormal.state = err
      })
    },
    getDishonestyList(pageIndex = 1) {
      this.dishonesty.state.code = Code.Loading
      this.dishonesty.pageIdx = pageIndex
      let params = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        entId: this.$route.params.id,
        entName: this.$route.query.entName
      }
      // 失信记录分页列表
      api.DishonestyEntInfoList(params).then(rtn => {
        this.dishonesty.list = rtn.data.list
        this.dishonesty.total = rtn.data.total || 0
        this.dishonesty.state.code = this.dishonesty.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.dishonesty.total = 0
        this.dishonesty.state = err
      })
    },
    getPunishList(pageIndex = 1) {
      this.punish.state.code = Code.Loading
      this.punish.pageIdx = pageIndex
      let params = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        entId: this.$route.params.id,
        entName: this.$route.query.entName
      }
      // 处罚记录分页列表
      api.PunishEntInfoList(params).then(rtn => {
        this.punish.list = rtn.data.list
        this.punish.total = rtn.data.total || 0
        this.punish.state.code = this.punish.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.punish.total = 0
        this.punish.state = err
      })
    },
    getLawsuitList(pageIndex = 1) {
      this.lawsuit.state.code = Code.Loading
      this.lawsuit.pageIdx = pageIndex
      let params = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        entId: this.$route.params.id,
        entName: this.$route.query.entName
      }
      // 诉讼记录分页列表
      api.SuitEntInfoList(params).then(rtn => {
        this.lawsuit.list = rtn.data.list
        this.lawsuit.total = rtn.data.total || 0
        this.lawsuit.state.code = this.lawsuit.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.lawsuit.total = 0
        this.lawsuit.state = err
      })
    }
  },
  mounted() {
    this.getICChangeList()
    this.getRunAbnormalList()
    this.getPunishList()
    this.getLawsuitList()
    this.getDishonestyList()
  },
  components: {
    jPaging,
    jLoading,
    jPageMsg
  }
}

</script>
<style scoped lang='less'>
.basicBox {
  width: 100%;
  .midBasic {
    position: relative;
    h3 {
      font-size: 14px;
      /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
      padding-left: 6px;
      margin: 35px 0 22px 0;
      border-left: 3px solid #ff6905;
      .record {
        color: #666;
        font-size: 12px;
      }
    }
    .punish {
      tr {
        td:nth-child(3) {
          color: #3550e4;
        }
      }
    }
    .lawsuit {
      tr {
        td:nth-child(4) {
          color: #3550e4;
        }
      }
    } // table {
    //   width: 100%;
    //   tr {
    //     height: 43px;
    //     text-align: center;
    //     line-height: 43px;
    //     th {
    //       background: #f2f1f1;
    //       border: 1px solid #ccc;
    //       font-size: 12px;
    //     }
    //     td {
    //       border: 1px solid #ccc;
    //       font-size: 12px;
    //       white-space: normal;
    //       /*min-width:200px; */
    //     }
    //   }
    // }
  }
  .btmBasic {
    margin-bottom: 48px;
  }
  .clearFix:after {
    display: block;
    clear: both;
    content: '';
  }
}
</style>
