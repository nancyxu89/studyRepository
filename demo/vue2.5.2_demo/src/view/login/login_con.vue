<template>
  <div>
    <div class="login-zzc"></div>
    <div class="login-page">
      <div class="login-hea">
        <span class="login-delete" @click="dele">
          <i class="icon iconfont icon-delete"></i>
        </span>
        <ul class="login-tab">
          <li v-for="(item,index) in tabObj" v-bind:key="index">
            <span @click="tabSign(item.idName,index)" :class="{'active':index ==checkindex }">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="login-con">
        <!--<keep-alive>-->
        <component ref="loginBox" :is="currentView" v-model="loginInfo" @passValue="login" @jump="jump">
        </component>
        <!--</keep-alive>-->
      </div>
      <div class="login-footer">
        <p class="forget">
          <span @click="forget" v-if="this.checkindex==1?true:false">忘记密码?</span>
        </p>
        <p class="hint">
          <span>{{errMsg}}</span>
        </p>
        <p class="sign">
          <button @click="login">{{!loginning?'登录':'登录中...'}}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import loginQi from './login-qi'
import loginYu from './login-yu'
import { Types } from '../../assets/js/types'
export default {
  props: {
    isShow: {
      type: Boolean
    },
    msg: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },
  components: {
    loginQi,
    loginYu
  },
  data() {
    return {
      currentView: loginQi,
      checkindex: 0,
      tabObj: [
        { name: '企业登录', idName: 'loginQi' },
        { name: '园区登录', idName: 'loginYu' }
      ],
      loginning: false,
      loginInfo: {
        username: this.username,
        password: this.password
      },
      errMsg: ''
    }
  },
  watch: {
    msg(value) {
      this.errMsg = value
      this.loginning = !value
    },
    checkindex() {
      this.loginning = false
    },
    loginInfo: {
      handler(newValue, oldValue) {
        this.errMsg = ''
        this.$emit('update:msg', '')
        this.loginning = false
      },
      deep: true
    },
    errMsg(value) {
      if (value === '') {
        this.loginning = false
      }
    }
  },
  methods: {
    dele() {
      this.$emit('dele')
    },
    tabSign(tab, index) {
      this.currentView = tab
      this.checkindex = index
      this.$refs.loginBox.focusObj()
      this.errMsg = ''
      this.$emit('update:msg', '')
      this.loginInfo = {}
    },
    login() {
      this.errMsg = ''
      this.$emit('update:msg', '')
      // useType:'1',代表园区用户;'0'代表企业用户
      this.loginInfo.userType =
        this.checkindex === 1 ? Types.GardenType : Types.EntType
      if (!this.loginInfo.username) {
        if (this.loginInfo.userType === 1) {
          this.errMsg = '用户名不能为空'
          return
        }
        if (this.loginInfo.userType === 0) {
          this.errMsg = '手机号不能为空'
          return
        }
      }
      if (!this.loginInfo.password) {
        this.errMsg = '密码不能为空'
        return
      }
      if (this.loginInfo.userType === 0) {
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.loginInfo.username)) {
          this.errMsg = '手机号不符合规则'
          return
        }
      }
      this.loginning = true
      this.$emit('login', this.loginInfo)
    },
    forget() {
      if (this.checkindex === 1) {
        this.$emit('forget')
      }
    },
    jump() {
      this.$emit('jump')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login-zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 0;
  overflow: hidden;
  z-index: 400;
}
.login-page {
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
  z-index: 500;
  width: 338px;
  height: 375px;
  background-image: linear-gradient(
      0deg,
      rgba(23, 78, 146, 0.95) 0%,
      rgba(23, 121, 204, 0.96) 100%
    ),
    linear-gradient(#ffffff, #ffffff);
  box-shadow: 0 7px 11px 0 rgba(0, 12, 29, 0.35);
  border-radius: 2%;
}
.login-hea {
  .login-tab {
    width: 100%;
    height: 37px;
    border-bottom: solid 1px #3782d2;
    display: flex;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 12px;
    li {
      width: 50%;
      text-align: center;
      .active {
        color: #debc41;
        border-bottom: 2px solid #ff9000;
      }
      span {
        font-size: 20px;
        color: #fff;
        padding: 0 3px 10px 1px;
        cursor: pointer;
      }
    }
  }
  .login-delete {
    position: absolute;
    right: 12px;
    top: 9px;
    cursor: pointer;
    .icon-delete {
      color: #5ba4ff;
      font-size: 20px;
    }
    .icon-delete:hover {
      font-size: 23px;
      color: #82d8ff;
    }
  }
}
.login-con {
  width: 100%;
  box-sizing: border-box;
  padding: 0 33px;
}
.login-footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 33px;
  .forget {
    position: relative;
    height: 32px;
    line-height: 32px;
    & > span {
      position: absolute;
      right: 0;
      color: #e8a43a;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .hint {
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #ff4d1d;
  }
  .sign {
    width: 100%;
    margin-top: 11px;
    button {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-radius: 4px;
      background: linear-gradient(-90deg, #2881f0 0%, #29bbff 100%),
        linear-gradient(#196db3, #196db3);
      font-size: 18px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
