<template>
  <!--自定义关联企业舆情-->
  <div>
    <h3 class='companyPublic'>企业舆情</h3>
    <div class="public-list-inquire clearFix">
      <div class="input-group">
        <input class="form-control" type="text" id='entName' placeholder="请输入关键字查询" v-model="keyword">
        <button class="input-group-addon search-btn" @click="searchInfo">搜索</button>
      </div>
      <div class='selectBox'>
        <!--<div class='selectList'>
                                  <label>舆情标签级别：</label>
                                  <j-select :initItems="riskSentiments" :selectedIndex="0" displayKey="name" valueKey="value" v-on:change='getVal' class='selectStyle'></j-select>
                                </div>-->
        <div class='selectList'>
          <label>时间：</label>
          <j-date-picker v-model="startTime" :min="sMinTime" :max="sMaxTime" @change="filterChange"></j-date-picker> -
          <j-date-picker v-model="endTime" :min="eMinTime" :max="eMaxTime" @change="filterChange"></j-date-picker>
        </div>
      </div>
    </div>
    <div>
      <div class="public-list-top">
        <div class="public-list-sort fl">
          <span>排序：</span>
          <button id="relationBtn" class="sortBtn sortBtnSelected" @click="sort">相关度</button>
          <button id="recentBtn" class="sortBtn" @click="sortByNew">最新</button>
          <span class='record'>共{{total}}条记录</span>
        </div>
      </div>
      <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
        <thead>
          <th width="5%">序号</th>
          <th width="17%">自定义关联企业名称</th>
          <th width="15%">舆情标题</th>
          <th width="10%">来源</th>
          <th width="15%">时间</th>
        </thead>
        <tr class="no-hover" v-if="queryState.code!=1">
          <td :colspan="5">
            <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for="(item,index) in items.list" v-bind:key="index">
          <td class="text-center">{{ setSerialNum(index) }}</td>
          <td :title="item.relatedEntName">
            {{item.relatedEntName}}
          </td>
          <td :title="item.title">
            <a style="text-decoration:none;" :href="item.textLink" target="_blank" v-html="item.title"></a>
          </td>
          <td :title="item.webSrc">{{item.webSrc}}</td>
          <td class="text-center">{{item.publishTm|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
        </tr>
      </table>
      <j-paging :initPageSize="10" :initTotalCount="items.total" @pageChanged="query" :initPageIndex="pageIdx"></j-paging>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { jPaging, jSortButton, jDatePicker, jSelect, jPageMsg } from '../../components'
import { selfDefineInfo as api } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
let queryHandle = 0
export default {
  name: 'customTag',
  data: function() {
    return {
      pageIdx: 1,
      pageSize: 10,
      total: 0,
      keyword: '',
      isSearchStatus: false,
      isNoData: false,
      // isLoading: false,
      qName: '',
      setSerialNum: function(index) {
        return (this.pageIdx - 1) * 10 + (index + 1)
      },
      startTime: '',
      endTime: '',
      minTime: '',
      maxTime: '',
      sMinTime: '',
      sMaxTime: '',
      eMinTime: '',
      eMaxTime: '',
      isRelation: true,
      isRecent: false,
      isSearchContentError: false,
      isShowDialog: false,
      items: [],
      entId: '',
      relationType: 5,
      enterName: '',
      queryState: {
        code: Code.Loading,
        msg: ''
      },
      reletive: true,
      newest: false,
      beginTime: '',
      overTime: ''
    }
  },
  computed: {
    riskSentiments() {
      var businessRiskType = this.$store.state.business_risk_type
      return businessRiskType
    }
  },
  methods: {
    sort: function() { // 相关度操作,降序升序标识待组件修改
      if (this.reletive) {
        return
      }
      this.reletive = !this.reletive
      if (this.reletive) {
        this.newest = false
        document.getElementById('relationBtn').setAttribute('class', 'sortBtn sortBtnSelected')
        document.getElementById('recentBtn').setAttribute('class', 'sortBtn')
      }

      this.pageIdx = 1
      this.query(1)
    },
    sortByNew: function() { // 最新操作
      if (this.newest) {
        return
      }
      this.newest = !this.newest
      if (this.newest) {
        this.reletive = false
        document.getElementById('relationBtn').setAttribute('class', 'sortBtn')
        document.getElementById('recentBtn').setAttribute('class', 'sortBtn sortBtnSelected')
      }

      this.pageIdx = 1
      this.query(1)
    },
    beginTimeChange(date) {
      this.beginTime = date + ' 23:59:59'
      this.query(1)
    },
    overTimeChange(date) {
      this.overTime = date + ' 23:59:59'
      this.query(1)
    },
    setDefaultTime: function() {
      let time = new Date()

      let gaps = 1000 * 60 * 60 * 24 * 6
      let startTimeDate = new Date(time.valueOf() - gaps)
      let min = time.valueOf() - 1000 * 60 * 60 * 24 * 90
      let minTimeDate = new Date(min)

      let startTime = this.parseDateToString(startTimeDate)
      let endTime = this.parseDateToString(time)
      let minTime = this.parseDateToString(minTimeDate)

      let arr = ['', 'Other']
      let vm = this
      for (let i = 0; i < arr.length; i++) {
        vm['startTime' + arr[i]] = startTime
        vm['endTime' + arr[i]] = endTime

        vm['oldStartTime' + arr[i]] = startTime
        vm['oldEndTime' + arr[i]] = endTime

        vm['sMinTime' + arr[i]] = minTime
        vm['sMaxTime' + arr[i]] = endTime
        vm['eMinTime' + arr[i]] = startTime
        vm['eMaxTime' + arr[i]] = endTime
      }
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
    query: function(pageIndex = 1) {
      this.pageIdx = pageIndex
      //
      let paramsJson = {
        pageSize: this.pageSize,
        pageNum: pageIndex,
        searchKey: this.keyword,
        entId: this.$route.params.id,
        relationType: this.relationType,
        newest: this.newest,
        reletive: this.reletive,
        qStartTime: this.beginTime,
        qEndTime: this.overTime
      }
      if (this.isSearchStatus) { // 进行关键字搜索后,翻页根据条件翻页
        paramsJson['qName'] = this.entName
        paramsJson['qValue'] = this.legalRep
        paramsJson['regAsset'] = this.regAsset
        paramsJson['setupDt'] = this.setupDt
        paramsJson['province'] = this.province
        paramsJson['attention'] = this.attention

        // TODO 重新计算时间 no delete
        // paramsJson['qStartTime'] = this.startTime;
        // paramsJson['qEndTime'] = this.endTime;
      };
      // this.getList(paramsJson);

      api.selfDefine(paramsJson).then(data => {
        this.items = data.data
        this.queryState.code = this.items.list.length === 0 ? Code.NoData : Code.Success
        this.pageIdx = data.data.pageNum || 1
        this.total = data.data.total || 0
        this.pageSize = data.data.pageSize || 10
      })
    },
    searchInfo: function() {
      this.isSearchStatus = true
      if (document.getElementById('entName').value) {
        this.qName = document.getElementById('entName').value
      }
      this.query(1)
    },
    filterChange() {
      if (queryHandle) {
        clearTimeout(queryHandle)
      }
      queryHandle = setTimeout(this.searchInfo, window.handleDelay)
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
    setSentimentTags: function() {
      this.isShowDialog = true
    },
    getTypeName: function(reference, value) {
      let name = ''
      reference.map(function(item) {
        if (item.value === value) {
          name = item.text
        }
      })
      return name
    },
    ...mapActions({
      getList: 'getList'
    })
  },
  watch: {
    'startTime': function() {
      let vm = this
      vm.setReferTimeByType(0, vm.startTime, vm, '')
    },
    'endTime': function() {
      let vm = this
      vm.setReferTimeByType(1, vm.endTime, vm, '')
    },
    'startTimeOther': function() {
      let vm = this
      vm.setReferTimeByType(0, vm.startTimeOther, vm, 'Other')
    },
    'endTimeOther': function() {
      let vm = this
      vm.setReferTimeByType(1, vm.endTimeOther, vm, 'Other')
    }
  },
  created() {
    this.enterName = this.$route.query.entName
    this.setDefaultTime()
  },
  mounted() {
    // this.query(1)
  },
  components: {
    jPaging,
    jSortButton,
    jDatePicker,
    jSelect,
    jPageMsg
    //      jSentimentTags
  }
}

</script>

<style scoped lang='less'>
.add-btn {
  margin-top: 22px;
  width: 166px;
  /*background:#e5f3ff;*/
  border-color: #add9ff;
  color: #3f98e4;
  text-align: center;
  /*background: url(../../assets/images/add.png) no-repeat 10px #e5f3ff;*/
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
    margin-right: 40px;
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

.sortBtn {
  color: #666;
  font-size: 12px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  background: #f4f4f4;
  min-width: 77px;
  height: 28px;
  position: relative;
  padding: 0 20px 0 20px;
  cursor: pointer;
}

.sortBtnSelected {
  background: #ff6900;
  color: #fff;
}

.public-list-top {
  overflow: hidden;
  margin-bottom: 10px;
}

</style>
