<template>
  <!--无形资产-->
  <div class='basicBox'>
    <div class='midBasic'>
      <h3>商标信息
        <span class='record'>共{{ total }}条</span>
      </h3>
      <table class='table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>商标名</th>
          <th>注册号</th>
          <th>申请时间</th>
          <th>状态</th>
          <th>类别</th>
        </tr>
        <tr v-if="loading">
          <td colspan=6>
            <jLoading class="upload"></jLoading>
          </td>
        </tr>
        <tr v-for='(item,index) in tableContent' v-bind:key="index" v-else-if="tableContent.length">
          <td class="text-center">{{ serialNum(pageIdx,index) || '--'}}</td>
          <td>{{item.name || '--'}}</td>
          <td>{{item.registationNum || '--'}}</td>
          <td class="text-center">{{item.applystring |dateFormat}}</td>
          <td>{{item.stauts || '--'}}</td>
          <td>{{item.category || '--'}}</td>
        </tr>
        <tr v-else>
          <td colspan=6>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
      <j-paging :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="total" @pageChanged="getBrandList"></j-paging>
    </div>
    <div class='midBasic btmBasic'>
      <h3>专利信息
        <span class='record'>共{{ totalTwo }}条</span>
      </h3>
      <table class='table-fixed' width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th width='5%'>序号</th>
          <th>专利名称</th>
          <th>申请号</th>
          <th>分类号</th>
          <th>申请公布号</th>
          <th>申请公布日</th>
          <th>发明人</th>
          <th>申请人</th>
        </tr>
        <tr v-if="loading">
          <td colspan=8>
            <jLoading class="upload"></jLoading>
          </td>
        </tr>
        <tr v-for='(item,index) in tableContentTwo' v-bind:key="index" v-else-if="tableContentTwo.length">
          <td class="text-center">{{ serialNum(pageIdxTwo,index)}}</td>
          <td class="item-title" :title="item.title || '--'">{{item.title || '--'}}</td>
          <td>{{item.appNumber || '--'}}</td>
          <td>{{item.id || '--'}}</td>
          <td>{{item.pubNumber || '--'}}</td>
          <td class="text-center">{{item.pubDate | dateFormat}}</td>
          <td :title="item.inventorNames || '--'">{{item.inventorNames || '--'}}</td>
          <td :title="item.applicantNames || '--'">{{item.applicantNames || '--'}}</td>
        </tr>
        <tr v-else>
          <td colspan=8>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
      <j-paging :initPageSize="pageSizeTwo" :initPageIndex="pageIdxTwo" :initTotalCount="totalTwo" @pageChanged="getPatentList"></j-paging>
    </div>
  </div>
</template>
<script>
import api from '../../api/enterpriseLibrary/enterpriseLibrary'
import { jPaging, jLoading, jNoData } from '../../components'

export default {
  data: function() {
    return {
      pageIdx: 1,
      pageSize: 5,
      total: 0,
      pageIdxTwo: 1,
      pageSizeTwo: 5,
      totalTwo: 0,
      serialNum: function(pageIdx, index) {
        return (pageIdx - 1) * 5 + (index + 1)
      },
      tableContent: [
      ],
      tableContentTwo: [
      ],
      loading: true,
      isNoData: false
    }
  },
  methods: {
    getBrandList: function(pageIndex = 1) {
      this.loading = true
      let paramsJson = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        entId: this.$route.params.id,
        entName: this.$route.query.entName
        // entId: '1979964'
      }
      api.getBrandList(paramsJson).then(data => { // 商标信息
        this.tableContent = data.data.list
        this.pageIdx = data.data.pageNum || 1
        this.total = data.data.total || 0
        this.pageSize = data.data.pageSize || 5
        this.loading = false
      })
    },
    getPatentList: function(pageIndex = 1) {
      let paramsJson = {
        pageSize: this.pageSizeTwo,
        pageNum: pageIndex,
        entId: this.$route.params.id,
        entName: this.$route.query.entName
        // entId: '2343601'
      }
      api.getPatentList(paramsJson).then(data => { // 专利信息
        this.tableContentTwo = data.data.list
        this.pageIdxTwo = data.data.pageNum || 1
        this.totalTwo = data.data.total || 0
        this.pageSizeTwo = data.data.pageSize || 5
      })
    }
  },
  mounted: function() {
    this.getBrandList()
    this.getPatentList()
  },
  filters: {
    stamp2StrDate: function(value) {
      if (!value) return ''
      return new Date(parseInt(value)).toLocaleString()
    }
  },
  components: {
    jPaging,
    jLoading,
    jNoData
  }
}

</script>
<style scoped lang='less'>
.basicBox {
  width: 100%;
  .midBasic {
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
    table {
      width: 100%;
      tr {
        height: 43px;
        text-align: center;
        line-height: 43px;

        th {
          background: #f2f1f1;
          border: 1px solid #ccc;
          font-size: 12px;
        }
        td {
          border: 1px solid #ccc;
          font-size: 12px;
        }
      }
    }
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
