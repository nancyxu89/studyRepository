<template>
  <div>
    <div class="precisision">
      <div class="preHea clearFix">
        <div class="precisision-title" v-if="titShow">
          <span @click="attentionHandle()">选择待招项目</span>，精准查找您需要的企业。
        </div>
        <div class="precisision-show"  v-if="preShow">
          <label>当前选中的待招项目</label>
          <ul>
            <li v-for="(list,index) in preData" v-bind:key="index">{{list.name}}</li>
          </ul>
          <span @click="attentionHandle()">更换</span>
        </div>
      </div>
      <div class="preCon">
        <div class="preSeo">
          <div>
            <label>排序 :</label>
            <j-sort-button2 text="综合" @sort="sort" :initState="timeInit"></j-sort-button2>
            <j-sort-button2 text="扩张意愿" @sort="sort"></j-sort-button2>
            <j-sort-button2 text="优质度" @sort="sort"></j-sort-button2>
          </div>
        </div>
        <div class="preTable">
          <table class="precisision-table">
            <thead>
            <tr>
              <th>基本信息</th>
              <th>注册资本</th>
              <th>行业</th>
              <th>评分</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(list,index) in listData" v-bind:key="index">
              <td class="text" :style="defaultStyle">
                <div class="table-box">
                  <p>
                    <router-link :to="{ path: '/corpor/'+list.entId, query: { entName: list.name }}" class="table-box-title">{{list.name}}</router-link><span class="subsist">存续</span>
                  </p>
                  <p>
                    <label>法人 :</label><span>{{list.legal}}</span>
                  </p>
                  <p>
                    <label>注册时间 :</label><span>{{list.registerDate}}</span>
                  </p>
                  <p>
                    <label>联系电话 :</label><span>{{list.dh}}</span>
                  </p>
                  <p>
                    <label>地址 :</label><span>{{list.dz}}</span>
                  </p>
                </div>
                <div class="matching" v-if="matShow">
                  <label>最高匹配项目</label>
                  <span>{{list.Maximum}}</span>
                  <p class="precisision-table-p">
                    <label>匹配度</label>
                    <img src="../../assets/images/score2.png">
                    <!--<j-star :score="50"></j-star>-->
                    <span class="perNum">48</span>
                  </p>
                </div>
              </td>
              <td>
                <p><span class="money">{{list.capital}}</span> 万</p>
              </td>
              <td>
                <span>{{list.industry}}</span>
              </td>
              <td>
                <p class="precisision-table-p">
                  <label>扩张意愿</label>
                  <img src="../../assets/images/score1.png">
                  <!--<j-star :score="list.degrees1"></j-star>-->
                  <span class="perNum">{{list.degrees1}}</span>
                </p>
                <p class="precisision-table-p">
                  <label>优质度</label>
                  <img src="../../assets/images/score2.png">
                  <!--<j-star :score="list.degrees2"></j-star>-->
                  <span class="perNum">{{list.degrees2}}</span>
                </p>
              </td>
              <td>
                <p class="preAct">收藏</p>
                <p class="hlAct">忽略</p>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="preBot">
            <p class='record'>共<span>{{total}}</span>条</p>
            <j-paging class="paging" :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="total" @pageChanged="query"></j-paging>
          </div>
        </div>
      </div>

    </div>
    <j-loading mode='f' v-show="loadingShow"></j-loading>
    <j-attentionin :entId='curItem.entId' ref="attention" @save="saved" @saving="saving"></j-attentionin>
  </div>
</template>
<script>
import { jPaging, jLoading, jSortButton2 } from '../../components'
import { jAttentionin } from '../components'
// import { attention as attentionAPI } from '../../api'
import {totalData} from '../../assets/js/precisionInvestmentData'
export default {
  name: 'publiclist',
  data() {
    return {
      pageIdx: 1,
      pageSize: 5,
      total: 10,
      titShow: true,
      preShow: false,
      matShow: false,
      xiaShow: false,
      loadingShow: false,
      curItem: {},
      preData: [],
      totalData: totalData,
      listData: [],
      defaultStyle: '',
      timeInit: 'DESC'
    }
  },
  computed: {

  },
  methods: {
    saved(proTypes) {
      this.curItem.attention = proTypes.map(t => { return t.value }).join(',')
    },
    attentionHandle() {
      this.$refs.attention.show()
    },
    query(pageIndex) {
      this.listData = this.totalData.slice(0 + 5 * (pageIndex - 1), 5 * pageIndex)
      //      this.pageIdx = pageIndex
      //      this.loadingShow=true
    },
    saving(sav) {
      this.defaultStyle = 'padding-bottom:50px'
      const pre = this.preData
      pre.splice(0, pre.length)
      this.titShow = false
      this.preShow = true
      this.xiaShow = true
      this.matShow = true
      sav.selTypes.forEach(function(val, index) {
        pre.push(val)
      })
      if (pre.length > 1) {
        this.listData = this.totalData.slice(0, 5)
        this.total = this.totalData.length
      } else {
        this.listData = this.totalData.filter(function(item) {
          return item.Maximum === pre[0].name
        })
        this.total = this.listData.length
      }
    },
    sort(order) { // 成立时间
    }

  },
  mounted() {
    this.query()
    this.listData = this.totalData.slice(0, 5)
    this.total = this.totalData.length
  },
  filters: {
  },
  components: {
    jAttentionin,
    jPaging,
    jLoading,
    jSortButton2
  }
}

</script>
<style scoped lang="less">
/*@import "../../assets/css/publiclist.css";*/

.precisision{
  width:100%;
}
.preHea{
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  margin:10px 0 20px 0;
  padding: 15px 40px;
}
.preCon{
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  overflow: hidden;
}
.precisision-show{
  font-size: 16px;
}
.precisision-show label{
  float: left;
}
.precisision-show ul li{
  padding: 0 8px;
  float: left;
  display: inline-block;
  background-color:rgba(242, 242, 242, 1);
  margin: 0 0 0 10px;
}
.precisision-show>span:nth-child(3){
  color: #0066CC;
  cursor: pointer;
  margin-left: 10px;
}

.precisision-title{
  font-size: 16px;
}
.precisision-title span{
  color: #1362ba;
  cursor: pointer;
}
.preSeo{
  width: 100%;
  height: 90px;
  line-height: 90px;
  background-color: #ebf2fe;
  &>div{
    width: 100%;
    padding-left: 40px;
    box-sizing: border-box;
    display: flex;
    button:last-child{
      border-radius: 0 4px 4px 0;
    }
    &>label{
      margin-right: 5px;
      color: #9e9e9e;
      font-size: 14px;
    }
  }
}

.preTable{
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
}
.precisision-table{
  width: 100%;
  color: #404040;
  /*border: 1px solid #dbdbdb;*/
}
.precisision-table thead tr{
  border-bottom: 1px solid #dbdbdb;
  line-height:50px;
}
.precisision-table thead th{
  font-size: 18px;
  font-weight: bold;
  /*background-color: #f2f1f1;*/
}
.precisision-table thead th:nth-child(1){
  width: 30%;
}
.precisision-table thead th:nth-child(2){
  width: 20%;
}
.precisision-table thead th:nth-child(3){
  width: 20%;
}
.precisision-table thead th:nth-child(4){
  width: 20%;
}
.precisision-table thead th:nth-child(5){
  width: 10%;
}

  .text{
    text-align: left;
  }
  .table-box p{
    margin: 20px 0;
    font-size: 14px;
    label{
      color: #999999;
      margin-right: 5px;
    }
  }
  .table-box-title{
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }
  .subsist{
    display: inline-block;
    width: 48px;
    height: 18px;
    text-align: center;
    line-height:18px;
    border-radius: 5px;
    border: solid 1px #95ceff;
    margin-left: 10px;
    color: #24a5ff;
    font-size: 12px;
    background-color: #e3f1ff;
  }

  .precisision-table tbody tr{
    border-bottom: 1px solid #dbdbdb;
  }
/*.precisision-table tbody td:first-child{*/
  /*padding: 0 10px 0 10px;*/
/*}*/
  .precisision-table tbody td{
    padding: 0 10px 0 10px;
    position: relative;
  }
.precisision-table tbody tr td:last-child p{
  height: 52px;
  line-height: 52px;
  font-size: 16px;
}
  .money{
    color:#F19833;
    font-size: 16px;
    font-weight: bold;
    margin: 0 1px;
  }
  .precisision-table td{
    font-size: 14px;
  }
  .precisision-table-p{
    margin: 30px 0;
  }
  /*.precisision-table-p img{*/
    /*vertical-align: middle;*/
    /*position: relative;*/
    /*bottom: 3px;*/
  /*}*/
  .precisision-table-p label{
    margin-right: 5px;
    width:60px;
    display: inline-block;
    text-align: right;
  }
  /*.pingjia{*/
    /*position: relative;*/
    /*width: 108px;*/
    /*height: 62px;*/
  /*}*/
  .perNum{
    margin-left: 15px;
  }
  .preAct{
    color:#169fff;
  }
  .hlAct{
    color: #CCCCCC;
  }
  .preBot{
    margin-top:10px;
    position: relative;
    margin-bottom: 30px;
  }
  .record{
    position: absolute;
    top: 25px;
    font-size: 12px;
    color: #97a0a9;
    span{
      color: #ee8144;
      font-size: 14px;
    }
  }
  .matching{
    width: 1000px;
    position: absolute;
    bottom: 0;
  }
  .matching>span{
    margin: 0 50px 0 30px;
    font-weight: bold;
  }
  .matching>p{
    display: inline-block;
  }
</style>
