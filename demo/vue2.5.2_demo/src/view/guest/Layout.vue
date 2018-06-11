<template>
  <div class="page-content">
    <header class="index-header header-bg clearFix">
      <div class="nav-box">
        <nav class="nav-main">
          <router-link class="nav-item" v-for="(item,index) in menus" :to="item.path" :key="index">{{item.name}}</router-link>
        </nav>
      </div>
      <jAppTitle class="index-title"></jAppTitle>
      <!--<div v-if="isShow" class="opt-main">-->
        <!--<span class="opt-item right-content">{{user.realName}}</span>-->
        <!--<span @click="logout" class="opt-item right-content">退出</span>-->
      <!--</div>-->
    </header>
    <div class="page-body">
      <router-view></router-view>
    </div>
    <jAppFooter class="index-footer-other"></jAppFooter>
  </div>
</template>
<script>
import { jAppTitle, jAppFooter } from '../../components'
import { GuestMenus } from '../../assets/js/menu'
export default {
  components: { jAppTitle, jAppFooter },
  data() {
    return {
      menus: GuestMenus
      //      user: {}
    }
  }
//  ,
//  computed: {
//    isShow() {
//      return !!this.$store.getters.token
//    }
//  },
//  methods: {
//    logout() {
//      this.$store.dispatch('logout')
//      this.$router.push('/index')
//    }
//  },
//  mounted() {
//    this.user = this.$store.state.user.userInfo
//  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/guest.less';
</style>
