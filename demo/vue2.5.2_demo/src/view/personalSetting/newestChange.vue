<template>
  <div class='newset-change'>
    <div class="top-title">
      <div class="public-list-title fl">最新变动信息</div>
      <div class="publist-list-category fr">
        <j-select v-model="newType" :initItems="newTypes" displayKey="name" valueKey="value" :selectedIndex="0" @change="selectChange"></j-select>
      </div>
    </div>
    <div class="public-list-content">
      <div class="public-list-top">
        <div class="public-list-sort fl">
          <span>舆情信息
            <a v-text="extendsData.optionCount"></a>
          </span>
          <span>|</span>
          <span>风险及变更信息
            <a v-text="extendsData.riskCount"></a>
          </span>
        </div>
      </div>
      <jLoading mode='f' v-if="pageState.code==Code.Loading"></jLoading>
      <jPageMsg mode='f' :code="pageState.code" :msg="pageState.msg"></jPageMsg>
      <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr v-for="item in items.list">
          <td width="40%" class="item-subject" :title="item.riskContent">
            <a v-if="item.riskUrl" :href="item.riskUrl" target="_blank" :title="item.riskContent">{{item.riskContent}}</a>
            <span v-else>{{item.riskContent}}</span>
          </td>
          <td width="10%" :title="item.riskTypeName">{{item.riskTypeName}}</td>
          <td width="25%" :title="item.entName">
            <router-link :to="{ path: '/corpor/'+item.entId, query: { entName: item.entName }}">{{item.entName || '--'}}</router-link>
          </td>
          <td width="25%" :title="item.occurTime|dateFormat('YYYY-MM-DD HH:mm:ss')">{{item.occurTime|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
        </tr>
      </table>
    </div>
    <j-paging :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="items.total" @pageChanged="query"></j-paging>

  </div>
</template>
<script>

import { jPaging, jSelect, jPageMsg, jLoading } from '../../components'
import { personalSetting as api } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
let queryParams = { pageSize: 10, pageNum: 1, riskType: null }
export default {
  data() {
    return {
      pageIdx: queryParams.pageNum, // 当前页的页码
      pageSize: queryParams.pageSize, // 每页有多少数据
      newType: queryParams.riskType, // 下拉列表默认展示第几条
      items: {}, // 表格数据
      extendsData: {}, // 表格上方数字的数据
      Code: Code,
      pageState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  computed: {
    newTypes() {
      return [{ value: null, name: '全部' }].concat(...this.$store.state.business_risk_type).concat(...this.$store.state.opinion_change_type)
    }
  },
  methods: {
    // 分页点击事件方法
    query: function(pageIndex = 1) {
      this.pageIdx = pageIndex
      this.getList()
    },
    // 下拉框选择方法,在刚进入的时候就会执行，所以去掉了在初始化时候调用的query方法
    selectChange: function(param) {
      queryParams.riskType = this.newType
      this.query(1)
    },
    // 获取表格数据方法
    getList: function() {
      queryParams.pageNum = this.pageIdx
      this.pageState.code = Code.Loading
      api.getChangeInfo(queryParams)
        .then(rtn => {
          rtn.data.list.forEach(item => {
            if (item.riskUrl.charAt(0) === '/') {
              item.riskUrl = `#${item.riskUrl}`
            }
          })
          this.items = rtn.data
          this.extendsData = rtn.extendsData
          this.pageState.code = this.items.total ? Code.Success : Code.NoData
        }).catch(err => {
          this.pageState = err
          this.items = {}
        })
    }
  },
  components: {
    jPaging,
    jSelect,
    jPageMsg,
    jLoading
  }
}
</script>
<style scoped lang='less'>
.newset-change {
  .top-title {
    background: none;
    height: auto;
    border: none;
    border-bottom: 1px solid #ccc;
    display: -ms-flexbox;
    display: flex;
    margin: 0px 0px;
    position: relative;
    .publist-list-category {
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
    position: relative;
  }
  .public-list-top {
    .public-list-sort {
      span {
        font-weight: bold;
        margin-right: 10px;
      }
      a {
        font-size: 18px;
        margin-left: 9px;
        color: #ff7800;
      }
    }
  }
  .cancel-attention {
    color: #da1a1a;
    text-decoration: none;
  }
}

@import "../../assets/css/publiclist.css";
@import "../../assets/css/table.css";
</style>
