<template>
  <!--企业年报-->
  <div class="loading-box" v-if="pageState.code == Code.Loading"><jLoading mode='f'></jLoading></div>
  <jPageMsg mode='f' :code="pageState.code" :msg="pageState.msg" v-else-if="!annualReports.length"></jPageMsg>
  <div class='annalsBox' v-else >
    <div class="select-year">
      <button v-for="(item,index) in annualReports" v-bind:key="index" @click='change(item)' :class="{'act':item.year === formData.year}">{{item.year || '--'}}年</button>
    </div>
    <div class='annal-content'>
      <h3>企业基本信息</h3>
      <table class='table-fixed'>
        <tr>
          <th>注册号</th>
          <td :title="formData.annuaInfo.codeOrRegistationNo">{{formData.annuaInfo.codeOrRegistationNo || '--'}}</td>
          <th>企业名称</th>
          <td :title="formData.annuaInfo.name">{{formData.annuaInfo.name || '-'}}</td>
        </tr>
        <tr>
          <th>企业联系电话</th>
          <td>{{formData.annuaInfo.enterprisePhone || '--'}}</td>
          <th>邮政编码</th>
          <td>{{formData.annuaInfo.postCode || '--'}}</td>
        </tr>
        <tr>
          <th>企业通信地址</th>
          <td colspan="3" :title="formData.annuaInfo.address">{{formData.annuaInfo.address || '--'}}</td>
        </tr>
        <tr>
          <th>企业电子邮箱</th>
          <td>{{formData.annuaInfo.email || '--'}}</td>
          <th>是否有网络或网店</th>
          <td>{{formData.annuaInfo.ownWebsite || '--'}}</td>
        </tr>
        <tr>
          <th>企业经营状态</th>
          <td>{{formData.annuaInfo.operateStatus || '--'}}</td>
          <th>从业人数</th>
          <td>{{formData.annuaInfo.employeeNumber || '--'}}</td>
        </tr>
        <tr>
          <th>有限责任公司本年度是否发生股东股权转让</th>
          <td>{{formData.annuaInfo.ownShareChange || '--'}}</td>
          <th>是否有投资信息或购买其他公司股权</th>
          <td>{{formData.annuaInfo.ownInvestmentOrMerger || '--'}}</td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>网站或网店信息</h3>
      <table class='table-fixed'>
        <tr>
          <th>类型</th>
          <th>名称</th>
          <th>网址</th>
        </tr>
        <tr v-for='(item,index) in formData.annuaWebsiteInfos' v-bind:key="index" v-if="formData.annuaWebsiteInfos.length>0">
          <td>{{item.categary || '--'}}</td>
          <td>{{item.name || '--'}}</td>
          <td>{{item.url || '--'}}</td>
        </tr>
        <tr v-else>
          <td colspan=3>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>股东及出资信息</h3>
      <table class='table-fixed'>
        <tr>
          <th>股东</th>
          <th>认缴出资额(万元)</th>
          <th>认缴出资时间</th>
          <th>认缴出资方式</th>
          <th>实缴出资额(万元)</th>
          <th>实缴出资时间</th>
          <th>实缴出资方式</th>
        </tr>
        <tr v-for='(item,index) in formData.annuaShareholderInvestmentInfos' v-bind:key="index" v-if="formData.annuaShareholderInvestmentInfos.length">
          <td>{{item.name || '--'}}</td>
          <td class="text-right">{{item.subscribedAmountSum |currency}}</td>
          <td class="text-center">{{item.subscribedDate |dateFormat}}</td>
          <td class="text-center">{{item.subscribedType || '--'}}</td>
          <td class="text-right">{{item.paidAmountSum |currency}}</td>
          <td class="text-center">{{item.paidDate |dateFormat}}</td>
          <td class="text-center">{{item.paidType || '--'}}</td>
        </tr>
        <tr v-else>
          <td colspan=7>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>对外投资信息</h3>
      <table class='table-fixed'>
        <tr>
          <th>投资设立企业或购买股权企业名称</th>
          <th>企业注册号</th>
        </tr>
        <tr v-for='(website,index) in formData.annuaOutInvestmentInfos' v-bind:key="index" v-if="formData.annuaOutInvestmentInfos.length">
          <td>{{website.enterpriseName || '--'}}</td>
          <td>{{website.registationNo || '--'}}</td>
        </tr>
        <tr v-else>
          <td colspan=2>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>资产状况信息</h3>
      <table class='table-fixed table-form'>
        <tr>
          <th>资产总额</th>
          <td>{{formData.annuaPropertyAssetInfos.totalAssets || '--'}}</td>
          <th>所有者权益合计</th>
          <td>{{formData.totalOwnersEquity || '--'}}</td>
        </tr>
        <tr>
          <th>营业额收入</th>
          <td>{{formData.annuaPropertyAssetInfos.grossTradingIncome || '--'}}</td>
          <th>利润总额</th>
          <td>{{formData.annuaPropertyAssetInfos.totalProfit || '--'}}</td>
        </tr>
        <tr>
          <th>主营业额收入</th>
          <td>{{formData.annuaPropertyAssetInfos.mainBusinessIncome || '--'}}</td>
          <th>净利润</th>
          <td>{{formData.annuaPropertyAssetInfos.netProfit || '--'}}</td>
        </tr>
        <tr>
          <th>纳税总额</th>
          <td>{{formData.annuaPropertyAssetInfos.totalTaxAmount || '--'}}</td>
          <th>负债总额</th>
          <td>{{formData.annuaPropertyAssetInfos.totalLiabilities || '--'}}</td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>股权变更信息</h3>
      <table class='table-fixed'>
        <tr>
          <th>股东</th>
          <th>变更前股权比例</th>
          <th>变更后股权比例</th>
          <th>前股变更日期</th>
        </tr>
        <tr v-for='(item,index) in formData.annuaEquityChangeInfos' v-bind:key="index" v-if="formData.annuaEquityChangeInfos.length">
          <td>{{item.shareholderName || '--'}}</td>
          <td>{{item.before || '--'}}</td>
          <td>{{item.after || '--'}}</td>
          <td class="text-center">{{item.changeDate |dateFormat}}</td>
        </tr>
        <tr v-else>
          <td colspan=4>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>对外担保信息</h3>
      <table class='table-fixed'>
        <tr>
          <th>债权人</th>
          <th>债务人</th>
          <th>主债权种类</th>
          <th>主债权数额(万元)</th>
          <th>履行债务的期限</th>
          <th>保证的期间</th>
          <th>保证的方式</th>
        </tr>
        <tr v-for='(item,index) in formData.annuaOutGuaranteeInfos' v-bind:key="index" v-if="formData.annuaOutGuaranteeInfos.length">
          <td>{{item.creditor || '--'}}</td>
          <td>{{item.debtor || '--'}}</td>
          <td>{{item.creditorCategary || '--'}}</td>
          <td class="text-right">{{item.creditorAmount |currency}}</td>
          <td>{{item.fulfillObligation || '--'}}</td>
          <td>{{item.assuranceDurn || '--'}}</td>
          <td>{{item.assuranceType || '--'}}</td>
        </tr>
        <tr v-else>
          <td colspan=7>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
    </div>
    <div class='annal-content'>
      <h3>修改记录</h3>
      <table class='table-fixed'>
        <tr>
          <th>修改事项</th>
          <th>修改前</th>
          <th>修改后</th>
          <th>修改日期</th>
        </tr>
        <tr v-for='(item,index) in formData.annuaChangeInfos' v-bind:key="index" v-if="formData.annuaChangeInfos.length">
          <td>{{item.changeItem || '--'}}</td>
          <td>{{item.before || '--'}}</td>
          <td>{{item.after || '--'}}</td>
          <td class="text-center">{{item.changeDate |dateFormat}}</td>
        </tr>
        <tr v-else>
          <td colspan=4>
            <j-NoData></j-NoData>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { report as api } from '../../api'
import { jNoData, jLoading, jPageMsg } from '../../components'
import { Code } from '../../assets/js/operaCode.js'
let inited = null
export default {
  data: function() {
    return {
      annualReports: [],
      formData: {
        annuaInfo: {},
        annuaPropertyAssetInfos: {},
        annuaWebsiteInfos: [],
        annuaShareholderInvestmentInfos: [],
        annuaOutInvestmentInfos: [],
        annuaEquityChangeInfos: [],
        annuaOutGuaranteeInfos: [],
        annuaChangeInfos: []
      },
      year: '',
      loading: true,
      Code: Code,
      pageState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  methods: {
    change: function(item) {
      inited.then(() => {
        this.formData = item
      })
    },
    getFirmAnnals() {
      this.loading = true
      let params = {
        // entName: '中环辽宁工程技术股份有限公司',
        entName: this.$route.query.entName
      }
      return api.getFirmAnnals(params).then(rtn => {
        this.annualReports = rtn.data
        this.pageState.code = this.annualReports.length ? Code.Success : Code.NoData
      }).catch(err => {
        this.pageState = err
      })
    }
  },
  mounted: function() {
    inited = this.getFirmAnnals()
    inited.then(() => {
      if (this.annualReports.length) { this.change(this.annualReports[0]) }
    })
  },
  components: {
    jNoData,
    jLoading,
    jPageMsg
  }
}
</script>
<style scoped lang='less'>
  .loading-box{
    position: relative;
  }
.annalsBox {
  .select-year {
    button {
      width: 78px;
      height: 27px;
      text-align: center;
      background: #e4e4e4;
      color:#666;
      line-height: 27px;
      margin: 20px 8px 0 0;
      border-radius: 4px;
    }
    .act {
      background-color: #ff6905;
      color: #fff;
    }
  }
  .annal-content {
    h3 {
      font-size: 14px;
      /*background: url(../../assets/images/trendBg.png) no-repeat left;*/
      padding-left: 6px;
      margin: 30px 0 22px 0;
      border-left: 3px solid #ff6905;
    }
  }
}
</style>
