<template>
  <div>
    <div class="block-title mar5">
      <span class="left-border-title">个人资料</span>
    </div>
    <div class="person-box">
      <form>
        <div class="person-d">
          <label>姓名 :</label>
          <p class="control">
            <input type="text" disabled="true" readOnly="true" v-model="name" />
          </p>
        </div>
        <div class="person-d">
          <label>岗位 :</label>
          <p class="control">
            <input type="text" disabled="true" readOnly="true" v-model="jobName"/>
          </p>
        </div>
        <div class="person-d">
          <label>部门 :</label>
          <p class="control">
            <input type="text" disabled="true" readOnly="true" v-model="govName"/>
          </p>
        </div>
        <div class="person-d">
          <label>联系电话 :</label>
          <p class="control">
            <input v-model='mobile' :class="{'canChange' : true,'input': true, 'is-danger': errorInfo.has('mobile')}" name="mobile" type='text' placeholder="请设置手机号" />
            <span v-show="errorInfo.has('mobile')" class="help">手机号码格式不正确</span>
          </p>
        </div>
        <div class="person-d">
          <label>E-mail :</label>
          <p class="control">
            <input v-model="email" name="email" :class="{'canChange' : true,'input': true, 'is-danger': errorInfo.has('email') }" type="text" placeholder="请设置邮箱" />
            <span v-show="errorInfo.has('email')">邮箱格式不正确</span>
          </p>
        </div>
        <div class="person-btn">
          <input type="button"  value="保存" @click="preservation"/>
        </div>
      </form>
    </div>
    <j-Loading v-if="isLoading" loader="f"></j-Loading>
    <jPrompt ref="jprom"></jPrompt>
  </div>
</template>
<script>
import { Validator } from 'vee-validate'
import { stayPark as api } from '../../api'
import { jPrompt } from '../components'
import jLoading from '../../components/jLoading.vue'
export default{
  validator: null,
  components: {
    jLoading,
    jPrompt
  },
  data() {
    return {
      name: '',
      email: '',
      mobile: '',
      jobName: '',
      govName: '',
      errorInfo: [],
      isLoading: false
      //        initShow:false
    }
  },
  watch: {
    email(value) {
      this.validator.validate('email', value)
    },
    mobile(value) {
      this.validator.validate('mobile', value)
    }
  },
  methods: {
    getInformation() {
      api
        .getInformation()
        .then(rst => {
          const data = rst.data
          this.name = data.realName // 姓名
          this.jobName = data.jobName // 岗位
          this.govName = data.govName // 部门
          this.email = data.userEmail // email
          this.mobile = data.userMobile // 手机
        })
    },
    preservation() {
      let vm = this
      this.validator.validateAll({
        //      name: this.userName,
        email: vm.email,
        mobile: vm.mobile
      })
      if (vm.errorInfo.items.length === 0) {
        this.$refs.jprom.show()
        const userJson = {
          userMobile: vm.mobile,
          userEmail: vm.email
        }
        api
          .updateSysUser(userJson)
          .then(rst => {
          })
      }
    }
  },
  created() {
    this.validator = new Validator({
      //      name: 'required|min:2',
      email: 'required|email',
      mobile: 'required|regex:^1[34578][0-9]{9}$'
    })

    this.$set(this, 'errorInfo', this.validator.errors || [])
  },
  mounted() {
    this.getInformation()
  }
}
</script>
<style scoped lang="less">
  .mar5{
    padding-bottom: 12px;
  }
  .person-box{
    width: 100%;
    text-align: center;
    padding: 35px 0 0 0;
  }
  .person-d{
    width: 100%;
    height: 36px;
    font-size: 14px;
    margin-bottom: 25px;
    label{
      display: inline-block;
      width: 70px;
      color: #999999;
      margin-right: 15px;
      text-align: right;
    }
    .control{
      display: inline;
      position: relative;
      input{
        width: 30%;
        height: 100%;
        padding-left: 12px;
        border-radius: 5px;
        border: solid 1px #d9d9d9;
        outline:none;
      }
      span{
        width:300px;
        text-align: left;
        position: absolute;
        top: 0px;
        right: -320px;
        color: #ff4d1d;
      }
    }
  }
  .person-btn{
    width: 100%;
    text-align: center;
    margin-top: 55px;
    input{
      width: 111px;
      height: 34px;
      background-image: linear-gradient(-23deg,#2f81ee 0%,#3f8ffa 100%),linear-gradient(#898989,#898989);
      background-blend-mode: normal,normal;
      border-radius: 5px;
      font-size: 14px;
      color: white;
      cursor: pointer;
    }
  }
</style>
