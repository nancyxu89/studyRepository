<template>
  <div>
    <div class="login-zzc"></div>
    <div class="login-page">
      <div class="login-hea">
        <span class="login-delete" @click="dele"><i class="icon iconfont icon-delete"></i></span>
        <div class="login-zc">
          注册
          <div class="login-line"><img src="../../assets/images/line.png"/></div>
        </div>
      </div>
      <div class="login-con">
        <h3 class="title">登录招商通,找到你合适的园区</h3>
        <p class="log-p">
          <input ref="userInput" v-model="registerObj.phone" type="text" placeholder="请设置手机号" class="news" @keyup.13="keyUp()">
        </p>
        <p class="log-p log-ver">
          <input type="text" v-model="registerObj.verification" placeholder="请输入短信验证码" class="news" @keyup.13="keyUp()">
          <jShortMessageCode :phone="this.registerObj.phone" @errData="errData"></jShortMessageCode>
        </p>
        <p class="log-p">
          <input type="password" v-model="registerObj.password" placeholder="请设置密码" class="news" @keyup.13="keyUp()">
          <i class="iconfont icon-yanjing"></i>
        </p>
      </div>
      <div class="login-footer">
        <p class="hint">
          <span>{{errMsg}}</span>
        </p>
        <p class="sign">
          <button @click="register">{{!loginning?'注册':'注册中...'}}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { stayPark as api } from '../../api'
import { jShortMessageCode } from '../components'
export default {
  props: {
    isShow: {
      type: Boolean
    },
    resMsg: {
      type: String,
      default: ''
    }
  },
  components: {
    jShortMessageCode
  },
  data() {
    return {
      loginning: false,
      errMsg: '',
      registerObj: {
        phone: '',
        verification: '',
        password: ''
      }
    }
  },
  watch: {
    resMsg(value) {
      this.errMsg = value
      this.loginning = !value
    },
    registerObj: {
      handler(newValue, oldValue) {
        this.errMsg = ''
        this.$emit('update:msg', '')
        this.loginning = false
      },
      deep: true
    }
  },
  methods: {
    errData(res) {
      this.errMsg = res
    },
    dele() {
      this.$emit('close')
    },
    keyUp() {
      this.register()
    },
    register() {
      this.errMsg = ''
      this.$emit('update:resMsg', '')
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.registerObj.phone))) {
        this.errMsg = '手机号不符合规则'
        return
      }
      if (!this.registerObj.verification) {
        this.errMsg = '验证码不能为空'
        return
      }
      if (!(/^[A-Za-z0-9]{6,12}$/).test(this.registerObj.password)) {
        this.errMsg = '请设置6到12位数字或字母的密码'
        return
      }
      const resJson = {
        userType: 0,
        userName: this.registerObj.phone,
        password: this.registerObj.password,
        validate: this.registerObj.verification
      }
      // 注册接口
      api
        .register(resJson)
        .then(rst => {
          const hef = this
          hef.errMsg = rst.msg
          hef.loginning = true
          setTimeout(function() {
            hef.$emit('register', hef.registerObj)
          }, 300)
        })
        .catch(err => {
          this.errMsg = err.msg
        })
    }
  },
  mounted() {
    this.$refs.userInput.focus()
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
  height: 395px;
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
  .login-delete {
    z-index: 999;
    position: absolute;
    right: 12px;
    top: 9px;
.icon-delete{
  color:#5ba4ff;
  font-size: 20px;
  cursor: pointer;
}
    .icon-delete:hover{
      font-size: 23px;
      color: #82d8ff;
    }
  }
  .login-zc{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    text-align: center;
    color: white;
    font-size: 20px;
    position: relative;
    .login-line{
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      top:19px;
      img{
        width: 100%;
      }
    }
  }
}
.login-con {
  width: 100%;
  box-sizing: border-box;
  padding: 0 33px;
  .title{
    padding: 23px 0;
    text-align: center;
    font-size: 16px;
    color: #f7f7f7;
    margin-bottom: 5px;
  }
  .log-p:last-child{
    margin-bottom:0;
  }
  .log-p{
    width: 100%;
    height: 37px;
    border-radius: 4px;
    background-color: white;
    position: relative;
    margin-bottom: 22px;
    &>i{
      position: absolute;
      color: #ced4d7;
      font-size: 21px;
      right: 13px;
      top: 8px;
    }
    &>input{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      /*padding-left: 45px;*/
      padding-left: 13px;
      border-radius: 4px;
      font-size: 15px;
      color: #d6d6d6;
    }
    .news:focus {
      color: #73c6ff;
      outline: none;
      transition: all 0.2s;
      &::-webkit-input-placeholder{
        color:#73c6ff;
      }
    }
    .news:focus + i{
      color: #30aafb;
    }
  }
  .log-ver{
    width: 156px;
    position: relative;
  }
}
.login-footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 33px;
  .hint {
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #ff4d1d;
    margin-top: 14px;
  }
  .sign {
    width: 100%;
    margin-top:11px;
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
input::-webkit-input-placeholder{
  color: #d6d6d6;
}
</style>
