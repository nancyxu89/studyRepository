<template>
  <j-dialog class="warning-company-tooltip" :initShow="false" initTitle="设置预警推送企业" :initShowTitle='true' ref="warning_company_tooltip_dialog">
    <div v-if="monitorCompanys.length">
      <h4 class="prompt">您目前监控了{{monitorCompanys.length}}家企业，请从中选择您要预警推送的企业</h4>

      <div class="check-wrapper">
        <label v-for="item in monitorCompanys">
          <input type="checkbox" :value="item" v-model="companyArr">
          <i>✓</i>{{item.name}}
        </label>
      </div>
      <label>
        <input type="checkbox" v-model="chkAll" @click="tooltipAllChoose($event)">
        <i>✓</i>全选
      </label>
      <!--<p v-if="companyArr.length==0">请至少选择一家企业</p>-->
      <div class="operate">
        <button class="save-btn" :disabled="!companyArr.length" @click="warningCompanySave">保 存</button>
        <button class="cancle-btn" @click="hide">取 消</button>
      </div>
    </div>
    <div v-else class="no-company">
      <h4 class="prompt">您目前还没有监控企业，请
        <router-link to="/setting/companymonitoring">添加监控企业</router-link>
      </h4>
    </div>
  </j-dialog>
</template>
<script>
import { jDialog } from '../../components';
import { personalSetting as api } from '../../api';
export default {
  data: function () {
    return {
      companyArr: [],
      monitorCompanys: [],
      chkAll: false,
      loaded: null
    }
  },
  watch: {
    companyContent() {
      this.loaded.then(() => {
        this.companyArr = this.monitorCompanys.filter(com => {
          return this.companyContent.some(cc => { return cc.id == com.id });
        });
      })
    },
    companyArr() {
      this.chkAll = (this.companyArr.length == this.monitorCompanys.length);
    }
  },
  methods: {
    show() {
      this.$refs.warning_company_tooltip_dialog.show = true;
    },
    // 预警企业弹出层隐藏
    hide() {
      this.$refs.warning_company_tooltip_dialog.close()
    },
    // 预警企业保存方法
    warningCompanySave() {
      if (!this.companyArr.length) return
      this.$emit('assignMentCompany', this.companyArr.map(ent => { return ent }))
      this.hide()
    },
    // 预警企业弹出层企业全选
    tooltipAllChoose(event) {
      setTimeout(() => {
        this.companyArr = []
        if (this.chkAll) {
          this.monitorCompanys.forEach(item => {
            this.companyArr.push(item)
          })
        }
      }, 10)
    },
    // 获取预警企业列表
    getCompanyList() {
      return api.getMonitorInfo().then(data => {
        if (data.data && data.data.list) {
          this.monitorCompanys = data.data.list.map(ent => {
            return {
              name: ent.entName,
              id: ent.entId
            }
          });
        }
      });
    }
  },
  props: {
    companyContent: {
      type: Array
    }
  },
  created: function () {
    this.loaded = this.getCompanyList();
  },
  components: { jDialog }
}
</script>
<style type="text/css" src="../../assets/css/checkbox.css" scoped></style>
<style scope lang="less">
.warning-company-tooltip {
  width: 7.6rem;
  max-width: 760px;
  min-width: 500px;
  height: 6.2rem;
  .prompt {
    font-size: 0.16rem;
    line-height: 0.4rem;
    color: #333;
    border-bottom: 1px solid #c6c6c6;
    padding: 0;
  }
  p {
    color: #f00;
    margin-top: 10px;
    padding-left: 20px;
  }
  .check-wrapper {
    padding: 10px 0;
    border-bottom: 1px solid #c6c6c6;
    margin-bottom: 10px;
    label {
      margin: 10px 0;
      display: block;
      i {
        margin-right: 10px;
      }
    }
  }
  .operate {
    margin: 20px 58px 0px;
    height: 42px;
    text-align: center;
  }
  .no-company {
    .prompt {
      border: none;
    }
    a {
      color: #388fe1;
    }
  }
}
</style>
