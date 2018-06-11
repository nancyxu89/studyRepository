<template>
  <!--数据源申请-->
  <div class='personSetPage'>
    <div class='mainContent clearFix'>
      <div class='bodyContent'>
        <h3>数据源申请</h3>
        <hr/>
        <div class='bodyContentBottom'>
          <div class='clearFix formLabel'>
            <span class='sort'>排序：</span>
            <j-sort-button text="申请时间" @sort="sort"></j-sort-button>
            <div class='addShift'>
              <button v-auth="auths.add" class='save-btn' @click='addApplyData()'>添加</button>
            </div>
          </div>

          <div class='tableBox'>
            <table class='tableForm table-fixed'>
              <tr>
                <th width="5%">序号</th>
                <th width="10%">数据源名称</th>
                <th width="20%">网址</th>
                <th width="15%">申请时间</th>
                <th width='12%'>审核状态</th>
                <th width="13%">处理状态</th>
                <th width='15%'>查看详情</th>
                <th width='10%'>操作</th>
              </tr>

              <tr class="no-hover" v-if="queryState.code!=1">
                <td :colspan="operaAuth?8:7" >
                  <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
                </td>
              </tr>

              <tr v-for='(item,index) in formDatas' class='contentMsg' v-else>
                <td class="text-center">{{ setSerialNum(index) }}</td>
                <td class="item-subject" :title="item.dataSourceName">{{item.dataSourceName}}</td>
                <td class="item-subject" :title="item.dataSourceUrl">
                  <a>{{item.dataSourceUrl}}</a>
                </td>
                <td class="text-center">{{item.applyTime | dateFormat}}</td>
                <!-- 28:未审核，29:已通过，30:未通过 -->
                <td class="text-center" :class="{green:item.auditStatus===29,red:item.auditStatus===30,yellow:item.auditStatus===28}">{{item.auditStatus | enumConvert}}</td>
                <!-- 71:未处理，72:检测失败，73:检测成功 -->
                <td class="text-center" :class="{green:item.opinionplatAddStatus===73,red:item.opinionplatAddStatus===72,yellow:item.opinionplatAddStatus===71}">{{item.opinionplatAddStatus | enumConvert}}</td>
                <td class="text-center">
                  <a class='checkDetail' @click='checkData(item)'>查看详情</a>
                </td>
                <td class='handleSpan text-center'>
                  <span v-auth="auths.modify" v-if="item.auditStatus===28" @click='updateData(item)'>修改</span>
                  <span v-auth="auths.del" v-if="item.auditStatus===28" @click='delConfirm(item.id)'>删除</span>
                  <div v-if="item.auditStatus!==28">
                    <button disabled class="dis">修改</button>
                    <button disabled class="dis">删除</button>
                  </div>
                </td>
              </tr>
            </table>
            <p class='record'>共{{totalCount}}条记录</p>
            <j-paging :init-total-count="totalCount" :init-page-size="pageSize" :init-page-index="pageIdx" @pageChanged="query"></j-paging>
          </div>
        </div>
      </div>
    </div>
    <j-data-apply ref="checkDetail" :title="'数据源申请详情'" :itemList="selectedEnt"></j-data-apply>
    <j-datalist-bounced title="申请新增数据源" :item='selectedEnt' @saveOrUpdate="saveOrUpdate" ref='addFormData'></j-datalist-bounced>
    <j-confirm :msg="'您确定要删除选中的记录吗？'" :callFunc="'deleteById'" @deleteById="delById" ref='delConfirm'></j-confirm>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
  </div>
</template>
<script>
import { jPageMsg, jSortButton, jConfirm, jOperaMsg, jPaging } from '../../components'
import jDataApply from '../components/jDataApply.vue'
import jDatalistBounced from '../components/jDatalistBounced.vue'
import { dataApply as api } from '../../api'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import { Code } from '../../assets/js/operaCode.js'

export default {
  data: function() {
    return {
      setSerialNum: function(index) {
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

      operaAuth: hasAuth(`${AUTHS.ModifyDataSource}||${AUTHS.DelDataSource}`),
      auths: {
        add: AUTHS.AddDataSource,
        modify: AUTHS.ModifyDataSource,
        del: AUTHS.DelDataSource
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
  methods: {
    /* 排序和添加 */
    sort: function(order) {
      this.order = order
      this.query(1)
    },
    addApplyData: function() {
      this.selectedEnt = {
        dataSourceName: '',
        dataSourceUrl: '',
        dataSourceTypeId: 0,
        onOff: ''
      }
      this.$refs.addFormData.show()
    },
    /* 查看、修改和删除 */
    checkData: function(item) {
      this.selectedEnt = item
      this.$refs.checkDetail.show()
    },
    updateData: function(item) {
      this.selectedEnt = item
      this.$refs.addFormData.show()
    },
    delConfirm: function(id) {
      this.entId = id
      this.$refs.delConfirm.show()
    },
    delById: function() {
      let paramsJson = {
        id: this.entId
      }
      api.dataSourceDelById(paramsJson).then(data => {
        // 当前页显示的数据量
        var curTotal = document.getElementsByClassName('contentMsg').length
        if (curTotal > 1) {
          this.query(this.pageIdx)
        }
        if (curTotal === 1 && this.pageIdx > 1) {
          this.query(this.pageIdx - 1)
        } else {
          this.query(1)
        }
        this.opera.code = 1
        this.opera.msg = '删除成功！'
        this.$refs.operaMsg.show()
      }).catch(err => {
        this.opera.code = -1
        this.opera.msg = err.msg || '删除失败！'
        this.$refs.operaMsg.show()
      })
    },
    /* 分页查询数据 */
    query: function(pageIdx = 1) {
      let paramsJson = {
        pageSize: this.pageSize,
        pageNum: pageIdx,
        order: this.order,
        sortColumn: this.sortColumn,
        flag: 3
      }
      api.dataSourcePage(paramsJson).then(data => {
        this.formDatas = data.data.list
        this.pageIdx = data.data.pageNum || 1
        this.pageSize = data.data.pageSize || 10
        this.totalCount = data.data.total || 0
        this.queryState.code = data.data.list.length == 0 ? Code.NoData : data.code
        this.queryState.msg = data.msg
      }).catch(err => {
        this.queryState.code = err.code
        this.queryState.msg = err.msg
      })
    },
    /* 保存或者修改数据 */
    saveOrUpdate: function(newData) {
      let paramsJson = {
        id: newData.id,
        dataSourceName: newData.dataSourceName,
        dataSourceUrl: newData.dataSourceUrl,
        dataSourceTypeId: newData.dataSourceTypeId,
        onOff: newData.onOff
      }
      if (newData && newData.id) {
        api.dataSourceUpdate(paramsJson).then(data => {
          this.query(1)
          this.$refs.addFormData.close()
          this.opera.code = 1
          this.opera.msg = '修改数据成功!'
          this.$refs.operaMsg.show()
        }).catch(err => {
          this.opera.code = -1
          this.opera.msg = err.msg || '修改失败！'
          this.$refs.operaMsg.show()
        })
      } else {
        api.dataSourceAdd(paramsJson).then(data => {
          this.query(1)
          this.$refs.addFormData.close()
          this.opera.code = 1
          this.opera.msg = '添加数据成功!'
          this.$refs.operaMsg.show()
        }).catch(err => {
          this.opera.code = -1
          this.opera.msg = err.msg || '删除失败！'
          this.$refs.operaMsg.show()
        })
      }
    }
  },
  mounted: function() {
    this.query(1)
  },
  components: {
    jConfirm,
    jDataApply,
    jDatalistBounced,
    jSortButton,
    jOperaMsg,
    jPageMsg,
    jPaging
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
            button {
              margin-left: 10px;
              width: 83px;
              height: 27px;
              background: #3699ed;
              color: #fff;
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
            margin-top: 20px;
            color: #666;
            display: block;
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
  .handleSpan {
    span {
      cursor: pointer;
    }
    .dis {
      background: #fff;
      color: #555;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
}
</style>
