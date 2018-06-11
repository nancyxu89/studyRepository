<template>
  <!--舆情动态-->
  <div>
    <div class="sub-part">
      <h3 class='companyPublic'>企业舆情</h3>
      <div class="public-list-inquire clearFix">
        <div class="input-group">
          <input class="form-control" type="text" placeholder="请输入关键字查询" v-model="entOpinion.keyword" @keydown.enter="queryEntOpinion(1,true)">
          <button class="input-group-addon search-btn" @click="queryEntOpinion(1,true)">搜索</button>
        </div>
        <div class='selectBox'>
          <div class='selectList'>
            <label style='margin-left:85px;'>时间：</label>
            <j-date-picker v-model="entOpinion.startDate" :min="minDate1" :max="entOpinion.endDate" @change="queryEntOpinion(1,true)"></j-date-picker>&nbsp; - &nbsp;
            <j-date-picker v-model="entOpinion.endDate" :min="entOpinion.startDate" :max="maxDate1" @change="queryEntOpinion(1,true)"></j-date-picker>
          </div>
        </div>
      </div>
      <div class="public-list-content">
        <div class="public-list-top">
          <div class="public-list-sort fl">
            <span>排序：</span>
            <button :class='{sortBtn:true,sortBtnSelected:entOpinion.isRelation}' @click="sortEntOpinion('relation')">相关度</button>
            <button :class='{sortBtn:true,sortBtnSelected:entOpinion.isRecent}' @click="sortEntOpinion('recent')">最新</button>
            <span class='record'>共{{ entOpinion.data.total }}条记录</span>
          </div>
        </div>
        <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <th width="5%">序号</th>
            <th width="17%">舆情标题</th>
            <th width="15%">舆情标签级别</th>
            <th width="10%">来源</th>
            <th width="15%">时间</th>
          </thead>
          <tr v-for="(item,index) in entOpinion.data.list" v-bind:key="index">
            <td class="text-center">{{ setSerialNum(index,entOpinion.pageNum) }}</td>
            <td :title="item.title">
              <a style="text-decoration:none;" :href="item.textLink" target="_blank">{{item.title}}</a>
            </td>
            <td class="text-center">{{item.importantTypeName}}</td>
            <td>{{item.webSrc}}</td>
            <td class="text-center">{{item.publishTm|dateFormat('YYYY-MM-DD HH:mm')}}</td>
          </tr>
          <tr class="no-hover" v-if="entOpinion.state.code!=Code.Success && entOpinion.state.code!=Code.Loading">
            <td colspan="5">
              <jPageMsg mode="s" :code="entOpinion.state.code" :msg="entOpinion.state.msg"></jPageMsg>
            </td>
          </tr>
        </table>
        <j-paging :initPageSize="entOpinion.pageSize" :initPageIndex="entOpinion.pageNum" :initTotalCount=" entOpinion.data.total" @pageChanged="queryEntOpinion"></j-paging>
      </div>
      <j-Loading v-if="entOpinion.state.code==Code.Loading" mode="s"></j-Loading>
    </div>
    <div class="sub-part">
      <h3 class='companyPublic'>主要人员舆情</h3>
      <div class="public-list-inquire clearFix">
        <div class="input-group">
          <input class="form-control" type="text" placeholder="请输入关键字查询" v-model="mainPerson.keyword" @keydown.enter="queryMainPerson(1,true)">
          <button class="input-group-addon search-btn" @click="queryMainPerson(1,true)">搜索</button>
        </div>
        <div class='selectBox'>
          <div class='selectList'>
            <label style='margin-left:85px;'>时间：</label>
            <j-date-picker v-model="mainPerson.startDate" :min="minDate2" :max="mainPerson.endDate" @change="queryMainPerson(1,true)"></j-date-picker>&nbsp; - &nbsp;
            <j-date-picker v-model="mainPerson.endDate" :min="mainPerson.startDate" :max="maxDate2" @change="queryMainPerson(1,true)"></j-date-picker>
          </div>
        </div>
      </div>
      <div class="public-list-content">
        <div class="public-list-top">
          <div class="public-list-sort fl">
            <span>排序：</span>
            <button :class='{sortBtn:true, sortBtnSelected:mainPerson.isRelation}' @click="sortMainPerson('relation')">相关度</button>
            <button :class='{sortBtn:true, sortBtnSelected:mainPerson.isRecent}' @click="sortMainPerson('recent')">最新</button>
            <span class='record'>共{{ mainPerson.data.total }}条记录</span>
          </div>
        </div>
        <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <th width='5%'>序号</th>
            <th>姓名</th>
            <th>职务</th>
            <th>舆情标题</th>
            <th>来源</th>
            <th>时间</th>
          </thead>
          <tr v-for="(item,index) in mainPerson.data.list" v-bind:key="index">
            <td class="text-center">{{ setSerialNum(index,mainPerson.pageNum) }}</td>
            <td>{{item.staffName}}</td>
            <td>{{item.staffPosition}}</td>
            <td class="item-title" :title="item.title">
              <a style="text-decoration:none;" :href="item.textLink" target="_blank">{{item.title}}</a>
            </td>
            <td>{{item.webSrc}}</td>
            <td class="text-center">{{item.publishTm|dateFormat('YYYY-MM-DD HH:mm')}}</td>
          </tr>
          <tr class="no-hover" v-if="mainPerson.state.code!=Code.Success && mainPerson.state.code!=Code.Loading">
            <td :colspan="6">
              <jPageMsg mode="s" :code="mainPerson.state.code" :msg="mainPerson.state.msg"></jPageMsg>
            </td>
          </tr>
        </table>
        <j-paging :initPageSize="mainPerson.pageSize" :initPageIndex="mainPerson.pageNum" :initTotalCount="mainPerson.data.total" @pageChanged="queryMainPerson"></j-paging>

      </div>
      <j-Loading v-if="mainPerson.state.code==Code.Loading" mode="s"></j-Loading>
    </div>
  </div>
</template>
<script>
import { jPaging, jDatePicker, jSelect, jPageMsg, jLoading } from '../../components'
import { Code } from '../../assets/js/operaCode.js'
import moment from '../../../static/js/moment.min.js'
import { cooperDetail as api } from '../../api'

const format = 'YYYY-MM-DD'
let entParams = {
  pageSize: 10
}
let mainPersonParams = {
  pageSize: 10,
  relationType: '1'
}
export default {
  name: 'opinionDynamic',
  data() {
    return {
      entOpinion: {
        state: {
          code: Code.Loading,
          msg: ''
        },
        keyword: '',
        startDate: moment().subtract(6, 'days').format(format),
        endDate: moment().format(format),
        isRelation: true,
        isRecent: false,
        pageNum: 1,
        pageSize: entParams.pageSize,
        data: {
          total: 0,
          list: []
        }
      },
      mainPerson: {
        state: {
          code: Code.Loading,
          msg: ''
        },
        keyword: '',
        startDate: moment().subtract(6, 'days').format(format),
        endDate: moment().format(format),
        isRelation: true,
        isRecent: false,
        pageNum: 1,
        pageSize: entParams.pageSize,
        data: {
          total: 0,
          list: []
        }
      },
      Code: Code,
      setSerialNum(index, curPageIdx) {
        return (curPageIdx - 1) * 10 + (index + 1)
      }
    }
  },
  computed: {
    minDate1() {
      return moment(this.entOpinion.endDate).add(-3, 'months').format(format)
    },
    maxDate1() {
      return moment(this.entOpinion.startDate).add(3, 'months').format(format)
    },
    minDate2() {
      return moment(this.mainPerson.endDate).add(-3, 'months').format(format)
    },
    maxDate2() {
      return moment(this.mainPerson.startDate).add(3, 'months').format(format)
    }
  },
  methods: {
    sortEntOpinion(order) {
      if (this.entOpinion.isRelation !== (order === 'relation')) {
        this.entOpinion.isRelation = !this.entOpinion.isRelation
        this.entOpinion.isRecent = !this.entOpinion.isRelation
      }
      this.queryEntOpinion(1, true)
    },
    queryEntOpinion(pageIndex, isInitParams) {
      if (isInitParams) {
        entParams.isRelation = this.entOpinion.isRelation
        entParams.isRecent = this.entOpinion.isRecent
        entParams.qName = this.entOpinion.keyword.trim()
        entParams.qStartTime = this.entOpinion.startDate + ' 00:00:00'
        entParams.qEndTime = this.entOpinion.endDate + ' 23:59:59'
        entParams.entId = this.$route.params.id
      }
      this.entOpinion.pageNum = pageIndex
      entParams.pageNum = this.entOpinion.pageNum
      this.entOpinion.state.code = Code.Loading
      api.getMainCompanyOpinion(entParams).then(rtn => {
        this.entOpinion.state.code = rtn.data.total === 0 ? Code.NoData : Code.Success
        this.entOpinion.data = rtn.data
      }).catch(err => {
        this.entOpinion.state = err
      })
    },

    sortMainPerson(order) {
      if (this.mainPerson.isRelation !== (order === 'relation')) {
        this.mainPerson.isRelation = !this.mainPerson.isRelation
        this.mainPerson.isRecent = !this.mainPerson.isRelation
      }
      this.queryMainPerson(1, true)
    },
    queryMainPerson(pageIndex, isInitParams) {
      if (isInitParams) {
        mainPersonParams.isRelation = this.mainPerson.isRelation
        mainPersonParams.isRecent = this.mainPerson.isRecent
        mainPersonParams.searchKey = this.mainPerson.keyword.trim()
        mainPersonParams.qStartTime = this.mainPerson.startDate + ' 00:00:00'
        mainPersonParams.qEndTime = this.mainPerson.endDate + ' 23:59:59'
        mainPersonParams.entId = this.$route.params.id
      }
      this.mainPerson.pageNum = pageIndex
      mainPersonParams.pageNum = this.mainPerson.pageNum
      this.mainPerson.state.code = Code.Loading
      api.getMainStaffOpinion(mainPersonParams).then(rtn => {
        this.mainPerson.state.code = rtn.data.total === 0 ? Code.NoData : Code.Success
        this.mainPerson.data = rtn.data
      }).catch(err => {
        this.mainPerson.state = err
      })
    }
  },

  components: {
    jPaging,
    jDatePicker,
    jSelect,
    jPageMsg,
    jLoading
  }
}

</script>
<style scoped lang='less'>
@import "../../assets/css/publiclist.css";

.sub-part {
  position: relative;
}

.item-subject {
  a {
    padding-left: 80px;
    color: #333;
    text-decoration: none;
  }
}

.public-list-inquire {
  height: 54px;
}

.input-group {
  float: left;
}

.selectBox {
  float: left;
  margin: 13px 0 0 156px;
  .selectList {
    float: left;
  }
}

.record {
  color: #666;
  font-size: 12px;
}

.companyPublic {
  font-size: 14px;
  /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
  padding-left: 6px;
  margin: 35px 0 22px 0;
  border-left: 3px solid #ff6905;
}

.public-list-inquire {
  width: 100%;
  margin: 0;
}

.public-list-content {
  width: 100%;
  margin: 0;
}

.companyPublic {
  margin-top: 12px;
}

.sortBtn {
  color: #666;
  font-size: 12px;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  background: #f4f4f4;
  min-width: 77px;
  height: 25px;
  position: relative;
  padding: 0 20px 0 20px;
  cursor: pointer;
}

.sortBtnSelected {
  background: #ff6900;
  color: #fff;
}
</style>
