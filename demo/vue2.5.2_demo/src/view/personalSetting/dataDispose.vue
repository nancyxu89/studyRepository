<template>
  <div class='personSetPage'>
    <div class='mainContent clearFix'>
      <div class='bodyContent'>
        <h3>数据源处理</h3>
        <div class='bodyContentTop'>
          <div class='labelBox'>
            <span class='dataType'>数据源处理状态：</span>
            <j-select :initItems="appearstate" v-model='setupDt' displayKey="name" valueKey="value" :selectedIndex="0" @change="queryByState">
            </j-select>
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
                <th width="20%">数据源名称</th>
                <th width="25%">网址</th>
                <th width="10%">申请时间</th>
                <th width='10%'>审核时间</th>
                <th width="10%">处理状态</th>
                <th width='10%'>查看详情</th>
                <th width="10%">操作</th>
              </tr>

              <tr class="no-hover">
                <td :colspan="operaAuth?8:7" v-if="queryState.code!=1">
                  <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
                </td>
              </tr>

              <tr v-for='(item,index) in formDatas' class='contentMsg'>
                <td class="text-center">{{ setSerialNum(index) }}</td>
                <td class="item-subject" :title="item.dataSourceName">{{item.dataSourceName}}</td>
                <td class="item-subject" :title="item.dataSourceUrl">
                  <a>{{item.dataSourceUrl}}</a>
                </td>
                <td class="text-center">{{item.applyTime | dateFormat}}</td>
                <td class="text-center">{{item.auditTime | dateFormat}}</td>
                <!-- 71:未处理，72:检测失败，73:检测成功 -->
                <td class="text-center" :class="{green:item.opinionplatAddStatus===73,red:item.opinionplatAddStatus===72,yellow:item.opinionplatAddStatus===71}">{{item.opinionplatAddStatus | enumConvert}}</td>
                <td class="text-center">
                  <a class='checkDetail' @click='checkData(item)'>查看详情</a>
                </td>
                <td class='handleSpan text-center'>
                  <span v-auth="auths.pass" v-if="item.opinionplatAddStatus===71" @click='detection(item)'>监测</span>
                  <span v-auth="auths.refused" v-if="item.opinionplatAddStatus===71" @click='refuseConfirm(item.id)'>拒绝</span>
                  <div v-if="item.opinionplatAddStatus!==71">
                    <button disabled class="dis">监测</button>
                    <button disabled class="dis">拒绝</button>
                  </div>
                </td>
              </tr>
            </table>
            <p class='record'>共{{totalCount}}条记录</p>
            <j-paging :init-total-count="totalCount" :init-page-size="pageSize" :init-page-index="pageIdx" @pageChanged="query"></j-paging>
            <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
          </div>
        </div>
      </div>
    </div>
    <j-data-apply ref="checkDetail" :title="'数据源申请详情'" :itemList="selectedEnt"></j-data-apply>
    <j-refuse-apply title='拒绝本条数据源监测' label='监测失败原因' @save="refuseDispose" ref="refuseConfirm"></j-refuse-apply>
  </div>
</template>
<script>
import { jPaging, jSortButton, jSelect, jDatePicker, jConfirm, jPageMsg, jOperaMsg } from '../../components'
import jDataApply from '../components/jDataApply.vue'
import jRefuseApply from '../components/jRefuseApply.vue'
import { dataDispose as api } from '../../api'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import { Code } from '../../assets/js/operaCode.js'

export default {
  data() {
    return {
      setSerialNum(index) {
        return (this.pageIdx - 1) * 10 + (index + 1)
      },

      entId: '',
      selectedEnt: {},
      formDatas: [],

      pageIdx: 1,
      pageSize: 10,
      totalCount: 0,

      sortColumn: 'APPLY_TIME',
      order: 'ASC',
      setupDt: '', // 数据源处理状态
      startTime: '',
      endTime: '',

      operaAuth: hasAuth(`${AUTHS.DataSourceDeal_Pass}||${AUTHS.DataSourceDeal_Refused}`),
      auths: {
        pass: AUTHS.DataSourceDeal_Pass,
        refused: AUTHS.DataSourceDeal_Refused
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
      return [{ name: '全部', value: '' }].concat(this.$store.state.datasource_monitor_statue);
    }
  },
  methods: {
    /* 排序 */
    sort(order) {
      this.order = order
      this.query(1)
    },
    /* 查看、检测和拒绝 */
    checkData(item) {
      this.selectedEnt = item
      this.$refs.checkDetail.show()
    },
    detection(item) {
      let paramsJson = {
        id: item.id,
        checkOrDeal: 2
      }
      api.dataSourcePass(paramsJson).then(data => {
        this.query(this.pageIdx)
        this.opera.code = 1
        this.opera.msg = '操作成功!'
        this.$refs.operaMsg.show()
      }).catch(err => {
        this.opera.code = -1
        this.opera.msg = err.msg || '操作失败！'
        this.$refs.operaMsg.show()
      })
    },
    refuseConfirm(id) {
      this.entId = id
      this.$refs.refuseConfirm.show()
    },
    refuseDispose(reason) {
      let paramsJson = {
        id: this.entId,
        opinionplatRefuseReason: reason,
        checkOrDeal: 2
      }
      api.dataSourceRefused(paramsJson).then(data => {
        this.query(this.pageIdx)
        this.opera.code = 1
        this.opera.msg = '操作成功！'
        this.$refs.operaMsg.show()
      }).catch(err => {
        this.opera.code = -1
        this.opera.msg = err.msg || '操作失败！'
        this.$refs.operaMsg.show()
      })
    },
    /* 分页查询数据 */
    query(pageIdx = 1) {
      let paramsJson = {
        pageSize: this.pageSize,
        pageNum: pageIdx,
        order: this.order,
        sortColumn: this.sortColumn,
        opinionplatAddStatus: this.setupDt,
        qStartTime: this.startTime ? (this.startTime + ' 00:00:00') : '',
        qEndTime: this.endTime ? (this.endTime + ' 23:59:59') : '',
        flag: 2
      }
      api.dataSourcePage(paramsJson).then(data => {
        this.formDatas = data.data.list
        this.pageIdx = data.data.pageNum || 1
        this.pageSize = data.data.pageSize || 10
        this.totalCount = data.data.total || 0
        this.queryState.code = data.data.list.length === 0 ? Code.NoData : data.code
        this.queryState.msg = data.msg
      }).catch(err => {
        this.queryState.code = err.code
        this.queryState.msg = err.msg
      })
    },
    queryByState(item) {
      this.setupDt = item.value
      this.query(1)
    },
    queryByStartTime(d) {
      this.startTime = d
      this.query(1)
    },
    queryByEndTime(d) {
      this.endTime = d
      this.query(1)
    }
  },
  mounted() {
    this.query(1)
  },
  components: {
    jSortButton,
    jSelect,
    jDatePicker,
    jPaging,
    jConfirm,
    jRefuseApply,
    jDataApply,
    jPageMsg,
    jOperaMsg
  }
}

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
              height: 23px;
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
  .dis {
    background: #fff;
    color: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
  .clearFix:after {
    display: block;
    clear: both;
    content: '';
  }
}
</style>
