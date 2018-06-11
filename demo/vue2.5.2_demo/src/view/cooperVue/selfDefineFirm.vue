<template>
  <div class='bodyBox'>
    <!--自定义关联企业-->
    <div class='tableBox'>
      <table class='table-fixed' width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class='tableHead'>
          <th width="5%">序号</th>
          <th width="20%">自定义关联企业名称</th>
          <th width="15%">企业简称</th>
          <th width="20%">添加时间</th>
          <th width="20%">操作</th>
        </tr>
        <tr class="no-hover" v-if="queryState.code!=1">
          <td :colspan="5">
            <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in items' v-bind:key="index" class='contentMsg'>
          <td class="text-center">{{ index+1 }}</td>
          <td>{{item.entName}}</td>
          <td>{{item.entShortName}}</td>
          <td class="text-center">{{item.inTime|dateFormat}}</td>
          <td class='handleSpan text-center'>
            <span @click='showDialog(item.id)'>修改</span>
            <span @click='deleteData(item.id)'>删除</span>
          </td>
        </tr>
      </table>
      <button class='add-btn' @click="showDialog(-1)" v-auth="auths.add" :disabled="items.length>=10">新增自定义关联企业</button>
      <p class='addNum'>您最多可添加10个自定义关联企业。</p>
    </div>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg" @close="close"></jOperaMsg>
    <j-custom-bounced :list-id="listId" :ent-id="entId" ref="attention_dialog" @saving="listChange"></j-custom-bounced>
  </div>
</template>
<script>
import jCustomBounced from '../components/jCusTomBounced.vue'
import { jPaging, jPageMsg, jOperaMsg } from '../../components'
import { selfDefineList as api } from '../../api'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { Code } from '../../assets/js/operaCode.js'
export default {
  data: function() {
    return {
      // entId: 2282191,
      entId: '',
      listId: 0,
      attentionCutomerId: 0,
      isNoData: false,
      loading: true,
      items: [],
      enterName: '',
      auths: {
        add: AUTHS.AddWarningPush,
        modify: AUTHS.ModifyWarningPush,
        del: AUTHS.DelWarningPush
      },
      queryState: {
        code: Code.Loading,
        msg: ''
      },
      opera: {
        code: 1,
        msg: ''
      }
    }
  },
  components: {
    jCustomBounced,
    jPaging,
    jPageMsg,
    jOperaMsg
  },
  methods: {
    close() { },
    showDialog: function(id) {
      this.$refs.attention_dialog.show()
      if (id) {
        this.listId = id
      }
    },
    // 删除列表数据
    deleteData: function(id) {
      this.queryState.code = Code.Loading
      let paramsJson = {
        id: id
      }
      api.deleteData(paramsJson).then(data => {
        this.opera.code = 1
        this.opera.msg = '删除成功！'
        this.$refs.operaMsg.show()
        this.getDataList()
      })
    },
    // 获取列表数据
    getDataList() {
      this.queryState.code = Code.Loading
      this.enterName = this.$route.query.entName
      api.formDataList({ entId: this.$route.params.id }).then(data => {
        this.items = data.data
        this.queryState.code = this.items.length === 0 ? Code.NoData : Code.Success
        if (this.items.length === '') {
          this.isNoData = true
        }
      })
    },
    // 关闭弹窗后修改数据
    listChange() {
      this.listId = 0
      this.getDataList()
    },
    // 修改列表数据
    reviseData: function(id) {
      let paramsJson = {
        id: id
      }
      api.resetData(paramsJson).then(data => {
        console.log(data)
      })
    }
  },
  mounted: function() {
    // this.entId=this.$route.params.id;
    this.getDataList()
  }
}

</script>
<style scoped lang="less">
.bodyBox {
  width: 100%;
  .tableBox {
    margin-top: 40px;
    .table-fixed {
      width: 100%;
      .handleSpan {
        span:nth-child(1) {
          color: #3b7be4;
          cursor: pointer;
        }
        span:nth-child(2) {
          color: #dd1507;
          cursor: pointer;
        }
      }
      .tableHead {
        background: #f4f4f4;
      }
      .contentMsg {
        td:nth-child(5) {
          color: #005ed3;
        }
      }
    }
  }
  .add-btn {
    margin-top: 22px;
    width: 166px;
    /*background:#e5f3ff;*/
    border-color: #add9ff;
    color: #3f98e4;
    text-align: center;
    /*background: url(../../assets/images/add.png) no-repeat 10px #e5f3ff;*/
  }
  .addNum {
    margin: 10px 0 20px 5px;
    color: #4c4c4c;
  }
}
</style>
