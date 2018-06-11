<template>
  <div class='mainContent'>
    <!--个人信息-->
    <div class=''>
      <div class="companyMsg-news">
        <h3 class="fl">个人信息</h3>
        <button class="save-btn amend-psd fr" @click="amend()">修改密码</button>
      </div>

      <div>
        <ul class='formList'>
          <li>
            <label>用户名：</label>
            <input type="text" placeholder="" disabled="true" 　readOnly="true" v-model="userName" />
            <!--<input type="text" placeholder="loginName" disabled="true" 　readOnly="true" v-model="userName" />-->
            <!--<i v-show="errors.has('name')" class="fa fa-warning"></i>
              <span v-show="errors.has('name')" class="help">{{ errors.first('name') }}</span>-->
          </li>
          <li>
            <label>姓名：</label>
            <input disabled="true" readOnly="true" v-model="realName" name="name" type="text" placeholder="" />
            <!--<input disabled="true" readOnly="true" v-model="realName" name="name" type="text" placeholder="Name" />-->
            <!--<label>姓名：</label><input disabled="true" readOnly="true"  v-model="realName" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name" />-->
            <!--<i v-show="errors.has('name')" class="fa fa-warning"></i>-->
            <!--<span v-show="errors.has('name')" class="help">{{ errors.first('name') }}</span>-->
          </li>
          <li>
            <label>手机号：</label>
            <input v-model='userMobile' :class="{'canChange' : true,'input': true, 'is-danger': errorInfo.has('mobile')}" name="mobile" type='text' placeholder="请输入手机号" />
            <i v-show="errorInfo.has('mobile')" class="fa fa-warning"></i>
            <!--<span v-show="errors.has('mobile')" class="help">{{ errors.first('mobile') }}</span>-->
            <span v-show="errorInfo.has('mobile')" class="help">手机号码格式不正确</span>
          </li>
          <li>
            <label>邮箱：</label>
            <input v-model="userEmail" name="email" :class="{'canChange' : true,'input': true, 'is-danger': errorInfo.has('email') }" type="text" placeholder="请输入邮箱" />
            <i v-show="errorInfo.has('email')" class="fa fa-warning"></i>
            <!--<span v-show="errors.has('email')" class="help">{{ errors.first('email') }}</span>-->
            <span v-show="errorInfo.has('email')" class="help">邮箱格式不正确</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='companyMsg'>
      <h3>公司信息</h3>
      <div>
        <ul class='formList companyList'>
          <li>
            <label>公司名称：</label>
            <input type='text' placeholder="" disabled="true" 　readOnly="true" v-model="companyName" />
            <!--<input type='text' placeholder="西南证券" disabled="true" 　readOnly="true" v-model="companyName" />-->
          </li>
          <li>
            <label>部门：</label>
            <input type='text' placeholder="" disabled="true" 　readOnly="true" v-model="departmentName" />
            <!--<input type='text' placeholder="部门1" disabled="true" 　readOnly="true" v-model="departmentName" />-->
          </li>
          <li>
            <label>角色：</label>
            <input type='text' placeholder="" disabled="true" 　readOnly="true" v-model="roleType" />
            <!--<input type='text' placeholder="业务员" disabled="true" 　readOnly="true" v-model="roleType" />-->
          </li>
          <li>
            <label>职位：</label>
            <input type='text' placeholder="" disabled="true" 　readOnly="true" v-model="staffType" />
            <!--<input type='text' placeholder="项目经理" disabled="true" 　readOnly="true" v-model="staffType" />-->
          </li>
        </ul>
      </div>
      <button @click="validateForm">保存</button>
    </div>
    <j-Loading v-if="isLoading" loader="f"></j-Loading>
    <j-amend-psd title="修改密码" ref='amendData'></j-amend-psd>
  </div>
</template>
<script>
import { Validator } from 'vee-validate'
import { user as api } from '../../api'
import jLoading from '../../components/jLoading.vue'
import jAmendPsd from '../components/jAmendPsd'
export default {
  name: 'jusfoun',
  validator: null,
  data: () => ({
    userName: '',
    realName: '',
    userMobile: '',
    userEmail: '',
    companyName: '',
    departmentName: '',
    roleType: '',
    staffType: '',
    errorInfo: [],
    isLoading: false
  }),
  watch: {
    //          loginName(value) {
    //            this.validator.validate('name', value);
    //          },
    userEmail(value) {
      this.validator.validate('email', value)
    },
    userMobile(value) {
      this.validator.validate('mobile', value)
    }
  },
  methods: {
    amend: function() {
      this.$refs.amendData.show()
    },
    validateForm() {
      let vm = this
      this.validator.validateAll({
        //      name: this.userName,
        email: vm.userEmail,
        mobile: vm.userMobile
      })

      if (vm.errorInfo.items.length === 0) {
        vm.isLoading = true
        let params = {
          userMobile: vm.userMobile,
          userEmail: vm.userEmail
        }

        api.saveUserInfo(params).then(function(response) {
          vm.isLoading = false
          if (response == null || response.code == null || response.code !== 1) {
            alert('保存失败,请稍后重试!')
          } else if (response != null && response.code === 1) {
            alert('保存成功!')
          }
        }).catch(() => {
          vm.isLoading = false
          alert('保存失败,请稍后重试!')
        })
      }
    }
  },
  created() {
    this.validator = new Validator({
      //      name: 'required|min:2',
      email: 'required|email',
      mobile: 'required|regex:1[34578][0-9]{9}'
    })

    this.$set(this, 'errorInfo', this.validator.errors || [])
  },
  mounted() {
    let vm = this
    vm.isLoading = true
    let token = vm.$store.state.user.userInfo.token
    api.getUserInfo({ token: token }).then(function(response) {
      vm.isLoading = false
      if (response != null && response.code == 1) {
        let userInfo = response.data
        vm.userName = userInfo.userName
        vm.realName = userInfo.realName
        vm.userMobile = userInfo.userMobile
        vm.userEmail = userInfo.userEmail
        vm.companyName = userInfo.companyName
        vm.departmentName = userInfo.govName
        vm.roleType = userInfo.rolesName
        vm.staffType = userInfo.jobName
      } else {
        alert('获取用户信息失败')
      }
    }).catch(function() {
      vm.isLoading = false
      alert('获取用户信息失败')
    })
  },
  components: {
    jLoading,
    jAmendPsd
  }
}

</script>
<style scoped lang='less'>
.mainContent {
  font-family: '微软雅黑';
  margin: 20px;
  h3 {
    font-size: 18px;
    color: #333;
    margin: 38px 0 50px 0;
  }
  .formList {
    .is-danger {
      border: 1px solid red;
    }
    .help {
      color: red;
    }
    input {
      width: 220px;
      height: 28px;
      border: 1px solid #d2d2d2;
      margin-bottom: 24px;
      outline: none;
      padding-left: 15px;
    }
    label {
      display: inline-block;
      min-width: 80px;
    }
    li:nth-child(1) {
      label {
        background: url(../../assets/images/userName.png) no-repeat left;
        padding-left: 30px;
      }
    }
    li:nth-child(2) {
      label {
        background: url(../../assets/images/name.png) no-repeat left;
        padding-left: 30px;
      }
    }
    li:nth-child(3) {
      label {
        background: url(../../assets/images/iphone.png) no-repeat left;
        padding-left: 30px;
      }
    }
    li:nth-child(4) {
      label {
        background: url(../../assets/images/email.png) no-repeat left;
        padding-left: 30px;
      }
    }
  }
  .companyMsg {
    h3 {
      padding-bottom: 14px;
      border-bottom: 1px solid #ccc;
    }
    .companyList {
      li:nth-child(1) {
        label {
          background: url(../../assets/images/gsName.png) no-repeat left;
          padding-left: 30px;
        }
      }
      li:nth-child(2) {
        label {
          background: url(../../assets/images/branch.png) no-repeat left;
          padding-left: 30px;
        }
      }
      li:nth-child(3) {
        label {
          background: url(../../assets/images/role.png) no-repeat left;
          padding-left: 30px;
        }
      }
      li:nth-child(4) {
        label {
          background: url(../../assets/images/part.png) no-repeat left;
          padding-left: 30px;
        }
      }
    }
    button {
      color: #fff;
      width: 128px;
      height: 35px;
      background: linear-gradient(0deg, #ff8e00, #ff6701);
      border-radius: 2px;
      font-size: 14px;
      margin: 14px 0 0 114px;
      cursor: pointer;
    }
    button:hover {
      background: linear-gradient(0deg, #ff6701, #ff6701);
    }
  }
  input.canChange:hover {
    border-color: #39a2fa;
  }
  .companyMsg-news {
    display:-ms-flexbox;display:flex;
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin: 0 0 50px 0;
    padding-bottom: 14px;
    position: relative;
    h3 {
      font-size: 18px;
      color: #333;
      margin: 0px;
    }
    .amend-psd {
      width: 78px;
      height: 27px;
      cursor: pointer;
      position: absolute;
      right: 0px;
    }
  }
}
</style>
