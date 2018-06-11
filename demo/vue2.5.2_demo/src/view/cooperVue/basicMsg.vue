<template>
  <!--基本信息-->
  <div class='basicBox'>
    <div class='BasicTop'>
      <h3>工商注册信息</h3>
      <div class='formListTop'>
        <table class="table-fixed table-form">
          <tbody>

            <tr class="no-hover">
              <th>统一社会信用代码</th>
              <td :title="item.societyCode">{{item.societyCode || '--'}}</td>
              <th>法定代表人</th>
              <td :title="item.legalPerson">{{item.legalPerson || '--'}}</td>
            </tr>
            <tr class="no-hover">
              <th>注册号</th>
              <td :title="item.registationNo">{{item.registationNo || '--'}}</td>
              <th>成立日期</th>
              <td>{{item.registerDate|dateFormat}}</td>
            </tr>
            <tr class="no-hover">
              <th>企业名称</th>
              <td :title="item.name">{{item.name || '--'}}</td>
              <th>企业类型</th>
              <td>{{item.type || '--'}}</td>
            </tr>
            <tr class="no-hover">
              <th>注册资本</th>
              <td>{{item.money || '--'}} {{item.moneyCurrency}}</td>
              <th>营业期限自</th>
              <td>{{item.operatingPeriodStart|dateFormat}}</td>
            </tr>
            <tr class="no-hover">
              <th>登记状态</th>
              <td>{{item.registerStatus || '--'}}</td>
              <th>营业期限至</th>
              <td>{{item.operatingPeriodEnd|dateFormat}}</td>
            </tr>
            <tr class="no-hover">
              <th>登记机关</th>
              <td :title="item.registerOrganization">{{item.registerOrganization || '--'}}</td>
              <th>住所</th>
              <td :title="item.address">{{item.address || '--'}}</td>
            </tr>
            <tr class="no-hover">
              <th>营业范围</th>
              <td colspan="3" class="item-title multi-line" :title="item.businessScope">{{item.businessScope || '--'}}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div class='midBasic'>
      <h3>股东信息</h3>
      <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th width="5%">序号</th>
          <th>股东名称</th>
          <th>股东类型</th>
          <th>证照/证件类型</th>
          <th>证号/证件号码</th>
        </tr>
        <tr class="no-hover" v-if="shareholderState.code !==1">
          <td colspan="5">
            <jPageMsg mode='s' :code="shareholderState.code" :msg="shareholderState.msg">
            </jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in shareholders' v-bind:key="index" v-else>
          <td class="text-center">{{serialNum(index)}}</td>
          <td :title="item.name">{{item.name || '--'}}</td>
          <td :title="item.type">{{item.type || '--'}}</td>
          <td :title="item.certificate_type">{{item.certificateType || '--'}}</td>
          <td :title="item.certificate_code">{{item.certificateCode || '--'}}</td>
        </tr>
      </table>
    </div>
    <div class='midBasic btmBasic'>
      <h3>主要人员</h3>
      <table class='table-fixed'>
        <tr>
          <th width='5%'>序号</th>
          <th>姓名</th>
          <th>职务</th>
          <th width='5%'>序号</th>
          <th>姓名</th>
          <th>职务</th>
        </tr>
        <tr class="no-hover" v-if="mpState.code !=1">
          <td colspan="6">
            <jPageMsg mode='s' :code="mpState.code" :msg="mpState.msg">
            </jPageMsg>
          </td>
        </tr>
        <tr v-for='(item,index) in mainPersons' v-bind:key="index" v-else>
          <td class="text-center">{{item.index}}</td>
          <td :title="item.name">{{item.name || '--'}}</td>
          <td :title="item.department">{{item.department || '--'}}</td>
          <td class="text-center">{{item.index1}}</td>
          <td :title="item.name1">{{(mainPersons.length%2===1&&index+1 ===mainPersons.length)?'':(item.name1 || '--')}}</td>
          <td :title="item.department1">{{(mainPersons.length%2===1&&index+1 ===mainPersons.length)?'':(item.department1 || '--')}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { basicInfo as api } from '../../api'
import { jPageMsg } from '../../components'
import { Code } from '../../assets/js/operaCode.js'
export default {
  data: function() {
    return {
      pageIdx: 1,
      loading: true,
      serialNum: function(index) {
        return (this.pageIdx - 1) * 5 + (index + 1)
      },
      item: [], // 工商注册信息数据
      shareholders: [], // 股东信息数据
      mainPersons: [], // 主要人员列表数据
      shareholderState: {
        code: Code.Loading,
        msg: ''
      },
      mpState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  methods: {
    // 获取表格数据方法
    getIndustryList: function() {
      let params = {
        entId: this.$route.params.id,
        // entName: '金宝街有限责任公司'
        entName: this.$route.query.entName
      }
      // 工商注册信息
      api.BaseInfo(params).then(data => {
        this.item = data.data
      })
    },
    getStaffList: function() {
      let params = {
        entId: this.$route.params.id,
        // entName: '金宝街有限责任公司'
        entName: this.$route.query.entName,
        pageSize: 100
      }
      // 主要人员列表
      api.KeyPersonnel(params).then(data => {
        if (data.data.list) {
          for (var i = 0, l = data.data.list.length; i < l; i += 2) {
            let j = i + 1
            this.mainPersons.push({
              index: j,
              name: data.data.list[i].name,
              department: data.data.list[i].department,
              index1: j < l ? j + 1 : null,
              name1: j < l ? data.data.list[j].name : null,
              department1: j < l ? data.data.list[j].department : null
            })
          }
        }
        this.mpState.code = this.mainPersons.length ? Code.Success : Code.NoData
      }).catch(err => {
        this.mpState = err
      })
    },
    getStockholderList: function() {
      let params = {
        entId: this.$route.params.id,
        // entName: '金宝街有限责任公司'
        entName: this.$route.query.entName
      }
      // 股东信息
      api.stockholder(params).then(rtn => {
        this.shareholders = rtn.data.list
        this.shareholderState.code = this.shareholders.length ? Code.Success : Code.NoData
      }).catch(err => {
        this.shareholderState = err
      })
    }
  },
  mounted: function() {
    this.getIndustryList()
    this.getStaffList()
    this.getStockholderList()
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
            width: 60%;
            height: 100%;
            line-height: 42px;
            padding-left: 22px;
          }
        }
        li:nth-child(11),
        li:nth-child(12),
        li:nth-child(13) {
          width: 99.65%;
          height: 100%;
          span {
            width: 10%;
          }
          p {
            width: 80%;
            min-height: 42px;
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
