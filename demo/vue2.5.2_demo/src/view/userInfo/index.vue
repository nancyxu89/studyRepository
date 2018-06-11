<template>
  <div class="person-center">
    <nav class="left-nav">
      <ul>
        <router-link class="parent-item" tag="li" v-for="(menu,index) in menus" v-bind:key="index" :to="menu.path">
          <span class="first-content">
            <i :class="['icon iconfont',menu.icon]"></i>{{menu.name}}</span>
          <ul v-if="menu.children.length>0">
            <router-link class="children-item" tag="li" v-for="(submenu,idx) in menu.children" v-bind:key="idx" :to="submenu.path">{{submenu.name}}
            </router-link>
          </ul>
        </router-link>
      </ul>
    </nav>
    <div class="white-box right-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          name: '个人中心',
          icon: 'icon-geren',
          path: '/info/person',
          children: [
            { name: '个人信息', path: '/info/person/index' },
            { name: '我的收藏', path: '/info/person/myCollect' }
          ]
        },
        {
          name: '园区中心',
          icon: 'icon-yuanqushezhi',
          path: '/info/garden',
          children: [
            { name: '基本信息', path: '/info/garden/baseInfo' },
            { name: '项目信息', path: '/info/garden/projectInfo' },
            { name: '入驻企业', path: '/info/garden/enter' }
          ]
        },
        {
          name: '设置',
          icon: 'icon-setting',
          path: '/info/setting',
          children: [{ name: '修改密码', path: '/info/setting/changepsw' }]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  .person-center{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
.left-nav {
  flex-basis: 244px;
  min-height: calc(~'100vh - 187px');
  background-color: #ffffff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;

  .iconfont {
    font-size: 18px;
    margin-right: 4px;
  }
  li{
    cursor: pointer;
  }

  .parent-item {
    .first-content,
    .children-item {
      display: inline-flex;
      width: 100%;
      height: 48px;
      background-color: #fff;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #555555;
    }
    &.selected .first-content {
      color: #1a75ca;
    }

    .children-item {
      height: 38px;
      font-size: 14px;
      background-image: linear-gradient(#f2f6fb, #f2f6fb),
        linear-gradient(rgba(72, 72, 72, 0.2), rgba(72, 72, 72, 0.2));
      background-blend-mode: normal, normal;
      opacity: 0.8;

      &.selected {
        background-image: linear-gradient(
            rgba(101, 181, 255, 0.4),
            rgba(101, 181, 255, 0.4)
          ),
          linear-gradient(rgba(72, 72, 72, 0.1), rgba(72, 72, 72, 0.1));
        background-blend-mode: normal, normal;
      }
    }
  }
}
  .right-content{
    width: 100%;
    margin: 0 0 0 20px;
  }
</style>
