<template>
  <div class='personSetPage'>
    <div class='mainContent clearFix'>
      <div class='bodyContent'>
        <h3>数据源审核</h3>
        <div class='bodyContentTop'>
          <div class='labelBox'>
            <span class='dataType'>数据源审核状态：</span>
            <j-select :initItems="appearstate" v-model='setupDt' displayKey="name" valueKey="value" :selectedIndex="0" @change="queryByState"> </j-select>
            <span class='time'>时间：</span>
            <j-date-picker v-model="startTime" :max="endTime" @change="queryByStartTime"></j-date-picker> -
            <j-date-picker v-model="endTime" :min="startTime" @change="queryByEndTime"></j-date-picker>
          </div>
        </div>
        <div class='bodyContentBottom'>
          <div class='clearFix formLabel'>
            <span class='sort'>排序：</span>
            <j-sort-button text="申请时间" @sort="sort"></j-sort-button>
          </div>
          <div class='tableBox'>
            <table class='tableForm table-fixed'>
              <tr>
                <th width="5%">序号</th>
                <th width="15%">数据源名称</th>
                <th width="20%">网址</th>
                <th width="10%">申请人</th>
                <!--<th width="10%">申请人所在部门</th>-->
                <th width="15%">申请时间</th>
                <th width="10%">审核状态</th>
                <th width="10%">操作</th>
                <th width='10%'>查看详情</th>
              </tr>

              <tr class="no-hover">
                <td :colspan="operaAuth?9:8" v-if="queryState.code!=1">
                  <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
                </td>
              </tr>

              <tr v-for='(item,index) in tableForms.list' class='contentMsg'>
                <td class="text-center">{{serialNum(index)}}</td>
                <td :title="item.dataSourceName">{{item.dataSourceName}}</td>
                <td class="item-subject" :title="item.dataSourceUrl">
                  <a>{{item.dataSourceUrl}}</a>
                </td>
                <td>{{item.applyPersonName}}</td>
                <!--<td>{{item.departMentName}}</td>-->
                <td class="text-center">{{item.applyTime|dateFormat}}</td>
                <!-- 28:未审核，29:已通过，30:未通过 -->
                <td class="text-center" :class="{green:item.auditStatus==29,red:item.auditStatus==30,yellow:item.auditStatus==28}">{{item.auditStatus|enumConvert}}</td>
                <td class='handleSpan text-center'>
                  <span v-auth="auths.pass" v-if="item.auditStatus===28" @click='pass(item)'>通过</span>
                  <span v-auth="auths.refused" v-if="item.auditStatus===28" @click='amend(item.id)'>拒绝</span>
                  <div v-if="(item.auditStatus===29) || (item.auditStatus===30)">
                    <button disabled class="dis">通过</button>
                    <button disabled class="dis">拒绝</button>
                  </div>
                </td>
                <td class="text-center">
                  <a class='checkDetail' @click='checkData(item)'>查看详情</a>
                </td>
              </tr>
            </table>

            <p class='record'>共{{tableForms.total}}条记录</p>
            <j-paging :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="tableForms.total" @pageChanged="getList"></j-paging>

            <j-refuse-apply label="不通过原因" title='拒绝本条数据源申请' ref="attention_dialog" @save="refuse"></j-refuse-apply>
            <j-data-apply ref="checkDetail" :title="'数据源申请详情'" :itemList="selectedEnt"></j-data-apply>
            <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { jPaging, jSortButton, jSelect, jDatePicker, jPageMsg, jOperaMsg } from '../../components'
import jRefuseApply from '../components/jRefuseApply.vue'
import jDataApply from '../components/jDataApply.vue'
import { dataAudit as api } from '../../api'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import { Code } from '../../assets/js/operaCode.js'

export default {
  data: function () {
    return {
      // items: ['批量通过', '批量拒绝'],
      serialNum: function (index) {
        return (this.pageIdx - 1) * 5 + (index + 1);
      },
      refuseId: 0, // 被拒绝的企业id
      selectedEnt: {},
      tableForms: [],//审核列表数据

      pageIdx: 1,
      pageSize: 10,
      total: 0,

      flag: 0,
      sortColumn: 'APPLY_TIME',
      order: 'ASC',
      setupDt: '', //数据源审核状态
      startTime: '',
      endTime: '',

      operaAuth: hasAuth(`${AUTHS.DataSourceApply_Pass}||${AUTHS.DataSourceApply_Refused}`),
      auths: {
        pass: AUTHS.DataSourceApply_Pass,
        refused: AUTHS.DataSourceApply_Refused
      },
      opera: {
        code: 1,
        msg: ''
      },
      queryState: {
        code: Code.Loading,
        mode: 'f',
        msg: ''
      }
    }
  },
  computed: {
    appearstate() {
      return [{ name: '全部', value: '' }].concat(this.$store.state.datasource_examine_statue);
    }
  },
  methods: {
    /* 排序 */
    sort: function (order) {
      this.order = order;
      this.getList(1);
    },
    /* 查看、检测和拒绝 */
    checkData: function (item) {
      this.selectedEnt = item;
      this.$refs.checkDetail.show();
    },
    pass: function (item) {
      const params = {
        id: item.id,
        checkOrDeal: 1
      };
      api.DataPass(params).then(data => {
        this.getList(this.pageIdx);
        this.opera.code = 1;
        this.opera.msg = '操作成功!';
        this.$refs.operaMsg.show();
      }).catch(err => {
        this.opera.code = -1;
        this.opera.msg = err.msg || '操作失败！';
        this.$refs.operaMsg.show();
      });
    },
    amend: function (id) {
      this.refuseId = id;
      this.$refs.attention_dialog.show();
    },
    refuse: function (reason) {
      const params = {
        id: this.refuseId,
        additRefuseReason: reason,
        checkOrDeal: 1
      };
      // 申请拒绝数据
      api.DataRefuse(params).then(data => {
        this.getList(this.pageIdx);
        this.opera.code = 1;
        this.opera.msg = '操作成功！';
        this.$refs.operaMsg.show();
      }).catch(err => {
        this.opera.code = -1;
        this.opera.msg = err.msg || '操作失败！';
        this.$refs.operaMsg.show();
      });
    },
    /* 分页查询数据 */
    getList: function (pageNum) {
      this.pageIdx = pageNum;
      const params = {
        pageSize: this.pageSize,
        pageNum: this.pageIdx,
        order: this.order,
        sortColumn: this.sortColumn,
        qStartTime: this.startTime ? (this.startTime + ' 00:00:00') : '',
        qEndTime: this.endTime ? (this.endTime + ' 23:59:59') : '',
        auditStatus: this.setupDt,
        flag: 1
      };
      /**数据源审核列表数据**/
      api.DataSelectList(params).then(data => {
        this.tableForms = data.data;
        this.queryState.code = data.data.list.length == 0 ? Code.NoData : data.code;
        this.queryState.msg = data.msg;
      }).catch(err => {
        this.queryState.code = err.code;
        this.queryState.msg = err.msg;
      });
    },
    queryByState: function (item) {
      this.setupDt = item.value;
      this.getList(1);
    },
    queryByStartTime: function (d) {
      this.startTime = d;
      this.getList(1);
    },
    queryByEndTime: function (d) {
      this.endTime = d;
      this.getList(1);
    }
  },
  mounted: function () {
    this.getList(1);
  },
  components: {
    jSortButton,
    jSelect,
    jDatePicker,
    jPaging,
    jRefuseApply,
    jDataApply,
    jPageMsg,
    jOperaMsg
  }
};

</script>
<style scoped lang='less'>
.personSetPage {
  width: 100%;
  .mainContent {
    width: 100%;
    .bodyContent {
      width: 100%;
      h3 {
        font-size: 18px;
        color: #333;
        margin: 18px 0 24px 0;
      }
      .bodyContentTop {
        width: 100%;
        /*height: 170px;*/
        background: #f4f4f4;
        border: 1px solid #ccc;
        .search {
          margin: 30px 0 0 40px;
        }
        .time {
          margin-left: 45px;
        }
        .labelBox {
          padding: 16px 0 13px 40px;
          label {
            padding: 7px 24px;
            border: 1px solid #ccc;
            border-radius: 2px;
            margin: 0 20px 11px 0;
          }
        }
      }
      .bodyContentBottom {
        width: 100%;
        margin-top: 24px;
        label {
          width: 78px;
          height: 27px;
        }
        .formLabel {
          button {
            float: left;
            border-radius: 2px;
            text-align: center;
            line-height: 27px;
          }
          .addShift {
            float: right;
            .on {
              background: #3699ee;
              color: #fff;
            }
            button {
              margin-left: 10px;
              width: 83px;
              height: 27px;
              border: 1px solid #6daeff;
              background: #fff;
              color: #3699ed;
              border-radius: 4px;
              font-family: '微软雅黑';
            }
          }
          .addTime {
            width: 78px;
            height: 27px;
            background: #fc7322;
            display: inline-block;
          }
          .sort {
            float: left;
          }
        }
        .tableBox {
          width: 100%;
          margin-top: 13px;
          .tableForm {
            th,
            td {
              color: #4c4c4c;
            }
            .jNoDataPos {
              margin-top: 8px;
              margin-left: 20px;
              text-align: left;
            }
            width:100%;
            border:1px solid #ccc;
            .handleSpan {
              span:nth-child(1) {
                color: #3b7be4;
                padding: 4px;
                cursor: pointer;
              }
              span:nth-child(2) {
                color: #dd1507;
                padding: 4px;
                cursor: pointer;
              }
            }
            .checkDetail {
              text-decoration: none;
              cursor: pointer;
            }
            .contentMsg {
              td:nth-child(4) {
                color: #005ed3;
              }
            }
            .yellow {
              color: #ff7800;
            }
            .red {
              color: #dd1507;
            }
            .green {
              color: #00a52f;
            }
          }
          .record {
            margin-top: 28px;
            color: #666;
            float: left;
          }
        }
      }
    }
  }
  .clearFix:after {
    display: block;
    clear: both;
    content: '';
  }
  .dis {
    background: #fff;
    ;
    color: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
}
</style>
