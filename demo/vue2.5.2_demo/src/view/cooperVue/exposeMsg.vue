<template>
  <!--信息披露-->
  <div class='basicBox'>
    <div class='midBasic'>
      <h3>上市企业基本信息</h3>
      <table class='table-fixed'>
        <tr>
          <th v-for='(item,index) in companyBaseInfoHeader' v-bind:key="index">{{item}}</th>
        </tr>
        <tr>
          <td class="text-center">{{companyBaseInfo.stockType || '-'}}</td>
          <td class="text-center">{{companyBaseInfo.stockCode || '-'}}</td>
          <td class="text-center">{{companyBaseInfo.timeToMarket |dateFormat}}</td>
        </tr>
      </table>
    </div>
    <div class='BasicTop'>
      <h3>公司概况</h3>
      <table class="table-fixed table-form">
        <tr>
          <th>公司全称</th>
          <td :title="companyBaseInfo.corporateName">{{companyBaseInfo.corporateName || '--'}}</td>
          <th>公司网址</th>
          <td :title="companyBaseInfo.companyWebsite">{{companyBaseInfo.companyWebsite || '--'}}</td>
        </tr>
        <tr>
          <th>英文名称</th>
          <td :title="companyBaseInfo.englishName">{{companyBaseInfo.englishName || '--'}}</td>
          <th>上市时间</th>
          <td :title="companyBaseInfo.timeToMarket |dateFormat">{{companyBaseInfo.timeToMarket |dateFormat}}</td>
        </tr>
        <tr>
          <th>注册地址</th>
          <td :title="companyBaseInfo.registeredAddress">{{companyBaseInfo.registeredAddress || '--'}}</td>
          <th>招股时间</th>
          <td :title="companyBaseInfo.prospectusTime |dateFormat">{{companyBaseInfo.prospectusTime |dateFormat}}</td>
        </tr>
        <tr>
          <th>公司简称</th>
          <td colspan="3" class="multi-line" :title="companyBaseInfo.companyAbbreviation">{{companyBaseInfo.companyAbbreviation || '--'}}</td>
        </tr>
        <tr>
          <th>发行数量(万股)</th>
          <td :title="companyBaseInfo.issueNumber">{{companyBaseInfo.issueNumber || '--'}}</td>

          <th>法定代表人</th>
          <td :title="companyBaseInfo.legalRetdresentative">{{companyBaseInfo.legalRepresentative || '--'}}</td>
        </tr>
        <tr>
          <th>发行价格(元)</th>
          <td :title="companyBaseInfo.issuePrice">{{companyBaseInfo.issuePrice || '--'}}</td>

          <th>公司董秘</th>
          <td :title="companyBaseInfo.secretaries">{{companyBaseInfo.secretaries || '--'}}</td>
        </tr>
        <tr>
          <th>发行市盈率(倍)</th>
          <td :title="companyBaseInfo.issue_market_ratio">{{companyBaseInfo.issue_market_ratio || '--'}}</td>

          <th>注册资本(万元)</th>
          <td :title="companyBaseInfo.registeredCapital">{{companyBaseInfo.registeredCapital || '--'}}</td>
        </tr>
        <tr>
          <th>发行方式</th>
          <td :title="companyBaseInfo.releaseMode">{{companyBaseInfo.releaseMode || '--'}}</td>

          <th>行业种类</th>
          <td :title="companyBaseInfo.ownedIndustry">{{companyBaseInfo.ownedIndustry || '--'}}</td>
        </tr>
        <tr>
          <th>主承销商 </th>
          <td :title="companyBaseInfo.mainUnderwriter">{{companyBaseInfo.mainUnderwriter || '--'}}</td>

          <th>邮政编码</th>
          <td :title="companyBaseInfo.zipCode">{{companyBaseInfo.zipCode || '--'}}</td>
        </tr>
        <tr>
          <th>上市推荐人</th>
          <td :title="companyBaseInfo.listingRecommendation">{{companyBaseInfo.listingRecommendation || '--'}}</td>

          <th>公司电话</th>
          <td :title="companyBaseInfo.telephone">{{companyBaseInfo.telephone || '--'}}</td>
        </tr>
        <tr>
          <th>保荐机构</th>
          <td :title="companyBaseInfo.sponsorInstitution">{{companyBaseInfo.sponsorInstitution || '--'}}</td>

          <th>公司传真</th>
          <td :title="companyBaseInfo.fax">{{companyBaseInfo.fax || '--'}}</td>
        </tr>

      </table>
      <!--<div class='formListTop'>

              <ul class='clearFix unify'>

                <li class='clearFix'>
                  <span>发行数量(万股)</span>
                  <p>{{companyBaseInfo.issueNumber || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>法定代表人</span>
                  <p>{{companyBaseInfo.legalRepresentative || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>发行价格(元)</span>
                  <p>{{companyBaseInfo.issuePrice || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>公司董秘</span>
                  <p>{{companyBaseInfo.secretaries || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>发行市盈率(倍)</span>
                  <p>{{companyBaseInfo.issueMarketRatioCurrency || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>注册资本(万元)</span>
                  <p>{{companyBaseInfo.registeredCapital || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>发行方式</span>
                  <p>{{companyBaseInfo.releaseMode || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>行业种类</span>
                  <p>{{companyBaseInfo.ownedIndustry || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>主承销商 </span>
                  <p>{{companyBaseInfo.mainUnderwriter || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>邮政编码</span>
                  <p>{{companyBaseInfo.zipCode || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>上市推荐人</span>
                  <p>{{companyBaseInfo.listingRecommendation || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>公司电话</span>
                  <p>{{companyBaseInfo.telephone || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>保荐机构</span>
                  <p>{{companyBaseInfo.sponsorInstitution || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span>公司传真</span>
                  <p>{{companyBaseInfo.fax || '--'}}</p>
                </li>
                <li class='clearFix'>
                  <span></span>
                  <p></p>
                </li>
              </ul>
            </div>-->
    </div>
    <div class='midBasic'>
      <h3>高管人员</h3>
      <table class='table-fixed'>
        <tr>
          <th v-for='(item,index) in seniorExecutiveListHeader' v-bind:key="index">{{item}}</th>
        </tr>
        <tr class="no-hover" v-if="queryState1.code!=1">
          <td :colspan="5">
            <jPageMsg mode="s" :code="queryState1.code" :msg="queryState1.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in seniorExecutiveList' v-bind:key="index">
          <td>{{item.name || '-'}}</td>
          <td>{{item.position || '-'}}</td>
          <td class="text-center">{{item.yearMonth || '-'}}</td>
          <td class="text-center">{{item.sex || '-'}}</td>
          <td>{{item.xueLi || '-'}}</td>
        </tr>
      </table>
    </div>
    <div class='midBasic btmBasic'>
      <h3>十大股东</h3>
      <table class='table-fixed shareholder'>
        <tr>
          <th v-for='(item,index) in shareHolderHeader' v-bind:key="index">{{item}}</th>
        </tr>
        <tr class="no-hover" v-if="queryState2.code!=1">
          <td :colspan="5">
            <jPageMsg mode="s" :code="queryState2.code" :msg="queryState2.msg"></jPageMsg>
          </td>
        </tr>
        <tr v-for='(item, index) in shareHolderInfo' v-bind:key="index">
          <td :rowspan="shareHolderInfo.length" v-if="index==0" class="text-center">{{item.reportDate | dateFormat}}</td>
          <td class="item-title" :title="item.nameInstitution">{{item.nameInstitution || '-'}}</td>
          <td>{{item.holdingQuantity || '-'}}</td>
          <td>{{item.proportionTotal == ''?'-':item.proportionTotal+'%'}}</td>
          <td class="item-title">{{item.shareType || '-'}}</td>
        </tr>
      </table>

    </div>
  </div>
</template>
<script>
import { infoDisclosure as api } from '../../api'
import { jPageMsg } from '../../components'
import { Code } from '../../assets/js/operaCode.js'
export default {
  data: function() {
    return {
      companyBaseInfoHeader: ['证券类别', '股票代码', '上市日期'],
      companyBaseInfo: {},
      seniorExecutiveListHeader: ['姓名', '职务', '出生年份', '性别', '学历'],
      seniorExecutiveList: [],
      shareHolderHeader: ['截止日期', '股东名称', '持股数量（股）', '持股比例（%）', '股份性质'],
      shareHolderInfo: [],
      queryState1: {
        code: Code.Loading,
        msg: ''
      },
      queryState2: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  created: function() {
    this.getPageDate()
  },
  methods: {
    getPageDate: function() {
      // let baseInfoName = '北京天润康隆科技股份有限公司';
      // let SeniorName = '北京天润康隆科技股份有限公司';
      // let shareHolderName = '北京天润康隆科技股份有限公司';
      let entName = this.$route.query.entName
      let task1 = api.getBaseInfo({ entName: entName })
      let task2 = api.getSeniorExecutive({ entName: entName })
      let task3 = api.getShareholder({ entName: entName })

      Promise.all([task1, task2, task3]).then((data) => {
        if (data[0].msg === 'ok') {
          this.companyBaseInfo = data[0].data
        }
        if (data[1].msg === 'ok') {
          this.queryState1.code = data[1].data.length === 0 ? Code.NoData : Code.Success
          this.seniorExecutiveList = data[1].data
        }
        if (data[2].msg === 'ok') {
          this.queryState2.code = data[2].data.length === 0 ? Code.NoData : Code.Success
          this.shareHolderInfo = data[2].data
        }
      })
    }
  },
  components: {
    jPageMsg
  }
}

</script>
<style scoped lang='less'>
.basicBox {
  width: 100%;
  .BasicTop {
    h3 {
      font-size: 14px;
      /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
      padding-left: 6px;
      margin: 35px 0 22px 0;
      border-left: 3px solid #ff6905;
    }
    .formListTop {
      .unify {
        width: 100%;
        li {
          width: 49.8%;
          float: left;
          height: 100%;
          border: 1px solid #ccc;
          margin-left: -1px;
          margin-top: -1px;
          span {
            float: left;
            width: 20%;
            height: 42px;
            text-align: center;
            line-height: 42px;
            background: #f2f1f1;
            border-right: 1px solid #ccc;
          }
          p {
            float: left;
            /*width: 60%;*/
            height: 100%;
            /*text-align:center;*/
            line-height: 42px;
            padding-left: 22px;
          }
        }
      }
    }
  }
  .midBasic {
    h3 {
      font-size: 14px;
      /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
      padding-left: 6px;
      margin: 35px 0 22px 0;
      border-left: 3px solid #ff6905;
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
    .shareholder {
      tr:hover {
        td:nth-child(2) {
          color: #0062d0;
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
