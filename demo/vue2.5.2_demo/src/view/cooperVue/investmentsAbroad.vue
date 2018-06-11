<template>
  <!--对外投资-->
  <div class='investor'>
    <div class='investorHead'>
      <h3>总共对外投资
        <strong>{{total}}</strong>家</h3>
    </div>
    <div class='investorBox'>
      <div v-if="queryState.code!==1">
        <jPageMsg mode="f" :code="queryState.code" :msg="queryState.msg"></jPageMsg>
      </div>
      <div class='investorBody investorContent' v-for='(item,index) in items' v-bind:key="index" v-else-if="items.length">
        <h4>
          <span class='number'>{{serialNum(index)}}</span>{{item.entName}}
          <span class='startBus'>开业</span>
        </h4>
        <ul class='clearFix'>
          <li>法人：
            <b>{{lists.legalPerson || '--'}}</b>
          </li>
          <li>成立日期：
            <b>{{lists.registerDate || '--'}}</b>
          </li>
          <li>注册资本：
            <b>{{lists.money || '--'}}万元</b>
          </li>
          <li>企业类型：
            <b>{{lists.type || '--'}}</b>
          </li>
          <li>地址：
            <b>{{lists.address || '--'}}</b>
          </li>
        </ul>
      </div>
    </div>
    <j-paging :initPageSize="pageSize" :initPageIndex="pageIdx" :initTotalCount="total"></j-paging>

  </div>
</template>
<script>
import { jPaging, jPageMsg } from '../../components'
import { externalInvest as externalInvestA, basicInfo as basicInfoA } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
export default {
  data: function() {
    return {
      pageIdx: 1,
      pageSize: 10,
      total: 0,
      serialNum: function(index) {
        return (this.pageIdx - 1) * 5 + (index + 1)
      },
      items: [],
      lists: {},
      bok: false,
      queryState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  methods: {
    getList: function() {
      this.loading = true
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageIdx,
        entId: this.$route.params.id,
        // entName: '国泰君安证券股份有限公司'
        entName: this.$route.query.entName
      }
      // 对外投资信息列表
      externalInvestA.externalInvest(params).then(data => {
        this.items = data.data.list
        this.queryState.code = this.items.length === 0 ? Code.NoData : Code.Success
        this.pageIdx = data.data.pageNum || 1
        this.total = data.data.total || 0
        this.pageSize = data.data.pageSize || 10
      }).catch(err => {
        this.queryState = err
      })
    },
    getContentList: function() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageIdx,
        entId: this.$route.params.id,
        // entName: '金宝街有限责任公司'
        entName: this.$route.query.entName
      }
      // 对外投资列表内容
      basicInfoA.BaseInfo(params).then(data => {
        this.lists = data.data
        this.pageIdx = data.data.pageNum || 1
        this.total = data.data.total || 0
        this.pageSize = data.data.pageSize || 10
      })
    }
  },
  mounted: function() {
    this.getList()
    this.getContentList()
  },
  components: {
    jPaging, jPageMsg
  }
}

</script>
<style scoped lang='less'>
.investor {
  width: 100%;
  font-family: '微软雅黑';
  .investorHead {
    h3 {
      font-size: 14px;
      /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
      padding-left: 6px;
      margin: 35px 0 22px 0;
      border-left: 3px solid #ff6905;
      strong {
        color: #ff6905;
      }
    }
  }
  .investorBody {
    height: 80px;
    width: 100%;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    h4 {
      font-size: 18px;
    }
    ul {
      width: 100%;
      margin-left: 28px;
      li {
        width: 20%;
        float: left;
        font-size: 12px;
        line-height: 28px;
      }
      li:nth-child(4) {
        width: 40%;
      }
      li:nth-child(5) {
        width: 40%;
        margin-top: 28px !important;
      }
    } // p {
    //     margin: 0 0 0 28px;
    //     font-size:12px;
    // }
  }
  .investorBody:hover {
    height: 174px;
    box-shadow: 0 10px 10px #dcdcdc;
  }
  .investorBody:hover h4 {
    transform: translateX(-35px);
  }
  .investorBody:hover .number {
    color: #fff;
  }
  .clearFix:after {
    display: block;
    clear: both;
    content: '';
  }
  .investorContent {
    height: 68px;
    width: 100%;
    border: 1px solid #dcdcdc;
    margin: 10px 0;
    font-size: 18px;
    line-height: 68px;
    span {
      padding: 28px;
      font-size: 12px;
    }

    .startBus {
      display: inline-block;
      width: 53px;
      height: 25px;
      border-radius: 3px;
      background: #ff6905;
      padding: 0;
      line-height: 25px;
      color: #fff;
      margin-left: 30px;
      text-align: center;
    }
  }
  .no-data {
    border-top: 1px solid #ccc;
  }
}
</style>
