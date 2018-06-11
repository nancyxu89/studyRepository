<template>
  <div>
    <div class="search">
      <p>
        <input type="text" placeholder="请输入园区名称" @keyup.13="keyUp()" v-model="seaObj.parkName"/>
        <button @click="search"><i class="iconfont icon-sousuo"></i>搜索</button>
      </p>
    </div>
    <div class="search-criteria">
        <f-criteria :criObj="areaData" :title="'区域分布'" showLenth='9' :moreShow="true" @change="qvName"></f-criteria>
      <!--</transition>-->
        <f-criteria :criObj="primeData" :title="'主导产业'" showLenth='8' :moreShow="true" @change="zdName"></f-criteria>
        <f-criteria :criObj="parkData" :title="'园区级别'" showLenth='4' :moreShow="false" @change="gjName"></f-criteria>
    </div>
    <div class="search-con">
      <dl v-for="(list,index) in listData" v-bind:key="index">
        <dt><img src="../../assets/images/enterImg.png"/></dt>
        <dd>
          <p class="cirP1">
            <span>{{list.parkName}}</span>
            <strong v-if="list.parkLevel==0" class="redStr">国家级</strong>
            <strong v-if="list.parkLevel==1" class="redStr">省级</strong>
            <strong v-if="list.parkLevel==2" class="redStr">市级</strong>
            <strong v-if="list.parkLevel==3" class="redStr">市级以下</strong>
          </p>
          <p class="information">
            <i class='iconfont icon-weibiaoti-3'></i><span>{{list.address}}</span>
          </p>
          <p class="information">
            <i class="iconfont icon-xianxingdiqiu icon3"></i>
            <a v-if="list.website=='_'" target="_blank" class="website">{{list.website}}</a>
            <a v-else :href="list.website" target="_blank" class="website">{{list.website}}</a>
          </p>
        </dd>
        <dd>
          <p class="kilometreNum">{{list.measureOfArea | alternative}}</p>
          <p class="kilometre">平方公里</p>
        </dd>
        <dd>
          <p class="muNum">{{list.price | alternative}}</p>
          <p class="mu">万/亩</p>
        </dd>
      </dl>
      <j-NoData v-if="listData.length==0" mode="1"></j-NoData>
      <div class="preBot clearFix">
        <p class='record'>共<span>{{total}}</span>条记录</p>
        <j-paging class="paging" :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="total" @pageChanged="query"></j-paging>
      </div>
      <j-loading mode='f' v-show="pageState.code == Code.Loading"></j-loading>
    </div>
  </div>
</template>
<script>
import { jPaging, fCriteria, jNoData, jLoading } from '../../components'
import { stayPark as api } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
var paramsJson = {}
export default{
  data() {
    return {
      pageIdx: 1,
      pageSize: 5,
      total: 0,
      listData: [],
      seaObj: {
        parkName: '',
        qvName: '',
        zdName: '',
        gjName: ''
      },
      areaData: [],
      primeData: [],
      parkData: [],
      pageState: {
        code: Code.Loading,
        msg: ''
      },
      Code: Code
    }
  },
  components: {
    fCriteria,
    jPaging,
    jNoData,
    jLoading
  },
  methods: {
    keyUp() {
      this.search()
    },
    search() {
      paramsJson = {}
      if (this.seaObj.parkName !== '') {
        paramsJson.parkName = this.seaObj.parkName // 园区名称
      }
      if (this.seaObj.qvName !== '') {
        paramsJson.province = this.seaObj.qvName // 区域分布
      }
      if (this.seaObj.zdName !== '') {
        paramsJson.mainIndustry = this.seaObj.zdName // 主导产业
      }
      if (this.seaObj.gjName !== '') {
        paramsJson.parkLevel = this.seaObj.gjName // 园区级别
      }
      this.query(1)
    },
    searchCondition() {
      api
        .areaList()
        .then(rst => {
          this.areaData = rst.data.list
        })
        .catch(err => {
          this.pageState = err
        })
    },
    query(pageIndex = 1) {
      this.pageIdx = pageIndex
      paramsJson.pageNum = pageIndex
      paramsJson.pageSize = 5
      this.pageState.code = Code.Loading
      api
        .getPark(paramsJson)
        .then(rst => {
          this.listData = rst.data.list
          this.total = rst.data.total
          this.pageState.code = this.total ? Code.Success : Code.NoData
        })
        .catch(err => {
          this.pageState = err
        })
    },
    qvName(qvName) {
      this.seaObj.qvName = qvName
      this.search()
    },
    zdName(zdName) {
      this.seaObj.zdName = zdName
      this.search()
    },
    gjName(gjName) {
      this.seaObj.gjName = ''
      if (gjName === '国家级') {
        this.seaObj.gjName = '0'
      }
      if (gjName === '省级') {
        this.seaObj.gjName = '1'
      }
      if (gjName === '市级') {
        this.seaObj.gjName = '2'
      }
      if (gjName === '市级以下') {
        this.seaObj.gjName = '3'
      }
      this.search()
    },
    init() {
      var rtn = this.$store.dispatch('getEnum')
      rtn.then(
        data => {
          this.primeData = this.$store.state.leading_industry
          this.parkData = this.$store.state.park_level
        }
      )
    }
  },
  mounted() {
    this.searchCondition()
    this.query()
    this.init()
  }
}
</script>
<style scoped lang="less">
  .search{
    width: 100%;
    height: 50px;
    line-height: 50px;
    min-width: 1336px;
    &>p{
      text-align: center;
      input{
        width: 440px;
        height: 36px;
        border: 1px solid #dadada;
        border-radius: 4px;
        font-size: 14px;
        outline:none;
        color: #aaaaaa;
        &::-webkit-input-placeholder{
          color: #c1c1c1;
        }
      }
      input:focus{
        color: #73c6ff;
        transition: all 0.2s;
        &::-webkit-input-placeholder{
          color:#73c6ff;
        }
      }
      button{
        width: 80px;
        height: 38px;
        background: linear-gradient(to bottom,#ffa201,#ff7801);
        color: white;
        font-size: 16px;
        position: relative;
        top:1px;
        right:8px;
        cursor: pointer;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        i{
          font-size:18px;
          margin-right: 4px;
          position: relative;
          top: 1px;
        }
      }
    }
  }
  .search-criteria{
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    margin-top: 20px;
    padding: 20px 35px 12px 35px;
    box-sizing: border-box;
    transition: height 1s linear;
  }
  .search-con{
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    padding: 39px 35px;
    box-sizing: border-box;
    margin: 20px 0 5px 0;
    position: relative;
    dl:last-child{
      border-bottom: none;
      padding-bottom: 10px;
    }
    dl:first-child{
      padding-top: 0;
    }
    dl{
      width: 100%;
      padding: 35px 0;
      border-bottom: 1px solid #dedede;
      display: flex;
      dt{
        width:10%;
        img{
          width:100%;
        }
      }
      dd:nth-of-type(1){
        width: 40%;
        margin-left: 1.5%;
        .information:last-child{
          margin-top: 9px;
        }
        .information{
          width: 100%;
          i{
            color: #c5c5c5;
            margin-right: 15px;
            position: relative;
            top:2px;
          }
          span{
            color: #8a8a8a;
          }
          .website{
            color: #4794ff;
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .cirP1{
          width: 100%;
          margin-bottom: 20px;
          span{
            font-size: 18px;
            font-weight: 500;
            margin-right: 10px;
          }
          strong{
            display: inline-block;
            padding: 0 10px;
            /*width: 48px;*/
            height: 18px;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            border-radius: 5px;
            position: relative;
            bottom: 2px;
          }
          .blueStr{
            color: #24a5ff;;
            border: solid 1px #95ceff;
            background-color: #e2f1ff;
          }
          .redStr{
            color: #ff7e0e;
            border: 1px solid #ffb65f;
            background-color: #fff6f1;
          }
        }
      }
      dd:nth-of-type(2){
        width: 16.5%;
        text-align: center;
        p{
          margin-top: 10px;
        }
        .kilometreNum{
          color: #ff7400;
          font-size: 34px;
          font-weight: bold;
        }
        .kilometre{
          color: #999999;
          font-size: 14px;
        }
      }
      dd:nth-of-type(3){
        width: 32%;
        text-align: center;
        p{
          margin-top: 10px;
        }
        .muNum{
          font-size: 34px;
          color: #13affe;
          font-weight: bold;
        }
        .mu{
          color: #999999;
          font-size: 14px;
        }
      }
    }
  }

  .preBot{
    margin-top:10px;
    position: relative;
  }
  .paging{
    float: right;
  }
  .record{
    position: relative;
    top: 25px;
    float: left;
    font-size: 12px;
    color: #9099a4;
    span{
      color: #ffa96c;
      font-size: 15px;
      margin: 0 2px;
    }
  }

</style>
