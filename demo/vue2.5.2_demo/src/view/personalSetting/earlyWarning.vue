<template>
  <div class="warning-main">
    <div class="top-title">
      <div class="title-label">预警推送</div>
    </div>
    <div class="new-btn fr">
      <button class="pub-btn new-create" @click="gotoCreate" :disabled="items.length>=10" v-auth="auths.add">新建</button>
    </div>
    <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
      <thead>
        <th width="8%">序号</th>
        <th width="22%">推送名称</th>
        <th width="20%">预警企业</th>
        <th width="12%">推送信息</th>
        <th width="12%">推送状态</th>
        <th width="12%">推送起始时间</th>
        <th width="14%" v-if="operaAuth">操作</th>
      </thead>
      <tr class="no-hover" v-if="pageState.code!=Code.Success && pageState.code!=Code.Loading">
        <td :colspan="operaAuth?7:6">
          <jPageMsg mode="f" :code="pageState.code" :msg="pageState.msg"></jPageMsg>
        </td>
      </tr>
      <tr v-else v-for="(item,index) in items">
        <td class="text-center">{{item.number|| index+1}}</td>
        <td :title="item.name">{{item.name}}</td>
        <td :title="item.entName">{{item.entName}}</td>
        <td :title="item|pushContent">{{item|pushContent}}</td>
        <td class="text-center">{{item.status|enumConvert|stateConvert(item)}}</td>
        <td class="text-center">{{item.validStart|dateFormat}}</td>
        <td v-if="operaAuth" class="text-center">
          <router-link v-auth="auths.modify" :to="{path:'/setting/earlyWarningSet',query:{id:item.id}}" active-class="selected">修改</router-link>
          <a v-auth="auths.del" class="warning-del" @click='delHandler(item)'>删除</a>
        </td>
      </tr>
    </table>
    <span>针对您的监控企业,您最多可以设置10个不同的推送</span>
    <j-confirm ref="delConfim" msg="确认删除这条预警记录吗？" @confirm="delItem" :params="curItem"></j-confirm>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg"></jOperaMsg>
    <jLoading mode='f' v-if="pageState.code == Code.Loading"></jLoading>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { personalSetting as api } from '../../api'
import { jConfirm, jOperaMsg, jPageMsg, jLoading } from '../../components'
import { AUTHS } from '../../assets/js/handleAuth.js'
import { hasAuth } from '../../assets/js/auth.js'
import { Code } from '../../assets/js/operaCode.js'
export default {
  data() {
    return {
      items: [],
      entId: '',
      curItem: null,
      operaAuth: hasAuth(`${AUTHS.ModifyWarningPush}||${AUTHS.DelWarningPush}`),
      auths: {
        add: AUTHS.AddWarningPush,
        modify: AUTHS.ModifyWarningPush,
        del: AUTHS.DelWarningPush
      },
      Code: Code,
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
    getData() {
      // 显示Loading
      this.pageState.code = Code.Loading
      api.warningPushList().then(rtn => {
        this.pageState.code = rtn.data.list.length === 0 ? Code.NoData : Code.Success
        this.items = rtn.data.list
      }).catch(err => {
        this.pageState = err
      })
    },
    delHandler(item) {
      this.curItem = item
      this.$refs.delConfim.show()
    },
    gotoCreate() {
      if (this.items.length < 11) {
        this.$router.push('/setting/earlyWarningSet')
      }
    },
    delItem(item) {
      api.warningPushDelete({ id: item.id }).then(rtn => {
        this.opera.code = 1
        this.opera.msg = '删除成功！'
        this.$refs.operaMsg.show()
        this.getData()
      }).catch(err => {
        this.opera.code = -1
        this.opera.msg = err.msg || '删除失败！'
        this.$refs.operaMsg.show()
      })
    },
    ...mapActions({
      getList: 'getWarningPushTable'
    })
  },
  mounted() {
    this.getData()
  },
  filters: {
    pushContent(item) {
      return `${item.opinionWarningKeyword},${item.riskWorningTypeName}`.replace(/^,|,$/g, '')
    },
    stateConvert(value, item) {
      if (item.validPeriod === 51 && item.validEnd < new Date()) {
        return '暂停'
      }
      return value
    }
  },
  components: {
    jConfirm,
    jOperaMsg,
    jPageMsg,
    jLoading
  }
}
</script>
<style scoped lang='less'>
@import "../../assets/css/table.css";
.warning-main {
  .top-title {
    border-bottom: 1px solid #ccc;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 27px;
    .title-label {
      margin: 0px 0 20px 0;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .warning-del {
    color: #c86243;
    margin-left: 15px;
  }
  .new-create {
    display: block;
    margin-bottom: 11px;
    line-height: 26px;
    text-align: center;
  }
  span {
    font-size: 12px;
    display: block;
    margin-top: 17px;
  }
}
</style>
