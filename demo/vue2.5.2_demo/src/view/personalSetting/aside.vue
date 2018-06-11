<template>
  <div class='person-aside'>
    <!--个人设置-->
    <ul>
      <router-link class="aside-content" tag="li" to='./attentionlist' active-class="selected" v-auth="Auths.MyAttention">
        <i class="iconfont icon-shoucang icon-label"></i>
        <a>我的关注</a>
      </router-link>
      <li class="aside-content" v-auth="`${Auths.RecentChanges}||${Auths.EntSupervisionList}||${Auths.WarningPush}`">
        <i class="iconfont icon-jiankong"></i>
        <a>监控预警</a>
        <ul class="monitoring-main">
          <router-link class="monitoring-main" tag="li" to='./newestChange' active-class="selected" v-auth="Auths.RecentChanges">最新变动信息</router-link>
          <router-link class="monitoring-main" tag="li" to='./companymonitoring' active-class="selected" v-auth="Auths.EntSupervisionList">企业监控</router-link>
          <router-link class="monitoring-main" tag="li" to='./earlyWarning' active-class="selected" v-auth="Auths.WarningPush">预警推送</router-link>
        </ul>
      </li>
      <li class="aside-content" v-auth="`${Auths.DataSourceList}||${Auths.DataSourceCategory}||${Auths.DataSourceAudit}||${Auths.DataSourceDeal}||${Auths.DataSourceApply}`">
        <i class="iconfont icon-zhuzhuangtu"></i>
        <a>数据源管理</a>
        <ul class="monitoring-main">
          <router-link class="monitoring-main" tag="li" to='/setting/dataOrignList' active-class="selected" v-auth="Auths.DataSourceList">数据源列表</router-link>
          <router-link class="monitoring-main" tag="li" to='/setting/dataCategory' active-class="selected" v-auth="Auths.DataSourceCategory">数据源类别</router-link>
          <router-link class="monitoring-main" tag="li" to='/setting/dataOrignAudit' active-class="selected" v-auth="Auths.DataSourceAudit">数据源审核</router-link>
          <router-link class="monitoring-main" tag="li" to='/setting/dataDispose' active-class='selected' v-auth="Auths.DataSourceDeal">数据源处理</router-link>
          <router-link class="monitoring-main" tag="li" to='/setting/dataApply' active-class='selected' v-auth="Auths.DataSourceApply">数据源申请</router-link>
        </ul>
      </li>
      <li class="aside-content" v-auth="`${Auths.PublicLabel}||${Auths.PrivateLabel}`">
        <i class="iconfont icon-biaoqian icon-label"></i>
        <a>舆情标签</a>
        <ul class="monitoring-main">
          <router-link class="monitoring-main" tag="li" to='/setting/privateLabel' active-class="selected" v-auth="Auths.PrivateLabel">私有标签</router-link>
          <router-link class="monitoring-main" tag="li" to='/setting/punlicLabel' active-class="selected" v-auth="Auths.PublicLabel">公有标签</router-link>
        </ul>
      </li>
      <!-- TODO: 修正权限码 -->
      <li class="aside-content" v-auth="Auths.CustomEntList">
        <i class="iconfont icon-geren01"></i>
        <a>添加企业记录</a>
        <ul class="monitoring-main">
          <router-link class="monitoring-main" tag="li" to='/setting/addEntRecord' active-class="selected">添加企业记录</router-link>
        </ul>
      </li>
      <li class="aside-content" v-auth="Auths.UserInfo">
        <i class="iconfont icon-geren01"></i>
        <a>个人信息</a>
        <ul class="monitoring-main">
          <router-link class="monitoring-main" tag="li" to='/setting/personalInfor' active-class="selected">个人信息</router-link>
        </ul>
      </li>
      <li class="aside-content" v-auth="Auths.UserManager">
        <i class="fentello icon-cog-outline"></i>
        <a>系统设置</a>
        <form :action="url" method="post" id="loginForm" style="display:none;">
          <input type="text" name="username" id="name" :value='username' />
          <input type="text" name="password" id="projectid" :value='password'>
        </form>
        <ul class="monitoring-main">
          <li class="monitoring-main guanli" @click="privilegeManage">
            用户管理
          </li>
        </ul>

      </li>
    </ul>
  </div>
</template>
<script>
import { AUTHS } from '../../assets/js/pageAuth.js'
export default {
  data() {
    return {
      Auths: AUTHS,
      url: window.creditPlatformUrl,
      username: '',
      password: ''
    }
  },
  methods: {
    privilegeManage() {
      document.querySelector('#loginForm').submit()
    }
  },
  mounted() {
    var userInfo = this.$store.state.userInfo
    this.username = userInfo.username
    this.password = userInfo.password
  }
}
</script>
<style scoped lang='less'>
.person-aside {
  flex-shrink: 0;
  overflow-y: auto;
  border: 1px solid #ccc;
  font-size: 14px;
  box-shadow: 10px 0px 10px #ccc;
  .selected {
    background: #3ca1f8;
    border-left: 6px solid #106ecd;
  }
  ul {
    position: relative;
    li {
      line-height: 43px; // border-bottom: 1px solid #ccc;
      cursor: pointer; // text-align: center;
      // .person-main {
      //   text-align: center;
      // }
      li:hover {
        background: #3ca1f8;
        color: #fff;
      }
      .arrows {
        position: absolute;
        right: 0px;
        margin-top: 14px;
      }
      .icon-arrows {
        position: absolute;
        margin: 11.5px 8px 0 -20%;
      }
      &:first-child {
        border-top: 1px solid #ccc;
      }
    }
    .guanli a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #a1a1a1;
    }
    .guanli a:hover {
      color: #fff;
    }
  }
  ul li:last-child {
    border-bottom: none;
  }
  .aside-content {
    border-bottom: 1px solid #ccc;
    position: relative;
    ul {
      li {
        padding-left: 60px;
      }
    }
  }
  .aside-content a:after {
    display: inline-block;
    content: url(../../assets/images/arrows-right.png);
    position: absolute;
    right: 8%;
    top: 3px;
  }
  .aside-content i {
    font-size: 19px;
    position: absolute;
    left: 7%;
    background: #3d93de;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    line-height: 25px;
    top: 8px;
    color: #fff;
    text-align: center;
  }
  .aside-content .icon-label {
    font-size: 16px;
  }
  .aside-content a {
    margin: 0 auto;
    margin-left: 50px;
  }
  .monitoring-main {
    color: #a1a1a1;
  }
}
</style>
