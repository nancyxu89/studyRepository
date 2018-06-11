<template>
  <div class="guest-index">
    <header class="index-header clearFix">
      <div class="nav-box">
        <nav class="nav-main">
          <router-link active-class="selected" class="nav-item" v-for="(item,index) in menus" :to="item.path" :key="index">
            {{item.name}}
          </router-link>
        </nav>
      </div>
      <jAppTitle class="index-title"></jAppTitle>
      <div class="opt-main">
        <span @click="showLogin" class="opt-item login-opt">登录</span>
        <span @click="showRegister" class="opt-item register-opt">注册</span>
      </div>
    </header>
    <login-box v-if="isShow" :msg.sync="msg" :username="username" :password="password" :remember="remember" @login="login" @dele="dele" @jump="jump" @forget="forget"></login-box>
    <login-register v-if="isShowRegister" @close="close" @register="register"></login-register>
    <login-forget v-if="isShowForget" @turn="turn" @deterMine="deterMine"></login-forget>
    <div class="index-middle">
      <div class="middle-layout">
        <img class="middle-bg" src="../../assets/images/login-back-con.png" alt="">
      </div>
      <div class="middle-layout zIndex198">
        <div class="items clearFix">
          <div class="spec-box w20">
            <div class="small-outer"></div>
            <div class="big-outer">
              <span class="wcircle-item"></span>
            </div>
          </div>
          <span class="circle-item delay-5s"></span>
          <span class="rect-item"></span>
          <span class="circle-item delay-7s"></span>
          <span class="rect-item delay-5s"></span>
          <span class="circle-item"></span>
          <div class="spec-box">
            <div class="small-outer"></div>
            <div class="big-outer"></div>
          </div>
          <div class="triangle-main">
            <span class="triangle-item"></span>
          </div>
          <div class="triangle-main delay-5s">
            <span class="triangle-item yellow"></span>
          </div>
          <span class="rect-item"></span>
          <div class="spec-box w20">
            <div class="small-outer"></div>
            <div class="big-outer"></div>
          </div>
        </div>
      </div>
      <div class="middle-layout zIndex199">
        <div :class="['layout-item',index===1?'center-item':'']" v-for="(item,index) in layoutItems" v-bind:key="index">
          <img :src="item.src" :alt="item.name">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <jAppFooter class="index-footer"></jAppFooter>
  </div>
</template>
<script>
import loginBox from '../login/login_con.vue'
import loginRegister from '../login/login_register.vue'
import loginForget from '../login/login_forget.vue'
import { jAppTitle, jAppFooter } from '../../components'
import { GuestMenus } from '../../assets/js/menu'
import { Types } from '../../assets/js/types'
export default {
  components: { loginBox, jAppTitle, jAppFooter, loginRegister, loginForget },
  data() {
    return {
      menus: GuestMenus,
      username: '',
      password: '',
      remember: '',
      isShow: false,
      isShowRegister: false,
      isShowForget: false,
      layoutItems: [
        {
          src: require('../../assets/images/index-logo1.png'),
          name: '企业入驻合适园区'
        },
        {
          src: require('../../assets/images/index-logo2.png'),
          name: '招商通让招商更高效'
        },
        {
          src: require('../../assets/images/index-logo3.png'),
          name: '园区匹配优质企业'
        }
      ],
      msg: ''
    }
  },
  methods: {
    showLogin() {
      this.isShow = true
    },
    showRegister() {
      this.isShowRegister = true
    },
    register(obj) {
      this.isShowRegister = false
      this.isShow = true
      this.username = obj.phone
      this.password = obj.password
    },
    jump() {
      this.isShow = false
      this.isShowRegister = true
    },
    forget() {
      this.isShow = false
      this.isShowForget = true
    },
    login(user) {
      var params = {
        username: user.username,
        password: user.password,
        userType: user.userType
      }
      var rtn = this.$store.dispatch('login', params)
      rtn.then(
        data => {
          this.rememberPwd(params, user.remember)
          let target =
            this.$route.query.r ||
            (params.userType === Types.GardenType ? '/home' : '/home_q')
          let redirect = decodeURIComponent(target)
          this.$router.replace({ path: redirect })
        },
        err => {
          this.msg = err.msg
        }
      )
    },
    rememberPwd(user, isRem) {
      if (isRem) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },
    dele() {
      this.isShow = false
    },
    close() {
      this.isShowRegister = false
    },
    turn() {
      this.isShowForget = false
    },
    deterMine() {
      this.isShowForget = false
    }
  },
  mounted() {
    this.$store.dispatch('init')
  }
}
</script>
<style lang='less' scoped>
@import '../../assets/css/main.css';
@import '../../assets/css/guest.less';
@import '../../assets/css/homeanimation.less';

.guest-index {
  position: relative;
  min-width: 1360px;
  height: 100vh;
  min-height: 720px;
  background: url('../../assets/images/login-back.jpg') no-repeat 50% 50%;
  background-size: cover;
}

.index-middle {
  width: 100%;
  height: calc(~'100vh - 135px');
  min-height: 585px;
  position: relative;
  box-sizing: border-box;
}

.middle-layout {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 197;

  .middle-bg {
    width: 5.22rem;
    height: 3rem;
  }
}

.zIndex199 {
  z-index: 199;
}

.zIndex198 {
  z-index: 198;
}

.layout-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-family: MicrosoftYaHei-Bold;
  margin: 0 0.7rem;
  font-size: 19px;
  color: #70e4fc;
  cursor: pointer;
  transition: all 0.5s ease;
  transform: translate(22px, -0.3rem);
  &:hover {
    transform: translate(22px, -0.3rem) scale(1.05);
  }
  img {
    width: 1.39rem;
    height: 1.39rem;
  }
  span {
    margin-top: 18px;
  }
}

.center-item {
  font-size: 23px;
  transform: translate(22px, -0.64rem);
  color: #8deaff;
  cursor: pointer;
  img {
    width: 2.39rem;
    height: 2.28rem;
  }
  &:hover {
    transform: translate(22px, -0.64rem) scale(1.05);
  }
}
</style>
