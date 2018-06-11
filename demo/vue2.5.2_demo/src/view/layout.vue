<template>
  <div class="page-content">
    <header class="index-header header-bg clearFix">
      <div class="nav-box">
        <nav class="nav-main">
          <router-link class="nav-item" v-for="(item,index) in menus" :to="item.url" v-auth="item.auth" :key="index">{{item.name}}</router-link>
        </nav>
      </div>
      <jAppTitle class="index-title"></jAppTitle>
      <div class="opt-main">
        <router-link to="/info" tag="span" class="opt-item right-content">
          <i class="icon iconfont icon-geren"></i>{{user.realName}}</router-link>
        <span @click="logout" class="opt-item right-content">
          <i class="icon iconfont icon-tuichu"></i>退出</span>
      </div>
    </header>
    <div class="page-body">
      <router-view></router-view>
    </div>
    <jAppFooter class="index-footer-other"></jAppFooter>
  </div>
</template>

<script>
import { menus } from '../assets/js/menu.js'
import { jErrMsg } from './components'
import { jAppTitle, jAppFooter } from '../components'
import {Types} from '../assets/js/types'
export default {
  name: 'layout',
  data() {
    return {
      logo: window.logo,
      appName: window.appName,
      user: {},
      date: new Date(),
      fromMenus: {}
    }
  },
  computed: {
    menus() {
      if (this.$store.state.user.userInfo.userType + '' === Types.GardenType) {
        return menus.gardenMenus
      }
      if (this.$store.state.user.userInfo.userType + '' === Types.EntType) {
        return menus.entMenus
      }
      return this.fromMenus
    }
  },
  watch: {
    menus(to) {
      this.fromMenus = to
    }
  },
  created() {
    this.$store.dispatch('init')
    this.user = this.$store.state.user.userInfo
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      //        .then(() => {
      //        setTimeout(() => {
      //          window.location.reload() //解决切换用户时,路由问题
      //        }, 10)
      //      })
      this.$router.replace('/index')

      // window.location.href = 'http://eip.swsc.com.cn/sso/signout.aspx'
    }
  },
  components: {
    jErrMsg,
    jAppTitle,
    jAppFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import '../assets/css/main.css';
@import '../assets/css/guest.less';
/*@import "../assets/css/layout.css";*/
@import '../assets/css/list.css';
@import '../assets/css/_default.less';
.top-list {
  opacity: 1;
  div {
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
  div:hover {
    background: #71baff;
  }
  li {
    display: block;
  }
}
</style>
