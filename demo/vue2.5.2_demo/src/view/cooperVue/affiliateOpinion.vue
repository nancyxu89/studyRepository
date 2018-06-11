<template>
  <!--关联方舆情-->
  <div class="public-list">
    <div>
      <h3 class='companyPublic'>关联方 - 对外投资</h3>
      <div class="public-list-inquire clearFix">
        <div class="input-group">
          <input class="form-control" type="text" placeholder="请输入关键字查询" v-model="keywordOne">
          <button class="input-group-addon search-btn" @click="searchInfo(1)">搜索</button>
        </div>
        <div class='selectBox'>
          <div class='selectList'>
            <label style='margin-left:85px;'>时间：</label>
            <j-date-picker v-model="startTimeOne" :min="sMinTimeOne" :max="sMaxTimeOne"></j-date-picker>&nbsp; - &nbsp;
            <j-date-picker v-model="endTimeOne" :min="eMinTimeOne" :max="eMaxTimeOne"></j-date-picker>
          </div>
        </div>
      </div>
      <div class="public-list-content">
        <div class="public-list-top">
          <div class="public-list-sort fl">
            <span>排序：</span>
            <button id="relationBtnOne" class="sortBtn sortBtnSelected" @click="sortWhole(1,1)">相关度</button>
            <button id="recentBtnOne" class="sortBtn" @click="sortWhole(1,2)">最新</button>
            <span class='record'>共{{itemsOne.total}}条记录</span>
          </div>

        </div>
        <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <th width="5%">序号</th>
            <th>关联方</th>
            <th>舆情标题</th>
            <th width="10%">来源</th>
            <th width="15%">时间</th>
          </thead>
          <tr v-for="(item,index) in itemsOne.list" v-bind:key="index">
            <td class="text-center">{{ setSerialNum(index,itemsOne.pageNum) }}</td>
            <td class="item-title text-center">
              <a style="text-decoration:none;">{{item.relatedEntName}}</a>
            </td>
            <td class="item-title text-center" :title="item.title">
              <a style="text-decoration:none;" :href="item.textLink" target="_blank">{{item.title}}</a>
            </td>
            <td class="text-center">{{item.webSrc}}</td>
            <td class="text-center">{{parseDateToString(new Date(item.publishTm),3)}}</td>
          </tr>
          <tr class="no-hover" v-if="queryState1.code!=Code.Success && queryState1.code!=Code.Loading">
            <td :colspan="5">
              <jPageMsg mode="s" :code="queryState1.code" :msg="queryState1.msg"></jPageMsg>
            </td>
          </tr>
        </table>
        <j-paging :initPageSize="10" :initPageIndex="pageIdxOne" :initTotalCount="itemsOne.total" @pageChanged="queryOne"></j-paging>
        <j-Loading v-if="isShowLoading1" loader="f"></j-Loading>
      </div>
    </div>
    <div>
      <h3 class='companyPublic'>关联方 - 企业股东</h3>
      <div class="public-list-inquire clearFix">
        <div class="input-group">
          <input class="form-control" type="text" placeholder="请输入关键字查询" v-model="keywordTwo">
          <button class="input-group-addon search-btn" @click="searchInfo(2)">搜索</button>
        </div>
        <div class='selectBox'>
          <div class='selectList'>
            <label style='margin-left:85px;'>时间：</label>
            <j-date-picker v-model="startTimeTwo" :min="sMinTimeTwo" :max="sMaxTimeTwo"></j-date-picker>&nbsp; - &nbsp;
            <j-date-picker v-model="endTimeTwo" :min="eMinTimeTwo" :max="eMaxTimeTwo"></j-date-picker>
          </div>
        </div>
      </div>
      <div class="public-list-content">
        <div class="public-list-top">
          <div class="public-list-sort fl">
            <span>排序：</span>
            <button id="relationBtnTwo" class="sortBtn sortBtnSelected" @click="sortWhole(2,1)">相关度</button>
            <button id="recentBtnTwo" class="sortBtn" @click="sortWhole(2,2)">最新</button>
            <span class='record'>共{{itemsTwo.total}}条记录</span>
          </div>
        </div>
        <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <th width="5%">序号</th>
            <th>关联方</th>
            <th>舆情标题</th>
            <th width="10%">来源</th>
            <th width="15%">时间</th>
          </thead>
          <tr v-for="(item,index) in itemsTwo.list" v-bind:key="index">
            <td class="text-center">{{ setSerialNum(index,itemsTwo.pageNum) }}</td>
            <td class="item-title text-center">
              <a style="text-decoration:none;">{{item.relatedEntName}}</a>
            </td>
            <td class="item-title text-center" :title="item.title">
              <a style="text-decoration:none;" :href="item.textLink" target="_blank">{{item.title}}</a>
            </td>
            <td class="text-center">{{item.webSrc}}</td>
            <td class="text-center">{{parseDateToString(new Date(item.publishTm),3)}}</td>
          </tr>
          <tr class="no-hover" v-if="queryState2.code!=Code.Success && queryState2.code!=Code.Loading">
            <td :colspan="5">
              <jPageMsg mode="s" :code="queryState2.code" :msg="queryState2.msg"></jPageMsg>
            </td>
          </tr>
        </table>
        <j-paging :initPageSize="10" :initPageIndex="pageIdxTwo" :initTotalCount="itemsTwo.total" @pageChanged="queryTwo"></j-paging>
        <j-Loading v-if="isShowLoading2" loader="f"></j-Loading>
      </div>
      <div>
        <h3 class='companyPublic'>关联方 - 企业股东的对外投资</h3>
        <div class="public-list-inquire clearFix">
          <div class="input-group">
            <input class="form-control" type="text" placeholder="请输入关键字查询" v-model="keywordThree">
            <button class="input-group-addon search-btn" @click="searchInfo(3)">搜索</button>
          </div>
          <div class='selectBox'>
            <div class='selectList'>
              <label style='margin-left:85px;'>时间：</label>
              <j-date-picker v-model="startTimeThree" :min="sMinTimeThree" :max="sMaxTimeThree"></j-date-picker>&nbsp; - &nbsp;
              <j-date-picker v-model="endTimeThree" :min="eMinTimeThree" :max="eMaxTimeThree"></j-date-picker>
            </div>
          </div>
        </div>
        <div class="public-list-content">
          <div class="public-list-top">
            <div class="public-list-sort fl">
              <span>排序：</span>
              <button id="relationBtnThree" class="sortBtn sortBtnSelected" @click="sortWhole(3,1)">相关度</button>
              <button id="recentBtnThree" class="sortBtn" @click="sortWhole(3,2)">最新</button>
              <span class='record'>共{{itemsThree.total}}条记录</span>
            </div>
          </div>
          <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
              <th width="5%">序号</th>
              <th>关联方</th>
              <th>股东名称</th>
              <th>舆情标题</th>
              <th width="10%">来源</th>
              <th width="15%">时间</th>
            </thead>
            <tr v-for="(item,index) in itemsThree.list" v-bind:key="index">
              <td class="text-center">{{ setSerialNum(index,itemsThree.pageNum) }}</td>
              <td class="item-title text-center">
                <a style="text-decoration:none;">{{item.relatedEntName}}</a>
              </td>
              <td class="text-center">{{item.shareholderName}}</td>
              <td class="item-title text-center" :title="item.title">
                <a style="text-decoration:none;" :href="item.textLink" target="_blank">{{item.title}}</a>
              </td>
              <td class="text-center">{{item.webSrc}}</td>
              <td class="text-center">{{parseDateToString(new Date(item.publishTm),3)}}</td>
            </tr>
            <tr class="no-hover" v-if="queryState3.code!=Code.Success && queryState3.code!=Code.Loading">
              <td :colspan="6">
                <jPageMsg mode="s" :code="queryState3.code" :msg="queryState3.msg"></jPageMsg>
              </td>
            </tr>
          </table>
          <j-paging :initPageSize="10" :initPageIndex="pageIdxThree" :initTotalCount="itemsThree.total" @pageChanged="queryThree"></j-paging>
          <j-Loading v-if="isShowLoading3" loader="f"></j-Loading>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { jPaging, jDatePicker, jSelect, jPageMsg } from '../../components'
import jLoading from '../../components/jLoading.vue'
import { Code } from '../../assets/js/operaCode.js'

export default {
  name: 'affiliateOpinion',
  data: function() {
    return {
      queryState1: {
        code: Code.Loading,
        msg: ''
      },
      queryState2: {
        code: Code.Loading,
        msg: ''
      },
      queryState3: {
        code: Code.Loading,
        msg: ''
      },
      Code: Code,
      isShowLoading1: false,
      isShowLoading2: false,
      isShowLoading3: false,
      setSerialNum: function(index, curPageIdx) {
        return (curPageIdx - 1) * 10 + (index + 1)
      },
      pageIdxOne: 1, // 对外投资
      keywordOne: '',
      startTimeOne: '',
      endTimeOne: '',
      sMinTimeOne: '',
      sMaxTimeOne: '',
      eMinTimeOne: '',
      eMaxTimeOne: '',
      sMinTimeTwo: '',
      sMaxTimeTwo: '',
      eMinTimeTwo: '',
      eMaxTimeTwo: '',
      sMinTimeThree: '',
      sMaxTimeThree: '',
      eMinTimeThree: '',
      eMaxTimeThree: '',
      isRelationOne: true,
      isRecentOne: false,
      pageIdxTwo: 1, // 企业股东
      keywordTwo: '',
      startTimeTwo: '',
      endTimeTwo: '',
      isRelationTwo: true,
      isRecentTwo: false,
      pageIdxThree: 1, // 企业股东的对外投资
      keywordThree: '',
      startTimeThree: '',
      endTimeThree: '',
      isRelationThree: true,
      isRecentThree: false,
      enterName: '',
      affiliateQueryHandle1: 0,
      affiliateQueryHandle2: 0,
      affiliateQueryHandle3: 0
    }
  },
  computed: {
    ...mapGetters({
      itemsOne: 'affiliatedListOne',
      itemsTwo: 'affiliatedListTwo',
      itemsThree: 'affiliatedListThree'
    })
  },
  methods: {
    sortWhole: function(fromNum, type = 1) { // type:1 ,代表来自相关度的button,2 来自最新;fromNum,1,2,3,代码来自第几个列表
      let vm = this
      let numEns = ['One', 'Two', 'Three']
      let numEn = numEns[fromNum - 1]
      if (type === 1) {
        if (vm['isRelation' + numEn]) {
          return
        }
        vm['isRelation' + numEn] = !vm['isRelation' + numEn]
        if (vm['isRelation' + numEn]) {
          vm['isRecent' + numEn] = false
          document.getElementById('relationBtn' + numEn).setAttribute('class', 'sortBtn sortBtnSelected')
          document.getElementById('recentBtn' + numEn).setAttribute('class', 'sortBtn')
        }
      } else {
        if (vm['isRecent' + numEn]) {
          return
        }
        vm['isRecent' + numEn] = !vm['isRecent' + numEn]
        if (vm['isRecent' + numEn]) {
          vm['isRelation' + numEn] = false
          document.getElementById('recentBtn' + numEn).setAttribute('class', 'sortBtn sortBtnSelected')
          document.getElementById('relationBtn' + numEn).setAttribute('class', 'sortBtn')
        }
      }

      vm['query' + numEn](1)
    },
    setDefaultTime: function() {
      let vm = this
      let time = new Date()

      let gaps = 1000 * 60 * 60 * 24 * 6
      let startTimeDate = new Date(time.valueOf() - gaps)
      let min = time.valueOf() - 1000 * 60 * 60 * 24 * 90
      let minTimeDate = new Date(min)
      let minTime = this.parseDateToString(minTimeDate)

      let startTime = this.parseDateToString(startTimeDate)
      let endTime = this.parseDateToString(time)

      let arr = ['One', 'Two', 'Three']
      for (let i = 0; i < arr.length; i++) {
        vm['startTime' + arr[i]] = startTime
        vm['endTime' + arr[i]] = endTime

        vm['sMinTime' + arr[i]] = minTime
        vm['sMaxTime' + arr[i]] = endTime
        vm['eMinTime' + arr[i]] = startTime
        vm['eMaxTime' + arr[i]] = endTime
      }
    },
    queryOne: function(pageIndex = 1) { // 关联方舆情--对外投资
      this.isShowLoading1 = true
      this.query(pageIndex, 1)
    },
    queryTwo: function(pageIndex = 1) { // 关联方舆情--企业股东
      this.isShowLoading2 = true
      this.query(pageIndex, 2)
    },
    queryThree: function(pageIndex = 1) { // 关联方舆情--企业股东的对外投资
      this.isShowLoading3 = true
      this.query(pageIndex, 3)
    },
    query: function(pageIndex = 1, type = 1) {
      let vm = this
      vm.enterName = this.$route.query.entName
      let numEn = ['One', 'Two', 'Three']
      let curType = numEn[type - 1]
      let paramsJson = {
        relationType: (type + 1) + '',
        pageSize: 10,
        pageNum: pageIndex,
        reletive: vm['isRelation' + curType],
        newest: vm['isRecent' + curType],
        searchKey: vm['keyword' + curType].trim(), // 根据服务变动
        qStartTime: vm['startTime' + curType] + ' 00:00:00',
        qEndTime: vm['endTime' + curType] + ' 23:59:59',
        entId: vm.$route.params.id
      }

      vm['getAffList' + curType](paramsJson).then(function() {
        setTimeout(function() {
          vm['isShowLoading' + type] = false
        }, 200)
        vm['pageIdx' + curType] = pageIndex
        vm['queryState' + type].code = vm['items' + curType].list.length === 0 ? Code.NoData : vm['items' + curType].code
        vm['queryState' + type].msg = vm['items' + curType].msg
      }).catch(function(error) {
        vm['isShowLoading' + type] = false
        vm['queryState' + type] = error

        vm['items' + curType].list = []// 出现异常时制空列表,防止异常提示与列表信息同在
        vm['items' + curType].total = 0
      })
    },
    searchInfo: function(type = 1) {
      let vm = this
      let referNum = ['One', 'Two', 'Three']
      let num = referNum[type - 1]
      vm['query' + num](1)
    },
    parseDateToString: function(date, type = 1) {
      let time = (isNaN(date.getFullYear()) ? '0000' : date.getFullYear()) + '-' +
        doubleFormat(date.getMonth() + 1) + '-' +
        doubleFormat(date.getDate())

      if (type === 2) {
        return time + '  ' +
          doubleFormat(date.getHours()) + ':' +
          doubleFormat(date.getMinutes()) + ':' +
          doubleFormat(date.getSeconds())
      } else if (type === 3) {
        return time + '  ' +
          doubleFormat(date.getHours()) + ':' +
          doubleFormat(date.getMinutes())
      }

      function doubleFormat(num) {
        if (isNaN(num)) {
          return '00'
        }
        return +num < 10 ? ('0' + num) : num
      }

      return time.trim()
    },
    setReferTimeByType: function(type = 0, curValue, vm, sortNum) { // type:0\其他数值,0表示设置最大值;其他设置最小值
      let et = new Date(curValue)
      let tmpTime = et.valueOf()
      let distance = 1000 * 60 * 60 * 24 * 90
      if (type === 0) {
        tmpTime = tmpTime + distance
      } else {
        tmpTime = tmpTime - distance
      }
      let st = new Date(tmpTime)

      if (type === 0) {
        let curDate = new Date()
        if (st.valueOf() > curDate.valueOf()) {
          st = curDate
        }
        vm['eMaxTime' + sortNum] = vm.parseDateToString(st)
        vm['eMinTime' + sortNum] = curValue
      } else {
        vm['sMinTime' + sortNum] = vm.parseDateToString(st)
        vm['sMaxTime' + sortNum] = curValue
      }
    },
    filterChange: function(type) {
      let vm = this
      if (vm['affiliateQueryHandle' + type]) {
        clearTimeout(vm['affiliateQueryHandle' + type])
      }

      vm['isShowLoading' + type] = true
      vm['affiliateQueryHandle' + type] = setTimeout(function() {
        vm.query(1, type)
      }, window.handleDelay)
    },
    ...mapActions({
      getAffListOne: 'getAffiliatedListOne', // 关联方舆情--对外投资
      getAffListTwo: 'getAffiliatedListTwo', // 关联方舆情--企业股东
      getAffListThree: 'getAffiliatedListThree'// 关联方舆情--企业股东的对外投资
    })
  },
  watch: {
    'startTimeOne': function(to, from) {
      let vm = this
      if (from !== '') {
        vm.setReferTimeByType(0, vm.startTimeOne, vm, 'One')
        vm.filterChange(1)
      }
    },
    'endTimeOne': function(to, from) {
      let vm = this
      if (from !== '') {
        vm.setReferTimeByType(1, vm.endTimeOne, vm, 'One')
        vm.filterChange(1)
      }
    },
    'startTimeTwo': function(to, from) {
      let vm = this
      if (from !== '') {
        vm.setReferTimeByType(0, vm.startTimeTwo, vm, 'Two')
        vm.filterChange(2)
      }
    },
    'endTimeTwo': function(to, from) {
      let vm = this
      if (from !== '') {
        vm.setReferTimeByType(1, vm.endTimeTwo, vm, 'Two')
        vm.filterChange(2)
      }
    },
    'startTimeThree': function(to, from) {
      let vm = this
      if (from !== '') {
        vm.setReferTimeByType(0, vm.startTimeThree, vm, 'Three')
        vm.filterChange(3)
      }
    },
    'endTimeThree': function(to, from) {
      let vm = this
      if (from !== '') {
        vm.setReferTimeByType(1, vm.endTimeThree, vm, 'Three')
        vm.filterChange(3)
      }
    }
  },
  created() {
    this.setDefaultTime()
  },
  mounted() { // 延迟访问同一个接口,防止某个访问丢失
    let vm = this
    this.queryOne(1)
    setTimeout(function() {
      vm.queryTwo(1)
    }, 100)
    setTimeout(function() {
      vm.queryThree(1)
    }, 100)
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
table,
th,
tr,
td {
  font-size: 12px;
  text-align: center;
}

th {
  background: #f4f4f4;
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
