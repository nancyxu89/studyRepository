<template>
  <div class="early-warning-set">
    <div class="header clearFix">
      <h3>设置预警推送</h3>
      <router-link class="fallback" to="/setting/earlyWarning" active-class="selected">返回</router-link>
    </div>
    <div class="name">
      <span>推送名称：</span>
      <input type="text" maxlength="30" v-model="warningPushInfoAll.warningName" name="warningName" v-validate="'required'" :class="{'error':errors.has('warningName')}">
    </div>
    <div class="warning-panel warning-push">
      <h4>预警推送类型 </h4>
      <div class="panel-item type-form" :class="{'error':errors.has('pushType')}">
        <label>
          邮件推送：
          <input type="email" placeholder="请输入接收推送的邮箱" v-model="warningPushInfoAll.email" name="email" v-validate="'email'" :class="{'error':errors.has('email')}">
        </label>
        <label>
          短信推送：
          <!--<input type="tel" placeholder="请输入接收推送的手机号" v-model="warningPushInfoAll.tel" name="tel"  v-validate="{ rules: { regex: /^1\d{10}$/} }" :class="{'error':errors.has('tel')}">-->
          <input type="tel" placeholder="请输入接收推送的手机号" v-model="warningPushInfoAll.tel" name="tel" v-validate="'tel'" :class="{'error':errors.has('tel')}">
        </label>
      </div>
    </div>
    <div class="warning-panel warning-company">
      <h4>预警企业范围</h4>
      <div class="panel-item range-content" name="warningCompany" :class="{'error':errors.has('warningCompany')}">
        <div class="name-range">
          <div :title="warningPushInfoAll.warningCompany|companysTxt" v-show="warningPushInfoAll.warningCompany.length">
            {{warningPushInfoAll.warningCompany|companysTxt}}
          </div>
        </div>
        <button class="set-btn" @click="warningCompanyshow">设置预警企业名单</button>
      </div>

    </div>
    <div class="warning-panel monitor-info">
      <h4>监控信息类型</h4>
      <div class="panel-item monitor-content" :class="{'error':errors.has('warningType')}">
        <div class="sentiment-info">
          <label>
            舆情信息
          </label>
          <div class="name-range">
            <div :title="warningPushInfoAll.warningSentiment|sentimentTxt" v-show="warningPushInfoAll.warningSentiment">{{warningPushInfoAll.warningSentiment|sentimentTxt}}</div>
          </div>
          <button class="set-btn" @click="warningPushShow">设置预警舆情标签</button>
        </div>
        <div class="warning-info">
          <label>
            风险及变更信息
          </label>
          <label v-for="item in riskAndChanges">
            <input type="checkbox" :value="item.value" v-model="warningPushInfoAll.riskChanges">
            <i>✓</i>{{item.name}}
          </label>
        </div>
      </div>
    </div>
    <div class="push-wrap">
      <div class="warning-panel">
        <h4>推送频率</h4>
        <div class="panel-item">
          <label>
            <input type="radio" name="push-date" :value="46" v-model="warningPushInfoAll.pushFrequencyType">
            <i>✓</i>即时推送</label>
          <label>
            <input type="radio" name="push-date" :value="47" v-model="warningPushInfoAll.pushFrequencyType">
            <i>✓</i>日</label>
          <label>
            <input type="radio" name="push-date" :value="48" v-model="warningPushInfoAll.pushFrequencyType">
            <i>✓</i>周</label>
          <label>
            <input type="radio" name="push-date" :value="49" v-model="warningPushInfoAll.pushFrequencyType">
            <i>✓</i>月</label>
          <div>
            <j-select v-show="warningPushInfoAll.pushFrequencyType == 48" v-model="warningPushInfoAll.week" :initItems="weeks" displayKey="text" valueKey="value" :selectedIndex="warningPushInfoAll.week-1">
            </j-select>
            <j-select v-show="warningPushInfoAll.pushFrequencyType == 49" v-model="warningPushInfoAll.day" :initItems="days" displayKey="text" valueKey="value" :selectedIndex="warningPushInfoAll.day-1">
            </j-select>
            <j-select v-show="warningPushInfoAll.pushFrequencyType !=46" v-model="warningPushInfoAll.hour" :initItems="hours" displayKey="text" valueKey="value" :selectedIndex="warningPushInfoAll.hour-1">
            </j-select>
            <div v-show="warningPushInfoAll.pushFrequencyType == 46" class="realtime-tip">系统将在达到预警条件后立即为您推送预警消息</div>
          </div>
        </div>
      </div>
      <div class="warning-panel">
        <h4>推送有效期</h4>
        <div class="panel-item">
          <label>
            <input type="radio" name="push-effective" value="50" v-model="warningPushInfoAll.pushEffective">
            <i>✓</i>长期</label>
          <div>
            <label>
              <input type="radio" name="push-effective" value="51" v-model="warningPushInfoAll.pushEffective">
              <i>✓</i>自定义</label>
            <j-DatePicker v-model="warningPushInfoAll.effectiveStart" :max="warningPushInfoAll.effectiveEnd" :disabled="warningPushInfoAll.pushEffective!=51">
            </j-DatePicker>
            <j-DatePicker v-model="warningPushInfoAll.effectiveEnd" :min="warningPushInfoAll.effectiveStart" :disabled="warningPushInfoAll.pushEffective!=51" align='right'>
            </j-DatePicker>
          </div>
        </div>
      </div>
    </div>
    <div class="warning-panel push-type">
      <h4>预警推送状态</h4>
      <div class="panel-item clearFix">
        <button :class="{'type-item':true, active:warningPushInfoAll.pushStatus === 42}" @click="switchClick" :disabled='expire' :title='expire?"推送有效期过期,无法开启":""'>开启</button>
        <button :class="{'type-item':true, active:warningPushInfoAll.pushStatus === 43}" @click="switchClick">暂停</button>

        <!--<button class="set-btn" >立即发送推送</button>
                                                                        <span>系统立即为您发送最近的一条预警消息，当次有效</span>-->
      </div>
    </div>
    <div class="ensure_cancel">
      <button class="ensure" @click="save" :disabled="!validation.rtn" :title="validation.msg">确定</button>
      <button class="cancel" @click="goback">取消</button>
    </div>
    <set-companyTooltip ref="set_company_tooltip" :company-content="warningPushInfoAll.warningCompany" @assignMentCompany="assignCompany"></set-companyTooltip>
    <set-sentimentTooltip ref="set_sentiment_tooltip" :sentiment-content="warningPushInfoAll.warningSentiment" @assignMentSentiment="assignSentiment"></set-sentimentTooltip>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg" @close="saveCallBack"></jOperaMsg>
  </div>
</template>

<script>
import { jDialog, jSelect, jDatePicker, jOperaMsg } from "../../components";
import { personalSetting as api } from "../../api";
import setCompanyTooltip from "./setCompanyTooltip.vue";
import setSentimentTooltip from "./setSentimentTooltip.vue";
import moment from "../../../static/js/moment.min.js";

export default {
  data() {
    return {
      receiveId: "",
      monitorCompanys: [],
      // warningPushCompanysSelect: [],
      warningPushInfoAll: {
        // 预警名称
        warningName: "",
        // 推送类型邮件
        email: "",
        // 推送类型电话
        tel: "",
        // 预警企业范围字符串
        warningCompany: [],
        // 监控信息类型字符串
        warningSentiment: [],
        // 风险变更信息字符串
        riskChanges: [],
        // 推送频率类型，46及时，47每日，48每周，49每月
        pushFrequencyType: 46,
        // 推送频率小时0-23
        hour: 1,
        // 推送频率周1-7
        week: 1,
        // 推送频率日1-31
        day: 1,
        // 推送有效期，长期50，自定义51
        pushEffective: 50,
        // 推送有效期开始时间
        effectiveStart: moment().format("YYYY-MM-DD"),
        // 推送有效期结束时间
        effectiveEnd: moment()
          .add(1, "years")
          .format("YYYY-MM-DD"),
        // 预警推送类型，42开始，43关闭
        pushStatus: 42,
        // 系统推送开关
        systemSwitch: null
      },
      opera: {
        code: 1,
        msg: ""
      }
    };
  },
  computed: {
    riskAndChanges() {
      return this.$store.state.business_risk_type;
    },
    weeks() {
      return [
        { value: 1, text: "星期一" },
        { value: 2, text: "星期二" },
        { value: 3, text: "星期三" },
        { value: 4, text: "星期四" },
        { value: 5, text: "星期五" },
        { value: 6, text: "星期六" },
        { value: 7, text: "星期日" }
      ];
    },
    hours() {
      return Array.from(Array(24).keys()).map(val => {
        return { value: val + 1, text: `${val + 1}:00` };
      });
    },
    days() {
      return Array.from(Array(31).keys()).map(val => {
        return { value: val + 1, text: `${val + 1}日` };
      });
    },
    validation() {
      let obj = {
        msg: "",
        rtn: true
      };
      obj.rtn = this.warningPushInfoAll.warningName.trim();
      if (!obj.rtn) {
        obj.msg = "请输入推送名称";
        return obj;
      }
      obj.rtn =
        this.warningPushInfoAll.email.trim() ||
        this.warningPushInfoAll.tel.trim();
      if (!obj.rtn) {
        obj.msg = "请输入推送类型";
        return obj;
      }
      obj.rtn = this.warningPushInfoAll.warningCompany.length;
      if (!obj.rtn) {
        obj.msg = "请选择预警企业范围";
        return obj;
      }
      obj.rtn =
        this.warningPushInfoAll.warningSentiment.length ||
        this.warningPushInfoAll.riskChanges.length;
      if (!obj.rtn) {
        obj.msg = "请选择监控信息类型";
        return obj;
      }
      obj.rtn = !this.expire || this.warningPushInfoAll.pushStatus === 43;
      if (!obj.rtn) {
        obj.msg = "请选择有效的推送有效期";
        return obj;
      }
      return obj;
    },
    expire() {
      let rtn = false;
      if (+this.warningPushInfoAll.pushEffective === 51) {
        let endDate = new Date(
          this.warningPushInfoAll.effectiveEnd + "T23:59:59"
        );
        let now = new Date();
        rtn = now - endDate > 0;
      }
      return rtn;
    }
  },
  watch: {
    expire(curVal) {
      if (curVal) {
        this.warningPushInfoAll.pushStatus = 43;
      }
    }
  },
  methods: {
    initData(warningId) {
      if (warningId) {
        this.getWarningSetInfo(warningId).then(info => {
          this.warningPushInfoAll.warningName = info.name;
          this.warningPushInfoAll.email =
            info.emailSwitch === 1 ? info.email : "";
          this.warningPushInfoAll.tel = info.telSwitch === 1 ? info.tel : "";
          var names = info.entName.split(",");
          var ids = info.entId.split(",");
          this.warningPushInfoAll.warningCompany = names.map((name, i) => {
            return { name, id: ids[i] };
          });
          this.warningPushInfoAll.warningSentiment = info.opinionWarningKeyword.split(
            ","
          );
          this.warningPushInfoAll.riskChanges = info.riskWorningType.split(",");
          this.warningPushInfoAll.pushFrequencyType = info.frequency;

          this.warningPushInfoAll.hour = info.hour;
          this.warningPushInfoAll.week = info.week;
          this.warningPushInfoAll.day = info.day;
          this.warningPushInfoAll.pushEffective = +info.validPeriod;
          if (this.warningPushInfoAll.pushEffective === 51) {
            this.warningPushInfoAll.effectiveStart = moment(
              info.validStart
            ).format("YYYY-MM-DD");
            this.warningPushInfoAll.effectiveEnd = moment(info.validEnd).format(
              "YYYY-MM-DD"
            );
          }
          this.warningPushInfoAll.pushStatus = +info.status;
          this.warningPushInfoAll.systemSwitch = info.systemSwitch;
        });
      }
    },
    getWarningSetInfo(warningId) {
      return api.warningPushList({ id: warningId }).then(rtn => {
        if (rtn.code == 1 && rtn.data.list) {
          return rtn.data.list[0] || {};
        } else {
          return {};
        }
      });
    },
    // 预警企业弹出层显示
    warningCompanyshow() {
      this.$refs.set_company_tooltip.show();
    },
    // 预警推送弹出层显示
    warningPushShow() {
      this.$refs.set_sentiment_tooltip.show();
    },
    // 舆情标签弹框组件向父组件传递数据的方法
    assignSentiment(param) {
      this.warningPushInfoAll.warningSentiment = param;
    },
    // 预警企业弹框想父组件传递数据的方法
    assignCompany(param) {
      this.warningPushInfoAll.warningCompany = param;
    },
    // 确定按钮点击时候保存方法
    save() {
      this.validate()
        .then(() => {
          var data = this.getPageData();
          var method = "warningPushAdd";
          if (this.receiveId) {
            data.id = this.receiveId;
            method = "warningPushUpdate";
          }

          api[method](data)
            .then(rtn => {
              this.opera.code = rtn.code;
              this.opera.msg = "保存成功！";
              this.$refs.operaMsg.show();
            })
            .catch(err => {
              this.opera.code = -1;
              this.opera.msg = "保存失败！" + err.msg;
              this.$refs.operaMsg.show();
            });
        })
        .catch((err1, err2) => {
          console.log("error");
          this.opera.code = 0;
          this.opera.msg = "输入数据不完整！";
          this.$refs.operaMsg.show();
        });
    },
    saveCallBack() {
      if (this.opera.code == 1) {
        this.goback();
      }
    },
    validate() {
      var v1 = this.$validator.validateAll();
      var v2 = this.$validator.validateAll({
        pushType: [this.warningPushInfoAll.tel, this.warningPushInfoAll.email],
        warningCompany: this.warningPushInfoAll.warningCompany,
        warningType: [
          this.warningPushInfoAll.warningSentiment,
          this.warningPushInfoAll.riskChanges
        ]
      });
      return Promise.all([v1, v2]);
    },
    getPageData() {
      var data = {
        name: this.warningPushInfoAll.warningName.trim(),
        email: this.warningPushInfoAll.email.trim(),
        tel: this.warningPushInfoAll.tel.trim(),
        entName: this.warningPushInfoAll.warningCompany
          .map(com => {
            return com.id;
          })
          .join(","),
        opinionWarningKeyword: this.warningPushInfoAll.warningSentiment.join(
          ","
        ),
        riskWorningType: this.warningPushInfoAll.riskChanges.join(","),
        frequency: this.warningPushInfoAll.pushFrequencyType,
        validPeriod: this.warningPushInfoAll.pushEffective,
        status: this.warningPushInfoAll.pushStatus,
        systemSwitch: this.warningPushInfoAll.systemSwitch
      };
      data.telSwitch = data.tel ? 1 : 0;
      data.emailSwitch = data.email ? 1 : 0;
      if (data.frequency == 47) {
        data.hour = this.warningPushInfoAll.hour;
      } else if (data.frequency == 48) {
        data.hour = this.warningPushInfoAll.hour;
        data.week = this.warningPushInfoAll.week;
      } else if (data.frequency == 49) {
        data.hour = this.warningPushInfoAll.hour;
        data.day = this.warningPushInfoAll.day;
      }
      if (data.validPeriod == 51) {
        data.validStart = this.warningPushInfoAll.effectiveStart + " 00:00:00";
        data.validEnd = this.warningPushInfoAll.effectiveEnd + " 23:59:59";
      }
      return data;
    },
    // 是否开启预警推送
    switchClick() {
      this.warningPushInfoAll.pushStatus =
        this.warningPushInfoAll.pushStatus === 42 || this.expire ? 43 : 42;
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$validator.attach("pushType", "notallempty");
    this.$validator.attach("warningCompany", "notallempty");
    this.$validator.attach("warningType", "notallempty");
    this.receiveId = this.$route.query.id;
    this.initData(this.receiveId);
  },
  components: {
    jSelect,
    jDatePicker,
    jDialog,
    setCompanyTooltip,
    setSentimentTooltip,
    jOperaMsg
  },
  filters: {
    companysTxt(companys) {
      if (!companys) return "";
      return companys
        .map(company => {
          return company.name;
        })
        .join(", ");
    },
    sentimentTxt(sentiments) {
      if (!sentiments) return "";
      return sentiments.join(", ");
    }
  }
};
</script>
<style type="text/css" src="../../assets/css/checkbox.css" scoped></style>

<style scoped lang="less">
.early-warning-set {
  width: 100%;
  h4 {
    border-left: 5px solid #fc6c21;
    padding-left: 5px;
    margin: 10px 0;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
  }
  input[type="text"] {
    padding-left: 6px;
  }
  .header {
    padding-bottom: 20px;
    border-bottom: 2px solid #bebebe;
    h3 {
      font-size: 16px;
      font-weight: bold;
      float: left;
    }
    .fallback {
      float: right;
      margin-right: 20px;
      padding: 6px 18px;
      border: 1px solid #2f86e7;
      border-radius: 4px;
      color: #2f86e7;
    }
  }
  .name {
    line-height: 80px;
    margin: 0 0 10px 28px;
    input {
      width: 248px;
      height: 28px;
      border: 1px solid #bebebe;
    }
  }
  .warning-panel {
    color: #333;
    margin-bottom: 30px;
    .panel-item {
      border: 1px solid #dcdcdc;
      color: #a9a9a9;
      padding: 0 28px;
      box-sizing: border-box;
      width: 100%;
    }
  }
  .warning-push {
    .type-form {
      height: 82px;
      line-height: 82px;
      input {
        width: 146px;
        height: 28px;
        border: 1px solid #bebebe;
      }
      label + label {
        margin-left: 128px;
      }
    }
  }
  .warning-company {
    width: 100%;
    .range-content {
      width: 100%;
      border: 1px solid #dcdcdc;
      height: 82px;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
    }
  }
  .monitor-info {
    .monitor-content {
      display: -ms-flexbox;
      display: flex;
      height: 172px;
      flex-direction: column;
      .sentiment-info {
        flex: 1;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        label:first-child {
          width: 120px;

          flex-grow: 0;
          flex-shrink: 0;
        }
      }
      .warning-info {
        flex: 1;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        .color-title {
          color: #4c4c4c;
        }
        label:first-child {
          width: 120px;
          flex-grow: 0;
          flex-shrink: 0;
        }
        label:not(:first-child) {
          margin-right: 0.6rem;
        }
      }
    }
  }
  .push-wrap {
    display: -ms-flexbox;
    display: flex;
    padding-top: 0.28rem;
    & > .warning-panel {
      flex: 1;
      & > .panel-item {
        padding-top: 0.28rem;
        padding-bottom: 0.28rem;
        span {
          color: #878787;
        }
      }
    }
    & > .warning-panel + .warning-panel {
      margin-left: 0.2rem;
      & > .panel-item {
        padding-top: 0.28rem;
      }
      span {
        color: #fc6c21;
      }
    }
    & label {
      color: #4c4c4c;
      margin-right: 0.6rem;
    }
    .select {
      margin: 0.2rem 0.15rem 0.1rem 0;
    }
  }
  .push-type {
    & .panel-item {
      line-height: 82px; // button {
      //   width: 100px;
      //   float: right;
      //   margin: 24px 0 0 24px;
      // }
      .type-item {
        line-height: 27px;
        width: 66px;
        text-align: center;
        border: 1px solid #999999;
        color: #999;
        /*margin: 28px 6px 0 0;*/
        background: #fff;
        background: rgba(255, 255, 255, 0);
        margin: 20px 6px;
        float: left;
        border-radius: 5px;
        &.active {
          border-color: #0092ff;
          color: #0092ff;
        }
      }

      span {
        float: right;
      }
    }
  }
  .ensure_cancel {
    text-align: center;
    button {
      width: 135px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: #fff;
      border-radius: 5px;
    }
    .ensure {
      background: linear-gradient(0deg, #5292e0, #3670b5);
      margin-right: 42px;
    }
    .cancel {
      background: linear-gradient(0deg, #fd8b25, #fc6921);
    }
  }
  .realtime-tip {
    margin: 0.2rem 0.15rem 0.1rem;
    height: 28px;
    margin-left: 0;
  }
  .name-range {
    padding: 8px;
    flex-grow: 1;
    flex-shrink: 1;
    padding-right: 0.27rem;
    overflow: hidden;
    div {
      border: 1px solid #bddbf5;
      background: #eef2f7;
      color: #8a8c8e;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      max-width: 100%;
    }
  }
  .set-btn {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .error {
    border: 1px solid red !important;
  }
}
</style>
