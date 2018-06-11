<template>
  <div class='personSetPage'>
    <!--数据源类别-->
    <div class='mainContent clearFix'>
      <div class='bodyContent'>
        <h3>数据源类别</h3>
        <div class='bodyContentBottom'>
          <div class='clearFix formLabel'>
            <span class='sort'>排序：</span>
            <j-sort-button text="添加时间" @sort="sort"></j-sort-button>
            <div class='addShift'>
              <button v-auth="auths.modify" @click='amend()' class="" :disabled="items.total>=15">
                <i>+</i> 添加</button>
            </div>
          </div>
          <div class='tableBox'>
            <table class='table-fixed' width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <th width="10%">序号</th>
                <th width="25%">数据源类别</th>
                <th width="20%">修改人</th>
                <!--<th width="15%">所在部门</th>-->
                <th width="20%">修改时间</th>
                <th width="20%">操作</th>
              </tr>

              <tr class="no-hover" v-if="queryState.code!=1">
                <td :colspan="operaAuth?6:5" >
                  <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
                </td>
              </tr>

              <tr v-for="(item, index) in items.list" class='contentMsg' v-else>
                <td class="text-center">{{index + 1 }}</td>
                <td>{{item.dataSourceTypeName}}</td>
                <td>{{item.createPersonName}}</td>
                <!--<td>{{item.departMentName}}</td>-->
                <td class="text-center">{{item.createTime|dateFormat}}</td>
                <td class='handleSpan text-center'>
                  <span v-auth="auths.modify" @click='updateData(item)'>修改</span>
                  <span v-auth="auths.del" @click='delConfirm(item.id)'>删除</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <j-setdata-bounced :initCategory='category' ref="attention_dialog" @saved="saved"></j-setdata-bounced>
    <j-confirm :msg="'您确定要删除选中的记录吗？'" ref='delConfirm' @confirm='delData'></j-confirm>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { jPageMsg, jSortButton, jConfirm, jOperaMsg } from '../../components'
import jSetdataBounced from '../components/jSetDataBounced.vue'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import { Code } from '../../assets/js/operaCode.js'

export default {
  data: function() {
    return {
      category: null,
      // setSerialNum: function (index) {
      //     return (this.pageNum - 1) * 10 + (index + 1);
      // },
      pageNum: 1,
      pageSize: 1500,
      order: 'ASC',
      sortColumn: 'CREATE_TIME',
      delId: 0,

      operaAuth: hasAuth(`${AUTHS.AddDataSourceCatalog}||${AUTHS.ModifyDataSourceCatalog}`),
      auths: {
        add: AUTHS.AddDataSourceCatalog,
        modify: AUTHS.ModifyDataSourceCatalog,
        del: AUTHS.DelDataSourceCatalog
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
    ...mapGetters({
      items: 'dataSourceType'
    })
  },
  methods: {
    // 添加数据源类型
    amend: function() {
      this.category = {}
      this.$refs.attention_dialog.show()
    },
    // 删除数据源类型
    delConfirm(id) {
      this.delId = id
      this.$refs.delConfirm.show()
    },
    delData: function() {
      this.delDataSourceType({
        id: this.delId
      }).then(result => {
        if (result.code == 1) {
          this.opera.code = 1
          this.opera.msg = '删除成功！'
          this.$refs.operaMsg.show()
          this.query(1)
        }
      }).catch(err => {
        this.opera.code = -1
        this.opera.msg = err.msg || '删除失败！'
        this.$refs.operaMsg.show()
      })
    },
    // 更新数据源类型
    updateData: function(item) {
      this.category = item
      this.$refs.attention_dialog.show()
    },
    // 排序
    sort: function(order) {
      this.order = order
      this.query(1)
    },
    // 查询
    query: function(pageNum) {
      this.queryState.code = Code.Loading
      this.getDataSourceType({
        pageSize: 15,
        pageNum: 1,
        sortColumn: this.sortColumn,
        order: this.order
      }).then(data => {
        this.queryState.code = data.data.list.length == 0 ? Code.NoData : data.code
        this.queryState.msg = data.msg
      }).catch(err => {
        this.queryState.code = err.code
        this.queryState.msg = err.msg
      })
    },
    saved(isAdd) {
      this.query(isAdd ? 1 : this.pageNum)
      this.opera.code = 1
      this.opera.msg = isAdd ? '添加数据成功!' : '修改数据成功!'
      this.$refs.operaMsg.show()
    },
    ...mapActions({
      getDataSourceType: 'getDataSourceType',
      addDataSourceType: 'addDataSourceType',
      delDataSourceType: 'delDataSourceType'
    })
  },
  created: function() {
    this.query(1)
  },
  components: {
    jPageMsg,
    jSortButton,
    jSetdataBounced,
    jConfirm,
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
      .bodyContentBottom {
        width: 100%;
        margin-top: 24px;
        .formLabel {
          .addShift {
            float: right;
            button {
              margin-left: 10px;
              width: 83px;
              height: 27px;
              line-height: 27px;
              background: #fc7322;
              border-radius: 4px;
              color: #fff;
              cursor: pointer;
              &[disabled] {
                background: #ccc;
                cursor: not-allowed;
                box-shadow: none;
              }
            }
            i {
              color: #fff;
              font-size: 15px;
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
          margin-top: 13px;
          .table-fixed {
            width: 100%;
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
}
</style>
