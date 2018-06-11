<template>
  <div class="setting">
    <!--招商通,左侧导航不显示,2018.04.02-->
    <!--<left-menu class="left-nav"></left-menu>-->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import leftMenu from './aside.vue'
export default {
  components: {
    leftMenu
  }
}
</script>
<style scoped lang='less'>
.setting {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 40px 45px;
  width: 82%; // height: 100%;
  overflow-x: auto;
}

.left-nav {
  height: 100%;
  box-sizing: border-box;
  min-width: 180px;
  width: 12%;
}
</style>
