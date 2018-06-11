<template>
  <router-view>
  </router-view>
</template>

<script>
export default {
  name: 'app',
  created() {
    document.title = window.appName
  }
}
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/table.css";
@import "./assets/css/scroll.css";
@import "./assets/css/button.css";
@import "./assets/font/iconfont.css"
</style>
