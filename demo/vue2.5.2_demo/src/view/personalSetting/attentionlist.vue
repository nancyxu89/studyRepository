<template>
  <div class='person-attention'>
    <div class="top-title">
      <div class="public-list-title fl">关注列表</div>
      <div class="input-group fr">
        <input type="text" v-model="entName" id='entName' placeholder="请输入企业名称" class="form-control" @keydown.enter="query">
        <button class="input-group-addon search-btn" @click="query()">搜索</button>
      </div>
    </div>
    <div class="public-list-content">
      <div class="public-list-top">
        <div class="public-list-sort fl">
          <span>排序：</span>
          <j-sort-button text="成立时间" @sort="sort" :initState="buttonInit" id="relationBtn"></j-sort-button>
          <j-sort-button text="注册资本" @sort="sortByNew" id="recentBtn"></j-sort-button>
        </div>
        <div class="attention-statu fr">
          <div class="publist-list-category">
            <label>上市状态：</label>
            <j-select v-model="appearState" :initItems="appearStates" displayKey="text" valueKey="value" :selectedIndex="0" @change="filterChange">
            </j-select>
          </div>
          <div class="publist-list-category public-list-news">
            <label>项目类型：</label>
            <j-select v-model="projectSort" :initItems="projectTypes" displayKey="name" valueKey="value" :selectedIndex="tIdx" @change="filterChange">
            </j-select>
          </div>
        </div>
      </div>
      <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
        <thead>
          <th width="8%">序号</th>
          <th width="22%">企业名称</th>
          <th width="13%">项目类型</th>
          <th width="11%">法人</th>
          <th width="12%">注册资本(万元)</th>
          <th width="14%">成立时间</th>
          <th width="10%">修改项目类型</th>
          <th width="10%">关注</th>
        </thead>
        <tr v-for="(item,index) in items.list" v-bind:key="index">
          <td class="text-center">{{ setSerialNum(index) }}</td>
          <td class="item-subject">
            <router-link :to="{ path: '/corpor/'+item.entId, query: { entName: item.entName }}">{{item.entName}}</router-link>
          </td>
          <td :title="item.projectTypeId|enumConvert(',')">{{item.projectTypeId|enumConvert(',')}}</td>
          <td>{{item.legalRep}}</td>
          <td class="text-right">{{item.regAsset|currency}}</td>
          <td class="text-center">{{+item.setupDt|dateFormat}}</td>
          <td @click="amend(item)" class="text-center">
            <a>修改</a>
          </td>
          <td @click="cancel(item.entId)" class="text-center">
            <a class="cancel-attention">取消关注</a>
          </td>
        </tr>
        <tr v-if="!items.total" class="no-hover">
          <td colspan=8>
            <jPageMsg mode='f' :code="pageState.code" :msg="pageState.msg"></jPageMsg>
          </td>
        </tr>
      </table>
      <span class='record'>共{{items.total}}条记录</span>
      <j-paging :initPageSize="10" :initPageIndex="pageNum" :initTotalCount="items.total" @pageChanged="query"></j-paging>
    </div>
    <!--弹出框内容-->
    <j-attention :entId="entId" :isAdd="false" v-model="updateProjectType" ref="attention_dialog" @saved="saved" v-on:input="query(1)"></j-attention>
    <!--<j-popup :entId="entId" ref="popup_dialog" v-on:input="query(1)"></j-popup>-->
    <jConfirm ref='confirm' :params="entId" @confirm="cancelAttention" :msg="attentionMsg"></jConfirm>
    <jOperaMsg ref="operaMsg" :code="operaState.code" :msg="operaState.msg"></jOperaMsg>

    <jLoading loader='f' v-show="pageState.code === Code.Loading"></jLoading>
  </div>
</template>
<script>
import { jPaging, jSortButton, jSelect, jDialog, jDialogOne, jPageMsg, jConfirm, jOperaMsg } from '../../components'
import jLoading from '../../components/jLoading.vue'
import { jAttention } from '../components'
import { mapActions, mapGetters } from 'vuex'
import { attention as attentionAPI, personalSetting } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
let queryHandle = 0
export default {
  data() {
    return {
      Code: Code,
      appearState: '',
      projectSort: '',
      buttonInit: 'DESC',
      sortColumn: 'SETUP_DT',
      entName: '',
      entId: '',
      loading: true,
      order: '',
      tIdx: 0,
      pageNum: 1,
      setSerialNum(index) {
        return (this.pageNum - 1) * 10 + (index + 1)
      },
      updateProjectType: [],
      operaState: {
        code: 1,
        msg: ''
      },
      pageState: {
        code: Code.Loading,
        msg: ''
      },
      attentionMsg: '确定取消关注该企业吗？'
    }
  },
  computed: {
    projectTypes() {
      var projectTypes = this.$store.state.project_type
      return [{ name: '全部', value: 0 }].concat(...projectTypes)
    },
    appearStates() {
      var states = this.$store.state.appear_state
      return [{ text: '全部', value: '' }].concat(...states)
    },
    ...mapGetters({
      items: 'attrList'
    })
  },
  methods: {
    saved() {
      this.query(1)
    },
    sort(order) {
      this.order = order
      this.sortColumn = 'SETUP_DT'
      this.query(1)
    },
    sortByNew(order) {
      this.order = order
      this.sortColumn = 'REG_ASSET'
      this.query(1)
    },
    query(pageIndex = 1) {
      this.pageState.code = Code.Loading
      this.pageNum = pageIndex
      if (this.projectSort === 0) {
        this.projectSort = ''
      }
      this.getAttentionList({
        pageSize: 10,
        pageNum: pageIndex,
        sortColumn: this.sortColumn,
        order: this.order,
        projectTypeID: this.projectSort,
        listFlag: this.appearState,
        qName: this.entName

      }).then(rtn => {
        this.pageState.code = this.items.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.pageState = err
      })
    },
    amend(item) {
      this.updateProjectType = item.projectTypeId
      this.entId = item.entId
      this.$refs.attention_dialog.show()
    },
    cancel(entId) {
      this.entId = entId
      personalSetting.isMonitor({ entId }).then((res) => {
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
    },
    routeChanged(route) {
      var projectTypeId = +route.query.projectTypeId || ''
      this.projectSort = projectTypeId
      this.tIdx = !projectTypeId ? 0 : projectTypeId
      this.query(1)
    },
    cancelAttention(entId) {
      attentionAPI.cancelAttention({ entId: entId }).then(rtn => {
        this.operaState.code = 1
        this.operaState.msg = '取消成功！'
        this.$refs.operaMsg.show()
        this.query()
      }).catch(err => {
        this.operaState.code = -1
        this.operaState.msg = err.msg || '取消失败！'
        this.$refs.operaMsg.show()
      })
    },
    filterChange() {
      if (queryHandle) {
        clearTimeout(queryHandle)
      }
      queryHandle = setTimeout(this.query, window.handleDelay)
    },
    ...mapActions({
      getAttentionList: 'getAttentionList'
    })
  },
  mounted() {
    this.routeChanged(this.$route)
  },
  // beforeRouteUpdate(to, from, next) {
  //   next();
  //   this.routeChanged(to);
  // },
  components: {
    jPaging,
    jSortButton,
    jSelect,
    jDialog,
    jDialogOne,
    jAttention,
    jLoading,
    jOperaMsg,
    jPageMsg,
    jConfirm
  }
}
</script>
<style scoped lang='less'>
.person-attention {
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
      margin: 0px;
      position: absolute;
      right: 0px;
    }
    .public-list-title {
      margin: 0px 0% 30px 0%;
    }
  }
  .public-list-content {
    width: 100%;
    margin: 20px 0;
  }
  .public-list-top {
    position: relative;
    .attention-statu {
      position: absolute;
      right: 0px;
      display: -ms-flexbox;
      display: flex;
    }
  }
  .cancel-attention {
    color: #da1a1a;
    text-decoration: none;
  }
  .cancle-attention {
    width: 371px;
    height: 181px;
    box-shadow: 0px 5px 5px #ccc;
    margin: 0 auto;
    background: #ccc;
  }
}

@import "../../assets/css/publiclist.css";
</style>
