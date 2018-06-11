<template>
  <div class='personSetPage'>
    <!--数据源列表-->
    <div class='mainContent clearFix'>
      <div class='bodyContent'>
        <h3>数据源列表</h3>
        <div class='bodyContentTop'>
          <div class="input-group search">
            <input type="text" placeholder="请输入数据源名称或网址" class="form-control" v-model="queryKey">
            <button class="input-group-addon search-btn" @click="query(1)">搜索</button>
          </div>
          <div class='clearFix labelBox'>
            <span class='dataType'>数据源类别：</span>
            <label v-for='item in dataSourceTypeList' @click='queryByType(item)' :class='{ active: item.id===(selectedDataSource && selectedDataSource.id) }'>{{item.dataSourceTypeName}}</label>
          </div>
        </div>
        <div class='bodyContentBottom'>
          <div class='clearFix formLabel'>
            <span class='sort'>排序：</span>
            <j-sort-button text="添加时间" @sort="sort"></j-sort-button>
            <div class='addShift'>
              <!--<button @click="amend()"><i>+</i>添加</button>-->
              <!--<button>批量删除</button>-->
            </div>
          </div>

          <div class='tableBox'>
            <table class='table-fixed' width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <!--<th width="5%"> <input type='checkBox' /> </th>-->
                <th width="5%">序号</th>
                <th width="25%">数据源名称</th>
                <th width="15%">类别</th>
                <th width="25%">网址</th>
                <th width="15%">添加时间</th>
                <th width="15%">操作</th>
              </tr>

              <tr class="no-hover">
                <td :colspan="operaAuth?6:5" v-if="queryState.code!=1">
                  <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
                </td>
              </tr>

              <tr v-for='(item,index) in formDatas' class='contentMsg'>
                <!--<td> <input type='checkBox' /> </td>-->
                <td class="text-center">{{ setSerialNum(index) }}</td>
                <td class="item-subject" :title="item.dataSourceName">{{item.dataSourceName}}</td>
                <td>{{item.dataSourceTypeName}}</td>
                <td class="item-subject" :title="item.dataSourceUrl">{{item.dataSourceUrl}}</td>
                <td class="text-center">{{item.opinionplatAddTime | dateFormat }}</td>
                <td class='handleSpan text-center'>
                  <!--<span @click="amend()">{{item.handle.reset}}</span>-->
                  <span v-auth="auths.del" @click='delConfirm(item.id)'>删除</span>
                </td>
              </tr>
            </table>
            <j-paging :init-total-count="total" :init-page-size="pageSize" :init-page-index="pageIdx" @pageChanged="query"></j-paging>
          </div>
        </div>
      </div>
    </div>
    <j-confirm :msg="'您确定要删除选中的记录吗？'" :callFunc="'deleteById'" @deleteById="delById" ref='delConfirm'></j-confirm>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
  </div>
</template>
<script>
import { jPaging, jSortButton, jLoading, jNoData, jConfirm, jPageMsg, jOperaMsg } from '../../components'
import { dataList as api } from '../../api'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import { Code } from '../../assets/js/operaCode.js'

export default {
  data: function () {
    return {
      setSerialNum: function (index) {
        return (this.pageIdx - 1) * 10 + (index + 1);
      },

      queryKey: '',
      selectedDataSource: null,
      dataSourceTypeList: [],
      entId: '',
      formDatas: [],

      pageIdx: 1,
      pageSize: 10,
      total: 0,

      order: '',
      sortColumn: 'OPINIONPLAT_ADD_TIME',

      operaAuth: hasAuth(`${AUTHS.DelDataSource}`),
      auths: {
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
    /* 排序 */
    sort: function (order) {
      this.order = order;
      this.query(1);
    },
    /* 删除 */
    delConfirm(id) {
      this.entId = id;
      this.$refs.delConfirm.show();
    },
    delById() {
      let paramsJson = {
        id: this.entId
      };
      api.dataSourceDelById(paramsJson).then(data => {
        if (data.code == 1) {
          this.opera.code = 1;
          this.opera.msg = '删除成功！';
          this.$refs.operaMsg.show();
          this.query();
        }
      }).catch(err => {
        this.opera.code = -1;
        this.opera.msg = err.msg || '删除失败！';
        this.$refs.operaMsg.show();
      })
    },
    /* 分页查询数据和类别 */
    query: function (pageIdx = 1) {
      let paramsJson = {
        mhdW: this.queryKey,
        pageSize: this.pageSize,
        pageNum: pageIdx,
        order: this.order,
        sortColumn: this.sortColumn,
        dataSourceTypeId: this.selectedDataSource && this.selectedDataSource.id
      };
      api.dataSourcePage(paramsJson).then(data => {
        this.formDatas = data.data.list;
        this.pageIdx = data.data.pageNum || 1;
        this.pageSize = data.data.pageSize || 10;
        this.total = data.data.total || 0;
        this.queryState.code = data.data.list.length == 0 ? Code.NoData : data.code;
        this.queryState.msg = data.msg;
      }).catch(err => {
        this.queryState.code = err.code;
        this.queryState.msg = err.msg;
      });
    },
    queryType: function (pageIdx = 1) {
      api.dataSourceTypeList().then(data => {
        this.dataSourceTypeList = data.data;
      })
    },
    queryByType: function (item) {
      this.selectedDataSource = item;
      this.query(1);
    }

  },
  mounted: function () {
    this.query(1);
    this.queryType();
  },
  components: {
    jConfirm,
    jPaging,
    jSortButton,
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
        height: 170px;
        background: #f4f4f4;
        border: 1px solid #ccc;
        .search {
          margin: 30px 0 0 40px;
        }
        .labelBox {
          margin: 20px 0 0 40px;
          label {
            padding: 7px 24px;
            border: 1px solid #ccc;
            border-radius: 2px;
            float: left;
            margin: 0 20px 11px 0;
            cursor: pointer;
          }
          .dataType {
            float: left;
            height: 70px;
            padding-top: 5px;
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
          label {
            float: left;
            border-radius: 2px;
            color: #fff;
            text-align: center;
            line-height: 27px;
          }
          .addShift {
            float: right;
            button {
              color: #fff;
              margin-left: 10px;
              width: 83px;
              height: 27px;
              background: #3699ee;
              border-radius: 4px;
              font-family: "微软雅黑"
            } // button:nth-child(1) {
            //   background: #fc7322;
            //   i {
            //     color: #fff;
            //     padding-right: 6px;
            //     font-size: 15px;
            //     font-style: normal;
            //   }
            // }
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
        .table-fixed {
          margin-top: 13px;
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
          .contentMsg {
            td:nth-child(3),
            td:nth-child(5) {
              color: #005ed3;
            }
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
  .active {
    background: #ff6c00;
    color: #fff;
  }
}
</style>
