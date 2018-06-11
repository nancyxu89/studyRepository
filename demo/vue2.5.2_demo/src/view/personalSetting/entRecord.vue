<template>
  <div class='person-attention'>
    <div class="top-title">
      <div class="public-list-title fl">添加企业记录</div>
      <div class="input-group fr">
        <input type="text" v-model="entName" placeholder="请输入企业名称" class="form-control" @keydown.enter="query(1,true)">
        <button class="input-group-addon search-btn" @click="query(1,true)">搜索</button>
      </div>
    </div>
    <div class="public-list-content">
      <div class="public-list-top">
        <div class="public-list-sort fl">
          <span>排序：</span>
          <j-sort-button text="添加时间" @sort="sort" init-state="desc"></j-sort-button>
        </div>
        <div class="attention-statu fr">
          <!--<div class="publist-list-category">
                                              <label>上市状态：</label>
                                              <j-select v-model="appearState" :initItems="appearStates" displayKey="text" valueKey="value" :selectedIndex="0"  @change="filterChange">
                                              </j-select>
                                            </div>-->
          <!--<div class="publist-list-category public-list-news">
                                              <label>项目类型：</label>
                                              <j-select v-model="projectSort" :initItems="projectTypes" displayKey="name" valueKey="value" :selectedIndex="tIdx" @change="filterChange">
                                              </j-select>
                                            </div>-->
        </div>
      </div>
      <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
        <thead>
          <th width="5%">序号</th>
          <th width="35%">企业名称</th>
          <th width="25%">企业简称</th>
          <th width="20%">添加时间</th>
          <th width="10%">状态</th>
        </thead>
        <tr v-if="pageState.code != Code.Loading && !data.total" class="no-hover">
          <td colspan="5">
            <jPageMsg mode='f' :code="pageState.code" :msg="pageState.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for="(item,index) in data.list" v-else>
          <td class="text-center">{{ setSerialNum(index) }}</td>
          <td v-if="item.entId" :title="item.entName">
            <router-link :to="{ name: 'entDetail' , params:{id:item.entId}, query: { entName: item.entName }}">{{item.entName}}</router-link>
          </td>
          <td :title="item.entName" v-else>{{item.entName}}</td>
          <td :title="item.entShortName">{{item.entShortName}}</td>
          <td class="text-center">{{item.inputTime|dateFormat}}</td>
          <td class="text-center">
            {{item.synStatusId|enumConvert}}
          </td>
        </tr>
      </table>
      <span class='record'>共{{data.total}}条记录</span>
      <j-paging :initPageSize="pageSize" :initPageIndex="pageNum" :initTotalCount="data.total" @pageChanged="query"></j-paging>
    </div>

    <jLoading loader='f' v-show="pageState.code == Code.Loading"></jLoading>
  </div>
</template>
<script>
import { jPaging, jSortButton, jPageMsg, jLoading } from '../../components'
import { attention as api } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
let queryParams = {
  pageNum: 1,
  pageSize: 10,
  sortColumn: 'INPUT_TIME',
  order: 'desc'
}
export default {
  data() {
    return {
      Code: Code,
      entName: '',
      order: 'desc',
      pageNum: 1,
      pageSize: queryParams.pageSize,
      data: {
        total: 0,
        list: []
      },
      setSerialNum(index) {
        return (this.pageNum - 1) * this.pageSize + (index + 1)
      },
      pageState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  methods: {
    sort(order) {
      this.order = order
      queryParams.order = order
      this.query(1)
    },
    query(pageIndex = 1, initParams) {
      if (initParams) {
        queryParams.qName = this.entName
      }
      queryParams.pageNum = pageIndex
      this.pageNum = pageIndex
      this.pageState.code = Code.Loading
      console.log(JSON.stringify(queryParams))
      api.getCustomCompany(queryParams).then(rtn => {
        this.data.total = rtn.data.total
        this.data.list = rtn.data.list
        this.pageState.code = this.data.total ? Code.Success : Code.NoData
      }).catch(err => {
        this.pageState = err
      })
    }
  },
  mounted() {
    this.query(1, true)
  },
  components: {
    jPaging,
    jSortButton,
    jLoading,
    jPageMsg
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
